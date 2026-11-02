import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { RiskLevel, VehicleStatus } from '../entities/vehicle.entity.js';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  plateNumber: string;

  @IsString()
  @IsNotEmpty()
  type: string;

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
