import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { RouteStatus } from './route.enums.js';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'LineString',
    srid: 4326,
  })
  path: any;

  @Column({ type: 'uuid' })
  shipmentId: string;

  @Column({
    type: 'enum',
    enum: RouteStatus,
    default: RouteStatus.PROPOSED,
  })
  status: RouteStatus;

  @Column({ type: 'boolean', default: false })
  isAlternative: boolean;

  @Column({ type: 'uuid', nullable: true })
  vehicleId: string;

  @ManyToOne('Vehicle', { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'vehicleId' })
  vehicle: any; // TypeORM uses the string 'Vehicle' to resolve metadata. Typing as 'any' avoids circular imports across modules.

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
