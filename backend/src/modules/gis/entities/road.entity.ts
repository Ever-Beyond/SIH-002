import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { RoadSegment } from './road-segment.entity.js';
import { RoadStatus, AccessibilityStatus } from './road.enums.js';

@Entity('roads')
export class Road {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  type: string; // e.g., HIGHWAY, LOCAL

  @Column({
    type: 'enum',
    enum: RoadStatus,
    default: RoadStatus.OPEN,
  })
  status: RoadStatus;

  @Column({
    type: 'enum',
    enum: AccessibilityStatus,
    default: AccessibilityStatus.ALL_VEHICLES,
  })
  accessibilityStatus: AccessibilityStatus;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'LineString',
    srid: 4326,
  })
  path: any;

  @OneToMany('RoadSegment', (segment: RoadSegment) => segment.road)
  segments: RoadSegment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
