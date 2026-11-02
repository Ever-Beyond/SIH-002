import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IncidentSeverity, IncidentStatus, IncidentType } from '../entities/incident.entity.js';
import { GeoLocationDto } from './create-incident.dto.js';

export class UpdateIncidentDto {
  @IsEnum(IncidentType)
  @IsOptional()
  type?: IncidentType;

  @IsEnum(IncidentSeverity)
  @IsOptional()
  severity?: IncidentSeverity;

  @IsString()
  @IsOptional()
  district?: string;

  @IsEnum(IncidentStatus)
  @IsOptional()
  status?: IncidentStatus;

  @IsString()
  @IsOptional()
  timestamp?: string; // ISO string

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
