import { RouteStatus } from '../entities/route.enums.js';
import { Route } from '../entities/route.entity.js';

export class RouteEventPayload {
  id: string;
  name: string;
  shipmentId: string;
  status: RouteStatus;
  isAlternative: boolean;
  vehicleId?: string;
  path: any;
  createdAt: string;
  updatedAt: string;
}

export class RouteUpdatedEvent {
  constructor(public readonly payload: RouteEventPayload) {}
}

export function toRoutePayload(route: Route): RouteEventPayload {
  return {
    id: route.id,
    name: route.name,
    shipmentId: route.shipmentId,
    status: route.status,
    isAlternative: route.isAlternative,
    vehicleId: route.vehicleId,
    path: route.path,
    createdAt: route.createdAt.toISOString(),
    updatedAt: route.updatedAt.toISOString(),
  };
}
