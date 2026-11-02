import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from '../../fleet/entities/vehicle.entity.js';
import { Driver } from '../../fleet/entities/driver.entity.js';

export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  DELAYED = 'DELAYED',
  CANCELLED = 'CANCELLED'
}

export enum ShipmentPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum CommodityType {
  GENERAL = 'GENERAL',
  HAZARDOUS = 'HAZARDOUS',
  PERISHABLE = 'PERISHABLE',
  FRAGILE = 'FRAGILE',
  SECURE = 'SECURE'
}

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  origin: string;

  @Column({ type: 'varchar' })
  destination: string;

  @Column({
    type: 'enum',
    enum: CommodityType,
    default: CommodityType.GENERAL,
  })
  commodityType: CommodityType;

  @Column({ type: 'float', default: 0 })
  weightKg: number;

  @Index()
  @Column({
    type: 'enum',
    enum: ShipmentStatus,
    default: ShipmentStatus.PENDING,
  })
  status: ShipmentStatus;

  @Index()
  @Column({
    type: 'enum',
    enum: ShipmentPriority,
    default: ShipmentPriority.MEDIUM,
  })
  priority: ShipmentPriority;

  @Column({ type: 'timestamp', nullable: true })
  eta: Date;

  @Column({ type: 'varchar', nullable: true })
  assignedVehicleId: string;

  @ManyToOne(() => Vehicle, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedVehicleId' })
  vehicle: Vehicle;

  @Column({ type: 'uuid', nullable: true })
  assignedDriverId: string;

  @ManyToOne(() => Driver, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assignedDriverId' })
  driver: Driver;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
