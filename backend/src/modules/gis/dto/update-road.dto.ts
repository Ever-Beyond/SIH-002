import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoadStatus, AccessibilityStatus } from '../entities/road.enums.js';
import { GeoLineStringDto } from './create-road.dto.js';

export class UpdateRoadDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsEnum(RoadStatus)
  @IsOptional()
  status?: RoadStatus;

  @IsEnum(AccessibilityStatus)
  @IsOptional()
  accessibilityStatus?: AccessibilityStatus;

  @ValidateNested()
  @Type(() => GeoLineStringDto)
  @IsOptional()
  path?: GeoLineStringDto;
}
