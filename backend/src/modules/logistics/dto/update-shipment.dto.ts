import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CommodityType, ShipmentPriority, ShipmentStatus } from '../entities/shipment.entity.js';

export class UpdateShipmentDto {
  @IsString()
  @IsOptional()
  origin?: string;

  @IsString()
  @IsOptional()
  destination?: string;

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
