import { IsEnum, IsOptional, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RouteStatus } from '../entities/route.enums.js';
import { GeoLineStringDto } from './create-route.dto.js';

export class UpdateRouteDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(RouteStatus)
  @IsOptional()
  status?: RouteStatus;

  @IsBoolean()
  @IsOptional()
  isAlternative?: boolean;

  @IsString()
  @IsOptional()
  vehicleId?: string;

  @ValidateNested()
  @Type(() => GeoLineStringDto)
  @IsOptional()
  path?: GeoLineStringDto;
}
