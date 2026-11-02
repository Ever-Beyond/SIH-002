import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Road } from './entities/road.entity.js';
import { CreateRoadDto } from './dto/create-road.dto.js';
import { UpdateRoadDto } from './dto/update-road.dto.js';
import { Incident } from '../incidents/entities/incident.entity.js';

@Injectable()
export class RoadsService {
  private readonly logger = new Logger(RoadsService.name);

  constructor(
    @InjectRepository(Road)
    private readonly roadRepository: Repository<Road>,
  ) {}

  async create(createRoadDto: CreateRoadDto): Promise<Road> {
    const road = this.roadRepository.create(createRoadDto);
    const saved = await this.roadRepository.save(road);
    this.logger.log(`[AUDIT] Road Created: ${saved.id} - ${saved.name}`);
    return saved;
  }

  async findAll(): Promise<Road[]> {
    return this.roadRepository.find({
      relations: { segments: true },
    });
  }

  async findOne(id: string): Promise<Road> {
    const road = await this.roadRepository.findOne({
      where: { id },
      relations: { segments: true },
    });

    if (!road) {
      throw new NotFoundException(`Road with ID ${id} not found`);
    }

    return road;
  }

  async update(id: string, updateRoadDto: UpdateRoadDto): Promise<Road> {
    const road = await this.findOne(id);

    if (updateRoadDto.status && updateRoadDto.status !== road.status) {
      this.logger.log(`[AUDIT] Road ${id} Status Changed: ${road.status} -> ${updateRoadDto.status}`);
    }
    if (updateRoadDto.accessibilityStatus && updateRoadDto.accessibilityStatus !== road.accessibilityStatus) {
      this.logger.log(`[AUDIT] Road ${id} Accessibility Changed: ${road.accessibilityStatus} -> ${updateRoadDto.accessibilityStatus}`);
    }

    const payload: any = { ...updateRoadDto };
    await this.roadRepository.update(id, payload);
    return this.findOne(id);
  }

  async findIncidentsAlongRoad(id: string, distanceMeters: number = 500): Promise<Incident[]> {
    const road = await this.findOne(id);
    
    if (!road.path) {
      return [];
    }

    // Uses PostGIS ST_DWithin to find incidents within X meters of the road's LineString geometry
    // Geography cast is used to measure in accurate meters on the sphere
    return this.roadRepository.manager
      .createQueryBuilder(Incident, 'incident')
      .where('ST_DWithin(incident.location::geography, ST_GeomFromGeoJSON(:path)::geography, :distance)')
      .setParameters({
        path: JSON.stringify(road.path),
        distance: distanceMeters
      })
      .getMany();
  }
}
