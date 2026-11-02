import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity.js';
import { CreateDriverDto } from './dto/create-driver.dto.js';
import { UpdateDriverDto } from './dto/update-driver.dto.js';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const existing = await this.driverRepository.findOne({ where: { licenseNumber: createDriverDto.licenseNumber } });
    if (existing) {
      throw new ConflictException('Driver with this license number already exists');
    }

    const driver = this.driverRepository.create(createDriverDto);
    return this.driverRepository.save(driver);
  }

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find({
      relations: { vehicles: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: { id },
      relations: { vehicles: true },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return driver;
  }

  async update(id: string, updateDriverDto: UpdateDriverDto): Promise<Driver> {
    const driver = await this.findOne(id);

    if (updateDriverDto.licenseNumber && updateDriverDto.licenseNumber !== driver.licenseNumber) {
      const existing = await this.driverRepository.findOne({ where: { licenseNumber: updateDriverDto.licenseNumber } });
      if (existing) {
        throw new ConflictException('Driver with this license number already exists');
      }
    }

    await this.driverRepository.update(id, updateDriverDto);
    return this.findOne(id);
  }
}
