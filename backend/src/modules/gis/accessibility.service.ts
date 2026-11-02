import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Road } from './entities/road.entity.js';
import { RoadStatus, AccessibilityStatus } from './entities/road.enums.js';
import { Incident, IncidentStatus } from '../incidents/entities/incident.entity.js';
import { WeatherLocation } from '../weather/entities/weather-location.entity.js';

@Injectable()
export class AccessibilityService {
  private readonly logger = new Logger(AccessibilityService.name);

  constructor(
    @InjectRepository(Road)
    private readonly roadRepository: Repository<Road>,
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    @InjectRepository(WeatherLocation)
    private readonly weatherRepository: Repository<WeatherLocation>,
  ) {}

  async getCurrentAccessibility() {
    this.logger.log('Calculating real-time GIS accessibility state...');
    
    // 1. Fetch Known Closures & Road Status Impacts
    const closures = await this.roadRepository.createQueryBuilder('road')
      .where('road.status = :closedStatus', { closedStatus: RoadStatus.CLOSED })
      .orWhere('road.accessibilityStatus != :allVehicles', { allVehicles: AccessibilityStatus.ALL_VEHICLES })
      .getMany();

    // 2. Fetch Active Incidents
    const activeIncidents = await this.incidentRepository.createQueryBuilder('incident')
      .where('incident.status IN (:...statuses)', { statuses: [IncidentStatus.OPEN, IncidentStatus.IN_PROGRESS] })
      .getMany();

    // 3. Fetch Weather Data (Assuming we want to overlay all active weather points for the GIS frontend)
    const weatherData = await this.weatherRepository.find();

    // The frontend expects GIS-ready data layers to paint over the map
    return {
      timestamp: new Date().toISOString(),
      layers: {
        closures,
        incidents: activeIncidents,
        weather: weatherData,
      },
      summary: {
        totalClosures: closures.length,
        activeIncidents: activeIncidents.length,
        weatherStations: weatherData.length,
      }
    };
  }
}
