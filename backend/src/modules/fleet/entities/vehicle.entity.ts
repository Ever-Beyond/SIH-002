import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Driver } from './driver.entity.js';
import { Shipment } from '../../logistics/entities/shipment.entity.js';

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  IDLE = 'IDLE',
  OFFLINE = 'OFFLINE',
  MAINTENANCE = 'MAINTENANCE'
}

export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'varchar', unique: true })
  plateNumber: string;

  @Column({ type: 'varchar' })
  type: string;

  @Index()
  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.IDLE,
  })
  status: VehicleStatus;

  @Column({
    type: 'enum',
    enum: RiskLevel,
    default: RiskLevel.LOW,
  })
  currentRiskLevel: RiskLevel;

  @Column({ type: 'float', default: 0 })
  speedKmH: number;

  @Column({ type: 'float', nullable: true })
  heading: number; // degrees 0-360

  @Column({ type: 'float', default: 100 })
  batteryOrFuelLevel: number;

  @Column({ type: 'timestamp', nullable: true })
  lastPing: Date;

  // JSON column to store current location (lat, lng, address, timestamp)
  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: any;

  @Column({ type: 'varchar', nullable: true })
  driverId: string;

  @ManyToOne(() => Driver, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'driverId' })
  driver: Driver;

  @OneToMany(() => Shipment, (shipment) => shipment.vehicle)
  shipments: Shipment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
