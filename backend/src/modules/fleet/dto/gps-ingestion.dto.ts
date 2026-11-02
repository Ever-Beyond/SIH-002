import { IsNumber, IsDateString, Min, Max, IsNotEmpty } from 'class-validator';

export class GpsIngestionDto {
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsNumber()
  @Min(0)
  @Max(250) // Reasonable max speed in km/h for fleet operations
  speed: number;

  @IsNumber()
  @Min(0)
  @Max(360)
  heading: number;

  @IsNotEmpty()
  @IsDateString()
  timestamp: string; // ISO 8601 UTC date string
}
