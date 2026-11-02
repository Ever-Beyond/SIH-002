import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { RoadsService } from './roads.service.js';
import { CreateRoadDto } from './dto/create-road.dto.js';
import { UpdateRoadDto } from './dto/update-road.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole } from '../users/entities/user.entity.js';

@Controller('roads')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.OFFICER)
export class RoadsController {
  constructor(private readonly roadsService: RoadsService) {}

  @Post()
  create(@Body() createRoadDto: CreateRoadDto) {
    return this.roadsService.create(createRoadDto);
  }

  @Get()
  findAll() {
    return this.roadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roadsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoadDto: UpdateRoadDto) {
    return this.roadsService.update(id, updateRoadDto);
  }

  @Get(':id/incidents')
  findIncidentsAlongRoad(
    @Param('id') id: string,
    @Query('distance') distance?: number,
  ) {
    return this.roadsService.findIncidentsAlongRoad(id, distance ? Number(distance) : 500);
  }
}
