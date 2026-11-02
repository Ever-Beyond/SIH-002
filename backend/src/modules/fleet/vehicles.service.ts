import { Injectable, NotFoundException, ConflictException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Vehicle } from './entities/vehicle.entity.js';
import { GpsRecord } from './entities/gps-record.entity.js';
import { CreateVehicleDto } from './dto/create-vehicle.dto.js';
import { UpdateVehicleDto } from './dto/update-vehicle.dto.js';
import { GpsIngestionDto } from './dto/gps-ingestion.dto.js';
import { UserRole } from '../users/entities/user.entity.js';
import { VehicleLocationUpdatedEvent } from './events/vehicle-location-updated.event.js';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);

  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(GpsRecord)
    private readonly gpsRecordRepository: Repository<GpsRecord>,
    private readonly configService: ConfigService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const existing = await this.vehicleRepository.findOne({ where: { plateNumber: createVehicleDto.plateNumber } });
    if (existing) {
      throw new ConflictException('Vehicle with this plate number already exists');
    }

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    return this.vehicleRepository.save(vehicle);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      relations: { driver: true, shipments: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id },
      relations: { driver: true, shipments: true },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);

    if (updateVehicleDto.plateNumber && updateVehicleDto.plateNumber !== vehicle.plateNumber) {
      const existing = await this.vehicleRepository.findOne({ where: { plateNumber: updateVehicleDto.plateNumber } });
      if (existing) {
        throw new ConflictException('Vehicle with this plate number already exists');
      }
    }

    await this.vehicleRepository.update(id, updateVehicleDto);
    return this.findOne(id);
  }

  async ingestGps(vehicleId: string, dto: GpsIngestionDto, user: any): Promise<{ success: boolean; isStale: boolean }> {
    const vehicle = await this.findOne(vehicleId);

    // Authorization: Drivers can only submit GPS for vehicles assigned to them
    if (user.role === UserRole.DRIVER && vehicle.driverId !== user.id) {
      throw new ForbiddenException('You are not authorized to submit GPS data for this vehicle');
    }

    const packetTime = new Date(dto.timestamp);

    // Idempotency: Check if this exact packet was already ingested
    const existingRecord = await this.gpsRecordRepository.findOne({
      where: { vehicleId, timestamp: packetTime }
    });

    if (existingRecord) {
      this.logger.debug(`Idempotent drop: duplicate GPS packet for vehicle ${vehicleId} at ${packetTime.toISOString()}`);
      return { success: true, isStale: existingRecord.isStale };
    }

    const staleThresholdMs = this.configService.get<number>('GPS_STALE_THRESHOLD_MS') || 300000;
    const isStale = (Date.now() - packetTime.getTime()) > staleThresholdMs;

    // Create GeoJSON point for PostGIS
    const locationPoint = {
      type: 'Point',
      coordinates: [dto.longitude, dto.latitude],
    };

    // 1. Always save the historical record
    const gpsRecord = this.gpsRecordRepository.create({
      vehicleId,
      latitude: dto.latitude,
      longitude: dto.longitude,
      speed: dto.speed,
      heading: dto.heading,
      timestamp: packetTime,
      isStale,
      location: locationPoint as any,
    });
    
    await this.gpsRecordRepository.save(gpsRecord);

    // 2. Out-of-order protection: only update current vehicle state if the packet is newer than lastPing
    if (!vehicle.lastPing || packetTime > vehicle.lastPing) {
      // Only update live state if it's NOT stale
      if (!isStale) {
        await this.vehicleRepository.update(vehicleId, {
          location: locationPoint as any,
          speedKmH: dto.speed,
          heading: dto.heading,
          lastPing: packetTime,
        });

        // 3. Emit local event for RealtimeGateway to pick up (only valid + newest state)
        this.eventEmitter.emit(
          'vehicle.location.updated',
          new VehicleLocationUpdatedEvent(
            vehicleId,
            dto.latitude,
            dto.longitude,
            dto.speed,
            dto.heading,
            dto.timestamp,
          ),
        );

      } else {
        // If it's stale but newer than lastPing, we might just update lastPing, but not "live" location?
        // Requirement: "Stale/late GPS -> do not update the vehicle's current/live state."
        // We will strictly not update current state if the packet is stale.
        this.logger.debug(`Skipped updating live state for ${vehicleId} because packet is stale.`);
      }
    } else {
      this.logger.debug(`Skipped updating live state for ${vehicleId} because packet is older than lastPing.`);
    }

    return { success: true, isStale };
  }
}
