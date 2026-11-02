import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DriverStatus } from '../entities/driver.entity.js';

export class CreateDriverDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsEnum(DriverStatus)
  @IsOptional()
  status?: DriverStatus;

  @IsString()
  @IsOptional()
  assignedVehicleId?: string;
}
