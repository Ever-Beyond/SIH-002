import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Vehicle } from './entities/vehicle.entity.js';
import { GpsRecord } from './entities/gps-record.entity.js';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { UserRole } from '../users/entities/user.entity.js';
import { VehicleLocationUpdatedEvent } from './events/vehicle-location-updated.event.js';

describe('VehiclesService - GPS Ingestion', () => {
  let service: VehiclesService;
  let mockVehicleRepo: any;
  let mockGpsRecordRepo: any;
  let mockConfigService: any;
  let mockEventEmitter: any;

  beforeEach(async () => {
    mockVehicleRepo = {
      findOne: vi.fn(),
      update: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
      find: vi.fn(),
    };
    mockGpsRecordRepo = {
      findOne: vi.fn(),
      create: vi.fn(),
      save: vi.fn(),
    };
    mockConfigService = {
      get: vi.fn().mockReturnValue(300000), // 5 min
    };
    mockEventEmitter = {
      emit: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiclesService,
        { provide: getRepositoryToken(Vehicle), useValue: mockVehicleRepo },
        { provide: getRepositoryToken(GpsRecord), useValue: mockGpsRecordRepo },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  const validDto = {
    latitude: 25.5788,
    longitude: 91.8933,
    speed: 42.5,
    heading: 120,
    timestamp: new Date().toISOString(),
  };

  const adminUser = { id: 'admin-1', role: UserRole.ADMIN };
  const authorizedDriver = { id: 'driver-1', role: UserRole.DRIVER };
  const unauthorizedDriver = { id: 'driver-2', role: UserRole.DRIVER };

  it('should successfully ingest valid GPS data and update vehicle live state', async () => {
    const vehicle = { id: 'v-1', driverId: 'driver-1', lastPing: new Date(Date.now() - 60000) };
    mockVehicleRepo.findOne.mockResolvedValue(vehicle);
    mockGpsRecordRepo.findOne.mockResolvedValue(null);
    const createdRecord = { ...validDto, vehicleId: 'v-1' };
    mockGpsRecordRepo.create.mockReturnValue(createdRecord);

    const result = await service.ingestGps('v-1', validDto, authorizedDriver);

    expect(result.success).toBe(true);
    expect(result.isStale).toBe(false);
    expect(mockGpsRecordRepo.save).toHaveBeenCalledWith(createdRecord);
    expect(mockVehicleRepo.update).toHaveBeenCalled();
    expect(mockEventEmitter.emit).toHaveBeenCalledWith(
      'vehicle.location.updated',
      expect.any(VehicleLocationUpdatedEvent)
    );
  });

  it('should reject if vehicle is unknown', async () => {
    mockVehicleRepo.findOne.mockResolvedValue(null);
    await expect(service.ingestGps('unknown-id', validDto, adminUser)).rejects.toThrow(NotFoundException);
    expect(mockEventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should reject unauthorized driver', async () => {
    mockVehicleRepo.findOne.mockResolvedValue({ id: 'v-1', driverId: 'driver-1' });
    await expect(service.ingestGps('v-1', validDto, unauthorizedDriver)).rejects.toThrow(ForbiddenException);
    expect(mockEventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should handle duplicate/replayed update (idempotency)', async () => {
    mockVehicleRepo.findOne.mockResolvedValue({ id: 'v-1' });
    mockGpsRecordRepo.findOne.mockResolvedValue({ id: 'existing-gps', isStale: false });

    const result = await service.ingestGps('v-1', validDto, adminUser);
    expect(result.success).toBe(true);
    expect(mockGpsRecordRepo.save).not.toHaveBeenCalled(); // Dropped duplicate
    expect(mockEventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should handle out-of-order update (save history, do not update live state)', async () => {
    const newerPing = new Date(Date.now() + 60000); // Live state is newer
    mockVehicleRepo.findOne.mockResolvedValue({ id: 'v-1', lastPing: newerPing });
    mockGpsRecordRepo.findOne.mockResolvedValue(null);
    mockGpsRecordRepo.create.mockReturnValue({});

    const result = await service.ingestGps('v-1', validDto, adminUser);
    
    expect(result.success).toBe(true);
    expect(mockGpsRecordRepo.save).toHaveBeenCalled(); // History saved
    expect(mockVehicleRepo.update).not.toHaveBeenCalled(); // Live state NOT updated
    expect(mockEventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should flag stale location (save history, do not update live state)', async () => {
    mockVehicleRepo.findOne.mockResolvedValue({ id: 'v-1', lastPing: new Date(Date.now() - 800000) });
    mockGpsRecordRepo.findOne.mockResolvedValue(null);
    
    const staleDto = { ...validDto, timestamp: new Date(Date.now() - 400000).toISOString() }; // 6.6 minutes ago
    mockGpsRecordRepo.create.mockReturnValue({ isStale: true });

    const result = await service.ingestGps('v-1', staleDto, adminUser);
    
    expect(result.success).toBe(true);
    expect(result.isStale).toBe(true);
    expect(mockGpsRecordRepo.save).toHaveBeenCalled(); // History saved
    expect(mockVehicleRepo.update).not.toHaveBeenCalled(); // Live state NOT updated because it's stale
    expect(mockEventEmitter.emit).not.toHaveBeenCalled();
  });
});
