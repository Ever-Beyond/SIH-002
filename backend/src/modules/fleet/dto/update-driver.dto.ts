import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DriverStatus } from '../entities/driver.entity.js';

export class UpdateDriverDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  licenseNumber?: string;

  @IsString()
  @IsOptional()
  contactNumber?: string;

  @IsEnum(DriverStatus)
  @IsOptional()
  status?: DriverStatus;

  @IsString()
  @IsOptional()
  assignedVehicleId?: string;
}
