import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { UserRole } from '../users/entities/user.entity.js';

@Controller('weather')
@UseGuards(JwtAuthGuard)
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('location/:id')
  async getLatestWeather(@Param('id') locationId: string) {
    // Does not call external provider. Only fetches from DB as per constraint.
    return this.weatherService.getLatestWeather(locationId);
  }

  // Protected endpoint for manual synchronization, ready for cron automation later.
  @Post('sync')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.ADMIN)
  async syncAllLocations() {
    // Fire and forget or await depending on requirement. We will await to return status.
    await this.weatherService.syncAllLocations();
    return { success: true, message: 'Weather synchronization triggered and completed.' };
  }
}
