import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RiskLevel, VehicleStatus } from '../entities/vehicle.entity.js';

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  plateNumber?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsEnum(VehicleStatus)
  @IsOptional()
  status?: VehicleStatus;

  @IsEnum(RiskLevel)
  @IsOptional()
  currentRiskLevel?: RiskLevel;

  @IsNumber()
  @IsOptional()
  speedKmH?: number;

  @IsNumber()
  @IsOptional()
  batteryOrFuelLevel?: number;

  @IsString()
  @IsOptional()
  driverId?: string;
}
