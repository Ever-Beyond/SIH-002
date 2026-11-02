import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Route } from './entities/route.entity.js';
import { CreateRouteDto } from './dto/create-route.dto.js';
import { UpdateRouteDto } from './dto/update-route.dto.js';
import { RouteStatus } from './entities/route.enums.js';
import { RouteUpdatedEvent, toRoutePayload } from './events/route-events.js';

@Injectable()
export class RoutesService {
  private readonly logger = new Logger(RoutesService.name);

  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createRouteDto: CreateRouteDto): Promise<Route> {
    const route = this.routeRepository.create(createRouteDto);
    const saved = await this.routeRepository.save(route);
    this.logger.log(`[AUDIT] Route Created: ${saved.id} for Shipment: ${saved.shipmentId}`);
    return saved;
  }

  async findAllByShipment(shipmentId: string): Promise<Route[]> {
    return this.routeRepository.find({
      where: { shipmentId },
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Route> {
    const route = await this.routeRepository.findOne({
      where: { id },
    });

    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }

    return route;
  }

  async update(id: string, updateRouteDto: UpdateRouteDto): Promise<Route> {
    const route = await this.findOne(id);
    let hasMeaningfulChange = false;
    
    if (updateRouteDto.status && updateRouteDto.status !== route.status) {
      this.logger.log(`[AUDIT] Route ${id} Status Changed: ${route.status} -> ${updateRouteDto.status}`);
      hasMeaningfulChange = true;
    }
    
    if (updateRouteDto.name !== undefined && updateRouteDto.name !== route.name) hasMeaningfulChange = true;
    if (updateRouteDto.isAlternative !== undefined && updateRouteDto.isAlternative !== route.isAlternative) hasMeaningfulChange = true;
    if (updateRouteDto.vehicleId !== undefined && updateRouteDto.vehicleId !== route.vehicleId) hasMeaningfulChange = true;
    if (updateRouteDto.path !== undefined && JSON.stringify(updateRouteDto.path) !== JSON.stringify(route.path)) hasMeaningfulChange = true;

    const payload: any = { ...updateRouteDto };
    await this.routeRepository.update(id, payload);
    const updated = await this.findOne(id);
    
    if (hasMeaningfulChange) {
      this.eventEmitter.emit('route.updated', new RouteUpdatedEvent(toRoutePayload(updated)));
    }
    
    return updated;
  }

  async acceptRoute(id: string, vehicleId?: string): Promise<Route> {
    const route = await this.findOne(id);
    this.logger.log(`[AUDIT] Route ${id} ACCEPTED. Vehicle: ${vehicleId || 'N/A'}`);
    
    const payload: any = { status: RouteStatus.ACCEPTED };
    let mainRouteChanged = false;
    
    if (route.status !== RouteStatus.ACCEPTED) mainRouteChanged = true;
    if (vehicleId && route.vehicleId !== vehicleId) {
      payload.vehicleId = vehicleId;
      mainRouteChanged = true;
    }
    
    await this.routeRepository.update(id, payload);

    // Ideally, we'd also mark alternatives as rejected, but standard is to just accept this one.
    // The previous implementation used createQueryBuilder, which skips returning updated entities.
    // We will do it in two steps to broadcast the rejected routes correctly.
    
    const alternatives = await this.routeRepository.find({
      where: { shipmentId: route.shipmentId }
    });
    
    for (const alt of alternatives) {
      if (alt.id !== id && alt.status !== RouteStatus.REJECTED) {
        await this.routeRepository.update(alt.id, { status: RouteStatus.REJECTED });
        const updatedAlt = await this.findOne(alt.id);
        this.eventEmitter.emit('route.updated', new RouteUpdatedEvent(toRoutePayload(updatedAlt)));
      }
    }

    const updatedMain = await this.findOne(id);
    if (mainRouteChanged) {
      this.eventEmitter.emit('route.updated', new RouteUpdatedEvent(toRoutePayload(updatedMain)));
    }
    
    return updatedMain;
  }
}
