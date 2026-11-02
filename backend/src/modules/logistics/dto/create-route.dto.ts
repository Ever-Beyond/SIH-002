import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { RouteStatus } from '../entities/route.enums.js';

export class GeoLineStringDto {
  @IsString()
  @IsNotEmpty()
  type: string = 'LineString';

  @IsArray()
  @ArrayMinSize(2)
  @IsArray({ each: true })
  @IsNumber({}, { each: true })
  coordinates: number[][]; // [[lng, lat], [lng, lat]]
}

export class CreateRouteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  shipmentId: string;

  @ValidateNested()
  @Type(() => GeoLineStringDto)
  @IsNotEmpty()
  path: GeoLineStringDto;

  @IsEnum(RouteStatus)
  @IsOptional()
  status?: RouteStatus;

  @IsBoolean()
  @IsOptional()
  isAlternative?: boolean;

  @IsString()
  @IsOptional()
  vehicleId?: string;
}
