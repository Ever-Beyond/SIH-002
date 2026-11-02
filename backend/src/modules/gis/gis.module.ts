import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoadsService } from './roads.service.js';
import { RoadsController } from './roads.controller.js';
import { Road } from './entities/road.entity.js';
import { RoadSegment } from './entities/road-segment.entity.js';
import { District } from './entities/district.entity.js';
import { AccessibilityService } from './accessibility.service.js';
import { AccessibilityController } from './accessibility.controller.js';
import { Incident } from '../incidents/entities/incident.entity.js';
import { WeatherLocation } from '../weather/entities/weather-location.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Road, RoadSegment, District, Incident, WeatherLocation])],
  controllers: [RoadsController, AccessibilityController],
  providers: [RoadsService, AccessibilityService],
  exports: [RoadsService, AccessibilityService],
})
export class GisModule {}
