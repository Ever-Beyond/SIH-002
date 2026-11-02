import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity.js';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
