import { IncidentSeverity, IncidentStatus, IncidentType } from '../entities/incident.entity.js';

export class IncidentEventPayload {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location?: any;
  district: string;
  timestamp: string; // ISO String
}

export class IncidentCreatedEvent {
  constructor(public readonly payload: IncidentEventPayload) {}
}

export class IncidentUpdatedEvent {
  constructor(public readonly payload: IncidentEventPayload) {}
}
