import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WeatherDataType, WeatherSeverity } from './weather.enums.js';

@Entity('weather_records')
export class WeatherRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  locationId: string;

  @ManyToOne('WeatherLocation', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'locationId' })
  location: any;

  @Column({ type: 'float' })
  latitude: number;

  @Column({ type: 'float' })
  longitude: number;

  @Index()
  @Column({ type: 'timestamp' })
  timestamp: Date; // The time this weather applies to (e.g., forecast time or observation time)

  @Column({ type: 'timestamp' })
  fetchedAt: Date; // The time the data was ingested from the provider

  @Column({ type: 'boolean', default: false })
  isStale: boolean; // Flag to indicate if this data is no longer considered fresh/real-time

  @Column({
    type: 'enum',
    enum: WeatherDataType,
  })
  dataType: WeatherDataType;

  @Column({ type: 'varchar' })
  source: string; // The provider name (e.g. 'MockProvider', 'OpenWeatherMap')

  @Column({ type: 'float', nullable: true })
  temperature: number | null;

  @Column({ type: 'float', nullable: true })
  humidity: number | null;

  @Column({ type: 'float', nullable: true })
  precipitation: number | null;

  @Column({ type: 'float', nullable: true })
  rainfallIntensity: number | null;

  @Column({ type: 'float', nullable: true })
  windSpeed: number | null;

  @Column({ type: 'float', nullable: true })
  windDirection: number | null;

  @Column({ type: 'float', nullable: true })
  visibility: number | null;

  @Column({ type: 'varchar', nullable: true })
  condition: string | null;

  @Column({
    type: 'enum',
    enum: WeatherSeverity,
    default: WeatherSeverity.NORMAL,
  })
  severity: WeatherSeverity;

  @Column({ type: 'float', nullable: true })
  precipitationProbability: number | null;

  @CreateDateColumn()
  createdAt: Date;
}
