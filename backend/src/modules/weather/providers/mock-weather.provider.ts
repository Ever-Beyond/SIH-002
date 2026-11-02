import { Injectable } from '@nestjs/common';
import { WeatherProvider } from '../interfaces/weather-provider.interface.js';
import { NormalizedWeather } from '../dto/normalized-weather.dto.js';
import { WeatherDataType, WeatherSeverity } from '../entities/weather.enums.js';

@Injectable()
export class MockWeatherProvider implements WeatherProvider {
  readonly sourceName = 'MockProvider';

  async fetchCurrent(lat: number, lng: number): Promise<NormalizedWeather> {
    // Deterministic mock data for testing
    return {
      latitude: lat,
      longitude: lng,
      timestamp: new Date(),
      fetchedAt: new Date(),
      dataType: WeatherDataType.OBSERVED,
      source: this.sourceName,
      temperature: 22.5,
      humidity: 60,
      precipitation: 0,
      rainfallIntensity: 0,
      windSpeed: 15,
      windDirection: 180,
      visibility: 10000,
      condition: 'Clear',
      severity: WeatherSeverity.NORMAL,
    };
  }

  async fetchForecast(lat: number, lng: number): Promise<NormalizedWeather[]> {
    const forecast: NormalizedWeather[] = [];
    const now = new Date();
    
    for (let i = 1; i <= 3; i++) {
      const forecastTime = new Date(now.getTime() + i * 3600000); // Hourly forecast
      forecast.push({
        latitude: lat,
        longitude: lng,
        timestamp: forecastTime,
        fetchedAt: now,
        dataType: WeatherDataType.FORECAST,
        source: this.sourceName,
        temperature: 22.5 - (i * 0.5),
        humidity: 60 + (i * 2),
        precipitation: i === 3 ? 2.5 : 0,
        rainfallIntensity: i === 3 ? 1.2 : 0,
        windSpeed: 15 + i,
        windDirection: 180 + (i * 10),
        visibility: i === 3 ? 5000 : 10000,
        condition: i === 3 ? 'Rain' : 'Clear',
        severity: i === 3 ? WeatherSeverity.WARNING : WeatherSeverity.NORMAL,
        precipitationProbability: i === 3 ? 80 : 10,
      });
    }

    return forecast;
  }
}
