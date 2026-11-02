import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { RoadStatus, AccessibilityStatus } from '../entities/road.enums.js';

export class GeoLineStringDto {
  @IsString()
  @IsNotEmpty()
  type: string = 'LineString';

  @IsArray()
  @ArrayMinSize(2)
  @IsArray({ each: true })
  @IsNumber({}, { each: true }) // [[lng, lat], [lng, lat]]
  coordinates: number[][];
}

export class CreateRoadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

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
