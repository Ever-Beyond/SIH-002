import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Incident } from './entities/incident.entity.js';
import { CreateIncidentDto } from './dto/create-incident.dto.js';
import { UpdateIncidentDto } from './dto/update-incident.dto.js';
import { IncidentCreatedEvent, IncidentUpdatedEvent, IncidentEventPayload } from './events/incident-events.js';

@Injectable()
export class IncidentsService {
  private readonly logger = new Logger(IncidentsService.name);

  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  private toPayload(incident: Incident): IncidentEventPayload {
    return {
      id: incident.id,
      type: incident.type,
      severity: incident.severity,
      status: incident.status,
      district: incident.district,
      location: incident.location,
      timestamp: incident.timestamp.toISOString(),
    };
  }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    const payload = {
      ...createIncidentDto,
      timestamp: new Date(createIncidentDto.timestamp),
    };

    const incident = this.incidentRepository.create(payload);
    const saved = await this.incidentRepository.save(incident);
    this.logger.log(`[AUDIT] Incident Created: ${saved.id} - Type: ${saved.type}, Severity: ${saved.severity}`);
    
    this.eventEmitter.emit('incident.created', new IncidentCreatedEvent(this.toPayload(saved)));
    return saved;
  }

  async findAll(): Promise<Incident[]> {
    return this.incidentRepository.find({
      order: { timestamp: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Incident> {
    const incident = await this.incidentRepository.findOne({
      where: { id },
    });

    if (!incident) {
      throw new NotFoundException(`Incident with ID ${id} not found`);
    }

    return incident;
  }

  async update(id: string, updateIncidentDto: UpdateIncidentDto): Promise<Incident> {
    const incident = await this.findOne(id);

    const payload: any = { ...updateIncidentDto };
    if (updateIncidentDto.timestamp) {
      payload.timestamp = new Date(updateIncidentDto.timestamp);
    }

    let hasMeaningfulChange = false;

    if (updateIncidentDto.severity && updateIncidentDto.severity !== incident.severity) {
      this.logger.log(`[AUDIT] Incident ${id} Severity Escalated/De-escalated: ${incident.severity} -> ${updateIncidentDto.severity}`);
      hasMeaningfulChange = true;
    }
    if (updateIncidentDto.status && updateIncidentDto.status !== incident.status) {
      this.logger.log(`[AUDIT] Incident ${id} Status Changed: ${incident.status} -> ${updateIncidentDto.status}`);
      hasMeaningfulChange = true;
    }
    if (updateIncidentDto.type && updateIncidentDto.type !== incident.type) hasMeaningfulChange = true;
    if (updateIncidentDto.district && updateIncidentDto.district !== incident.district) hasMeaningfulChange = true;
    
    // Simplistic location check
    if (updateIncidentDto.location && JSON.stringify(updateIncidentDto.location) !== JSON.stringify(incident.location)) {
       hasMeaningfulChange = true;
    }
    
    // We update DB even if no meaningful change (maybe description changed), 
    // but only emit realtime event for core payload fields
    await this.incidentRepository.update(id, payload);
    const updated = await this.findOne(id);

    if (hasMeaningfulChange) {
      this.eventEmitter.emit('incident.updated', new IncidentUpdatedEvent(this.toPayload(updated)));
    }

    return updated;
  }
}
