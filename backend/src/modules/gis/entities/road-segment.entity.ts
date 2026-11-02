import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Road } from './road.entity.js';
import { RoadStatus, AccessibilityStatus } from './road.enums.js';

@Entity('road_segments')
export class RoadSegment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Road', (road: Road) => road.segments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roadId' })
  road: Road;

  @Column({ type: 'uuid' })
  roadId: string;

  @Column({ type: 'float' })
  startDistanceKm: number;

  @Column({ type: 'float' })
  endDistanceKm: number;

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
  segmentPath: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
