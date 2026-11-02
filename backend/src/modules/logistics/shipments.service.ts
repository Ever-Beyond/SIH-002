import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';
import { Vehicle } from '../fleet/entities/vehicle.entity.js';
import { Driver } from '../fleet/entities/driver.entity.js';

@Injectable()
export class ShipmentsService {
  private readonly logger = new Logger(ShipmentsService.name);

  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  private async validateRelations(vehicleId?: string, driverId?: string) {
    if (vehicleId) {
      const vehicle = await this.vehicleRepository.findOne({ where: { id: vehicleId } });
      if (!vehicle) throw new BadRequestException(`Vehicle with ID ${vehicleId} not found`);
    }
    if (driverId) {
      const driver = await this.driverRepository.findOne({ where: { id: driverId } });
      if (!driver) throw new BadRequestException(`Driver with ID ${driverId} not found`);
    }
  }

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    await this.validateRelations(createShipmentDto.assignedVehicleId, createShipmentDto.assignedDriverId);
    
    const shipment = this.shipmentRepository.create(createShipmentDto);
    const saved = await this.shipmentRepository.save(shipment);
    
    this.logger.log(`[AUDIT] Shipment Created: ${saved.id} - Origin: ${saved.origin}, Dest: ${saved.destination}`);
    return this.findOne(saved.id);
  }

  async findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find({
      relations: { vehicle: true, driver: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: { vehicle: true, driver: true },
    });

    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }

    return shipment;
  }

  async update(id: string, updateShipmentDto: UpdateShipmentDto): Promise<Shipment> {
    const shipment = await this.findOne(id);
    
    await this.validateRelations(updateShipmentDto.assignedVehicleId, updateShipmentDto.assignedDriverId);

    // Audit logs for important changes
    if (updateShipmentDto.status && updateShipmentDto.status !== shipment.status) {
      this.logger.log(`[AUDIT] Shipment ${id} Status Changed: ${shipment.status} -> ${updateShipmentDto.status}`);
    }
    if (updateShipmentDto.priority && updateShipmentDto.priority !== shipment.priority) {
      this.logger.log(`[AUDIT] Shipment ${id} Priority Changed: ${shipment.priority} -> ${updateShipmentDto.priority}`);
    }
    if (updateShipmentDto.assignedVehicleId && updateShipmentDto.assignedVehicleId !== shipment.assignedVehicleId) {
      this.logger.log(`[AUDIT] Shipment ${id} Vehicle Assigned: ${updateShipmentDto.assignedVehicleId}`);
    }
    if (updateShipmentDto.assignedDriverId && updateShipmentDto.assignedDriverId !== shipment.assignedDriverId) {
      this.logger.log(`[AUDIT] Shipment ${id} Driver Assigned: ${updateShipmentDto.assignedDriverId}`);
    }

    await this.shipmentRepository.update(id, updateShipmentDto);
    return this.findOne(id);
  }
}
