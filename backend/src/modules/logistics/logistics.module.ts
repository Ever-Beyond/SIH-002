import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsService } from './shipments.service.js';
import { ShipmentsController } from './shipments.controller.js';
import { Shipment } from './entities/shipment.entity.js';
import { Vehicle } from '../fleet/entities/vehicle.entity.js';
import { Driver } from '../fleet/entities/driver.entity.js';
import { Route } from './entities/route.entity.js';
import { RoutesService } from './routes.service.js';
import { RoutesController } from './routes.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Vehicle, Driver, Route])],
  providers: [ShipmentsService, RoutesService],
  controllers: [ShipmentsController, RoutesController],
  exports: [ShipmentsService]
})
export class LogisticsModule {}
