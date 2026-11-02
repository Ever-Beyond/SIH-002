import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesService } from './vehicles.service.js';
import { VehiclesController } from './vehicles.controller.js';
import { DriversService } from './drivers.service.js';
import { DriversController } from './drivers.controller.js';
import { Vehicle } from './entities/vehicle.entity.js';
import { Driver } from './entities/driver.entity.js';
import { GpsRecord } from './entities/gps-record.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Driver, GpsRecord])],
  controllers: [VehiclesController, DriversController],
  providers: [VehiclesService, DriversService],
  exports: [VehiclesService, DriversService]
})
export class FleetModule {}
