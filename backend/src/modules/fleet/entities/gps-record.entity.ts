import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Vehicle } from './vehicle.entity.js';

@Entity('gps_records')
export class GpsRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  vehicleId: string;

  @ManyToOne(() => Vehicle, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: any;

  @Column({ type: 'float' })
  speed: number;

  @Column({ type: 'float' })
  heading: number;

  @Index()
  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column({ type: 'boolean', default: false })
  isStale: boolean; // True if the packet was stale when ingested

  @CreateDateColumn()
  createdAt: Date;
}
