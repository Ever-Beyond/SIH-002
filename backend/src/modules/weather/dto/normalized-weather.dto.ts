import { WeatherDataType, WeatherSeverity } from '../entities/weather.enums.js';

export interface NormalizedWeather {
  latitude: number;
  longitude: number;
  timestamp: Date;
  fetchedAt: Date;
  dataType: WeatherDataType;
  source: string;
  temperature?: number;
  humidity?: number;
  precipitation?: number;
  rainfallIntensity?: number;
  windSpeed?: number;
  windDirection?: number;
  visibility?: number;
  condition?: string;
  severity: WeatherSeverity;
  precipitationProbability?: number;
}
