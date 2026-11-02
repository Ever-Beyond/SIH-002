import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CommodityType, ShipmentPriority, ShipmentStatus } from '../entities/shipment.entity.js';

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsEnum(CommodityType)
  @IsOptional()
  commodityType?: CommodityType;

  @IsNumber()
  @IsOptional()
  weightKg?: number;

  @IsEnum(ShipmentStatus)
  @IsOptional()
  status?: ShipmentStatus;

  @IsEnum(ShipmentPriority)
  @IsOptional()
  priority?: ShipmentPriority;

  @IsDateString()
  @IsOptional()
  eta?: string;

  @IsString()
  @IsOptional()
  assignedVehicleId?: string;

  @IsString()
  @IsOptional()
  assignedDriverId?: string;
}
