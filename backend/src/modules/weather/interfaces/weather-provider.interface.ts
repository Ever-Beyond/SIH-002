import { NormalizedWeather } from '../dto/normalized-weather.dto.js';

export interface WeatherProvider {
  readonly sourceName: string;
  fetchCurrent(lat: number, lng: number): Promise<NormalizedWeather>;
  fetchForecast(lat: number, lng: number): Promise<NormalizedWeather[]>;
}
