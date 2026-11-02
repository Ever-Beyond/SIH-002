import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherLocation } from './entities/weather-location.entity.js';
import { WeatherRecord } from './entities/weather-record.entity.js';
import { WeatherService } from './weather.service.js';
import { WeatherController } from './weather.controller.js';
import { MockWeatherProvider } from './providers/mock-weather.provider.js';

@Module({
  imports: [TypeOrmModule.forFeature([WeatherLocation, WeatherRecord])],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    {
      // Dependency injection of the interface using a string token
      provide: 'WEATHER_PROVIDER',
      // In production/future tasks, this could be switched dynamically based on config
      useClass: MockWeatherProvider,
    },
  ],
  exports: [WeatherService],
})
export class WeatherModule {}
