import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IncidentSeverity, IncidentStatus, IncidentType } from '../entities/incident.entity.js';

export class GeoLocationDto {
  @IsString()
  @IsNotEmpty()
  type: string = 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  coordinates: number[]; // [longitude, latitude]
}

export class CreateIncidentDto {
  @IsEnum(IncidentType)
  @IsNotEmpty()
  type: IncidentType;

  @IsEnum(IncidentSeverity)
  @IsNotEmpty()
  severity: IncidentSeverity;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsEnum(IncidentStatus)
  @IsOptional()
  status?: IncidentStatus;

  @IsString()
  @IsNotEmpty()
  timestamp: string; // ISO string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  affectedRoads?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  affectedVehicles?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photos?: string[];

  @ValidateNested()
  @Type(() => GeoLocationDto)
  @IsOptional()
  location?: GeoLocationDto;
}
