import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { VehiclesService } from '../fleet/vehicles.service.js';
import { UserRole } from '../users/entities/user.entity.js';
import { io, Socket } from 'socket.io-client';

describe('RealtimeGateway (WebSocket integration)', () => {
  let app: INestApplication;
  let clientSocket: Socket;
  
  // Mocks
  const mockJwtService = {
    verifyAsync: vi.fn(),
  };
  
  const mockConfigService = {
    get: vi.fn(),
  };

  const mockVehiclesService = {
    findOne: vi.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        RealtimeGateway,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: VehiclesService, useValue: mockVehiclesService },
      ],
      imports: [
        require('@nestjs/event-emitter').EventEmitterModule.forRoot()
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    
    // We must listen on a port to spin up the actual ws server for client testing
    await app.listen(0);
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    if (clientSocket && clientSocket.connected) {
      clientSocket.disconnect();
    }
    vi.clearAllMocks();
  });

  const getUrl = () => {
    const address = app.getHttpServer().address();
    return `http://127.0.0.1:${address.port}`;
  };

  it('should disconnect immediately if no token is provided', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      clientSocket = io(getUrl(), { transports: ['websocket'] });
      
      clientSocket.on('connect', () => {
        // Connected initially, but server should kick us out
      });
      
      clientSocket.on('disconnect', (reason) => {
        expect(reason).toBe('io server disconnect');
        resolve();
      });

      clientSocket.on('connect_error', (_err) => {
         // Also acceptable if it throws connect_error
         resolve();
      });

      setTimeout(() => reject(new Error('Did not disconnect fast enough')), 1000);
    });
  });

  it('should disconnect if token is invalid', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      mockJwtService.verifyAsync.mockRejectedValue(new Error('Invalid token'));
      
      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: 'invalid-token' }
      });
      
      clientSocket.on('disconnect', (reason) => {
        expect(reason).toBe('io server disconnect');
        resolve();
      });

      setTimeout(() => reject(new Error('Did not disconnect fast enough')), 1000);
    });
  });

  it('should allow connection and subscription if authorized', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      const validAdminToken = 'valid-admin-token';
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'admin-1',
        role: UserRole.ADMIN,
        email: 'admin@test.com'
      });

      mockVehiclesService.findOne.mockResolvedValue({ id: 'v-123', driverId: 'driver-1' });

      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: validAdminToken }
      });

      clientSocket.on('connect', () => {
        // Listen for the returned event from the gateway
        clientSocket.on('subscribed', (_data: any) => {
          
          // Now that client is in the room, simulate the internal event
          const { EventEmitter2 } = require('@nestjs/event-emitter');
          const eventEmitter = app.get(EventEmitter2);
          
          clientSocket.on('event', (envelope: any) => {
            expect(envelope.eventType).toBe('VEHICLE_LOCATION_UPDATED');
            expect(envelope.payload.vehicleId).toBe('v-123');
            resolve();
          });

          // Fire internal event
          eventEmitter.emit(
            'vehicle.location.updated', 
            { vehicleId: 'v-123', latitude: 10, longitude: 20, speed: 50, heading: 90, timestamp: new Date().toISOString() }
          );
        });
        
        // Request subscription
        clientSocket.emit('subscribe', { channel: 'vehicle:v-123' });
      });

      setTimeout(() => reject(new Error('Timeout')), 2000);
    });
  });

  it('should reject unauthorized subscription for driver', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      const validDriverToken = 'valid-driver-token';
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'driver-999', // Different driver
        role: UserRole.DRIVER,
        email: 'driver@test.com'
      });

      // Target vehicle belongs to driver-1
      mockVehiclesService.findOne.mockResolvedValue({ id: 'v-123', driverId: 'driver-1' });

      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: validDriverToken }
      });

      clientSocket.on('connect', () => {
        clientSocket.emit('subscribe', { channel: 'vehicle:v-123' }, () => {
          // Socket.io doesn't easily return errors in acks for unhandled exceptions in guards 
          // unless configured, but nestjs returns exceptions as 'exception' events by default.
        });
      });

      clientSocket.on('exception', (data) => {
        expect(data.message).toContain('Unauthorized');
        resolve();
      });

      setTimeout(() => reject(new Error('Timeout')), 2000);
    });
  });

  it('should reject unauthorized subscription for driver on incidents channel', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'driver-999',
        role: UserRole.DRIVER,
        email: 'driver@test.com'
      });

      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: 'valid-driver-token' }
      });

      clientSocket.on('connect', () => {
        clientSocket.emit('subscribe', { channel: 'incidents' });
      });

      clientSocket.on('exception', (data) => {
        expect(data.message).toContain('Unauthorized channel subscription');
        resolve();
      });

      setTimeout(() => reject(new Error('Timeout')), 2000);
    });
  });

  it('should allow Admin to subscribe to incidents and receive INCIDENT_CREATED', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'admin-1',
        role: UserRole.ADMIN,
        email: 'admin@test.com'
      });

      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: 'valid-admin-token' }
      });

      clientSocket.on('connect', () => {
        clientSocket.on('subscribed', () => {
          const { EventEmitter2 } = require('@nestjs/event-emitter');
          const eventEmitter = app.get(EventEmitter2);
          
          clientSocket.on('event', (envelope: any) => {
            expect(envelope.eventType).toBe('INCIDENT_CREATED');
            expect(envelope.payload.id).toBe('inc-123');
            resolve();
          });

          // Fire internal event
          eventEmitter.emit('incident.created', {
            payload: { id: 'inc-123', type: 'ACCIDENT' }
          });
        });
        
        clientSocket.emit('subscribe', { channel: 'incidents' });
      });

      setTimeout(() => reject(new Error('Timeout')), 2000);
    });
  });

  it('should allow Admin to subscribe to incidents and receive INCIDENT_UPDATED', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'admin-1',
        role: UserRole.ADMIN,
        email: 'admin@test.com'
      });

      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: 'valid-admin-token' }
      });

      clientSocket.on('connect', () => {
        clientSocket.on('subscribed', () => {
          const { EventEmitter2 } = require('@nestjs/event-emitter');
          const eventEmitter = app.get(EventEmitter2);
          
          clientSocket.on('event', (envelope: any) => {
            expect(envelope.eventType).toBe('INCIDENT_UPDATED');
            expect(envelope.payload.id).toBe('inc-123');
            resolve();
          });

          // Fire internal event
          eventEmitter.emit('incident.updated', {
            payload: { id: 'inc-123', type: 'ACCIDENT' }
          });
        });
        
        clientSocket.emit('subscribe', { channel: 'incidents' });
      });

      setTimeout(() => reject(new Error('Timeout')), 2000);
    });
  });

  it('should allow Admin to subscribe to routes and receive ROUTE_UPDATED', _asyncFn => {
    return new Promise<void>((resolve, reject) => {
      mockJwtService.verifyAsync.mockResolvedValue({
        sub: 'admin-1',
        role: UserRole.ADMIN,
        email: 'admin@test.com'
      });

      clientSocket = io(getUrl(), { 
        transports: ['websocket'],
        auth: { token: 'valid-admin-token' }
      });

      clientSocket.on('connect', () => {
        clientSocket.on('subscribed', () => {
          const { EventEmitter2 } = require('@nestjs/event-emitter');
          const eventEmitter = app.get(EventEmitter2);
          
          clientSocket.on('event', (envelope: any) => {
            expect(envelope.eventType).toBe('ROUTE_UPDATED');
            expect(envelope.payload.id).toBe('route-123');
            resolve();
          });

          // Fire internal event
          eventEmitter.emit('route.updated', {
            payload: { id: 'route-123', status: 'ACCEPTED' }
          });
        });
        
        clientSocket.emit('subscribe', { channel: 'routes' });
      });

      setTimeout(() => reject(new Error('Timeout')), 2000);
    });
  });
});
