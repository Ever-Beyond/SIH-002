import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherLocation } from './entities/weather-location.entity.js';
import { WeatherRecord } from './entities/weather-record.entity.js';
import type { WeatherProvider } from './interfaces/weather-provider.interface.js';
import { NormalizedWeather } from './dto/normalized-weather.dto.js';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  
  // We use string token for dependency injection of the provider interface
  constructor(
    @Inject('WEATHER_PROVIDER')
    private readonly weatherProvider: WeatherProvider,
    @InjectRepository(WeatherLocation)
    private readonly locationRepository: Repository<WeatherLocation>,
    @InjectRepository(WeatherRecord)
    private readonly recordRepository: Repository<WeatherRecord>,
  ) {}

  async syncAllLocations(): Promise<void> {
    this.logger.log('Starting weather synchronization...');
    const locations = await this.locationRepository.find();
    
    for (const location of locations) {
      // The location.location is a PostGIS Point: { type: 'Point', coordinates: [lng, lat] }
      // Assuming PostGIS maps it cleanly. Let's safely extract coordinates.
      if (!location.location || !location.location.coordinates) {
        this.logger.warn(`Location ${location.id} has no valid coordinates. Skipping.`);
        continue;
      }
      
      const lng = location.location.coordinates[0];
      const lat = location.location.coordinates[1];
      
      try {
        // Fetch current and forecast in parallel with a timeout logic if it were a real provider
        // Mock provider is instant, but real providers need timeout handling.
        const [current, forecast] = await Promise.all([
          this.withTimeout(this.weatherProvider.fetchCurrent(lat, lng), 5000),
          this.withTimeout(this.weatherProvider.fetchForecast(lat, lng), 5000)
        ]);

        // Mark old records for this location as stale
        await this.recordRepository.update(
          { locationId: location.id, isStale: false },
          { isStale: true }
        );

        // Save new records
        await this.saveRecord(location.id, current);
        for (const f of forecast) {
          await this.saveRecord(location.id, f);
        }

      } catch (error: any) {
        this.logger.error(`Failed to sync weather for location ${location.id}: ${error.message}`, error.stack);
        // We do not crash the sync process; we continue to the next location.
      }
    }
    
    this.logger.log('Weather synchronization complete.');
  }

  async getLatestWeather(locationId: string): Promise<WeatherRecord[]> {
    // Returns the most recent valid (non-stale) records for a location.
    // If none are fresh, it returns the stale ones so the frontend at least has fallback data.
    const freshRecords = await this.recordRepository.find({
      where: { locationId, isStale: false },
      order: { timestamp: 'ASC' }
    });

    if (freshRecords.length > 0) {
      return freshRecords;
    }

    this.logger.warn(`No fresh weather data found for location ${locationId}. Returning stale data.`);
    return this.recordRepository.find({
      where: { locationId, isStale: true },
      order: { fetchedAt: 'DESC', timestamp: 'ASC' },
      take: 24 // limits to avoid massive payload
    });
  }

  private async saveRecord(locationId: string, data: NormalizedWeather): Promise<void> {
    const record = this.recordRepository.create({
      locationId,
      latitude: data.latitude,
      longitude: data.longitude,
      timestamp: data.timestamp,
      fetchedAt: data.fetchedAt,
      isStale: false,
      dataType: data.dataType,
      source: data.source,
      temperature: data.temperature,
      humidity: data.humidity,
      precipitation: data.precipitation,
      rainfallIntensity: data.rainfallIntensity,
      windSpeed: data.windSpeed,
      windDirection: data.windDirection,
      visibility: data.visibility,
      condition: data.condition,
      severity: data.severity,
      precipitationProbability: data.precipitationProbability,
    });
    await this.recordRepository.save(record);
  }

  // A generic timeout wrapper to protect against hung external APIs
  private withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Weather provider timeout')), ms);
      promise.then(value => {
        clearTimeout(timer);
        resolve(value);
      }).catch(reason => {
        clearTimeout(timer);
        reject(reason);
      });
    });
  }
}
