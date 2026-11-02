export enum RealtimeEventType {
  VEHICLE_LOCATION_UPDATED = 'VEHICLE_LOCATION_UPDATED',
  INCIDENT_CREATED = 'INCIDENT_CREATED',
  INCIDENT_UPDATED = 'INCIDENT_UPDATED',
  ROUTE_UPDATED = 'ROUTE_UPDATED',
  ALERT_CREATED = 'ALERT_CREATED',
}

export interface EventEnvelope<T> {
  eventId: string;
  eventType: RealtimeEventType;
  resourceId: string;
  timestamp: string;
  schemaVersion: string;
  payload: T;
}

export class SubscribeDto {
  channel: string;
}
