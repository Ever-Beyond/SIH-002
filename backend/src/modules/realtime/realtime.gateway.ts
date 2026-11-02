import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards, ForbiddenException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WsJwtGuard } from './guards/ws-jwt.guard.js';
import { SubscribeDto, EventEnvelope, RealtimeEventType } from './dto/event-envelope.dto.js';
import { VehiclesService } from '../fleet/vehicles.service.js';
import { UserRole } from '../users/entities/user.entity.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { VehicleLocationUpdatedEvent } from '../fleet/events/vehicle-location-updated.event.js';
import { IncidentCreatedEvent, IncidentUpdatedEvent, IncidentEventPayload } from '../incidents/events/incident-events.js';
import * as crypto from 'crypto';

import { RouteUpdatedEvent } from '../logistics/events/route-events.js';
import { RouteEventPayload } from '../logistics/events/route-events.js';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(RealtimeGateway.name);

  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // Lifecycle hooks for logging
  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    
    // Authenticate on connection to ensure they are valid before even sending subscribe events
    let token = client.handshake?.auth?.token;
    if (!token && client.handshake?.headers?.authorization) {
      token = client.handshake.headers.authorization.split(' ')[1];
    }

    if (!token) {
      this.logger.warn(`Disconnecting client ${client.id} - No token`);
      client.disconnect(true);
      return;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      (client as any).user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };
      this.logger.log(`Client ${client.id} authenticated as user ${(client as any).user.id}`);
    } catch {
      this.logger.warn(`Disconnecting client ${client.id} - Invalid token`);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('subscribe')
  async handleSubscribe(
    @MessageBody() payload: SubscribeDto,
    @ConnectedSocket() client: Socket,
  ) {
    if (!payload || !payload.channel) {
      throw new WsException('Malformed subscription request');
    }

    const { channel } = payload;
    const user = (client as any).user;

    // Room Authorization Logic
    if (channel.startsWith('vehicle:')) {
      const vehicleId = channel.split(':')[1];
      
      try {
        const vehicle = await this.vehiclesService.findOne(vehicleId);
        
        if (user.role === UserRole.DRIVER && vehicle.driverId !== user.id) {
          this.logger.warn(`User ${user.id} denied access to channel ${channel}`);
          throw new ForbiddenException('Unauthorized to subscribe to this vehicle');
        }
        
        // Admins and Officers can subscribe to any vehicle
        // Proceed to join
      } catch (err: any) {
        throw new WsException(err.message || 'Invalid resource');
      }
    } else if (channel === 'alerts' || channel === 'incidents' || channel === 'routes') {
      // General channels - assume ADMIN/OFFICER only, drivers shouldn't listen to all alerts by default
      if (user.role === UserRole.DRIVER) {
        throw new WsException('Unauthorized channel subscription');
      }
    } else {
      throw new WsException('Unknown channel');
    }

    client.join(channel);
    this.logger.log(`Client ${client.id} joined channel ${channel}`);
    return { event: 'subscribed', data: { channel } };
  }

  @OnEvent('vehicle.location.updated')
  handleVehicleLocationUpdated(event: VehicleLocationUpdatedEvent) {
    try {
      const channel = `vehicle:${event.vehicleId}`;
      const envelope: EventEnvelope<VehicleLocationUpdatedEvent> = {
        eventId: crypto.randomUUID(),
        eventType: RealtimeEventType.VEHICLE_LOCATION_UPDATED,
        resourceId: event.vehicleId,
        timestamp: new Date().toISOString(),
        schemaVersion: '1.0',
        payload: event,
      };

      this.server.to(channel).emit('event', envelope);
      this.logger.debug(`Broadcasted ${RealtimeEventType.VEHICLE_LOCATION_UPDATED} to ${channel}`);
    } catch (error) {
      this.logger.error('Failed to broadcast vehicle location updated event', error);
      // We catch the error so that it doesn't interrupt the rest of the application or the original request loop
    }
  }

  @OnEvent('incident.created')
  handleIncidentCreated(event: IncidentCreatedEvent) {
    try {
      const channel = 'incidents';
      const envelope: EventEnvelope<IncidentEventPayload> = {
        eventId: crypto.randomUUID(),
        eventType: RealtimeEventType.INCIDENT_CREATED,
        resourceId: event.payload.id,
        timestamp: new Date().toISOString(),
        schemaVersion: '1.0',
        payload: event.payload,
      };

      this.server.to(channel).emit('event', envelope);
      this.logger.debug(`Broadcasted ${RealtimeEventType.INCIDENT_CREATED} to ${channel}`);
    } catch (error) {
      this.logger.error('Failed to broadcast incident created event', error);
    }
  }

  @OnEvent('incident.updated')
  handleIncidentUpdated(event: IncidentUpdatedEvent) {
    try {
      const channel = 'incidents';
      const envelope: EventEnvelope<IncidentEventPayload> = {
        eventId: crypto.randomUUID(),
        eventType: RealtimeEventType.INCIDENT_UPDATED,
        resourceId: event.payload.id,
        timestamp: new Date().toISOString(),
        schemaVersion: '1.0',
        payload: event.payload,
      };

      this.server.to(channel).emit('event', envelope);
      this.logger.debug(`Broadcasted ${RealtimeEventType.INCIDENT_UPDATED} to ${channel}`);
    } catch (error) {
      this.logger.error('Failed to broadcast incident updated event', error);
    }
  }

  @OnEvent('route.updated')
  handleRouteUpdated(event: RouteUpdatedEvent) {
    try {
      const channel = 'routes';
      const envelope: EventEnvelope<RouteEventPayload> = {
        eventId: crypto.randomUUID(),
        eventType: RealtimeEventType.ROUTE_UPDATED,
        resourceId: event.payload.id,
        timestamp: new Date().toISOString(),
        schemaVersion: '1.0',
        payload: event.payload,
      };

      this.server.to(channel).emit('event', envelope);
      this.logger.debug(`Broadcasted ${RealtimeEventType.ROUTE_UPDATED} to ${channel}`);
    } catch (error) {
      this.logger.error('Failed to broadcast route updated event', error);
    }
  }
}
