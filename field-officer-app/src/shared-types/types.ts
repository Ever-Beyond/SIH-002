export type IncidentStatus = 'PENDING' | 'DISPATCHED' | 'ON_SCENE' | 'RESOLVED' | 'FALSE_ALARM';
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IncidentType = 'ACCIDENT' | 'BREAKDOWN' | 'MEDICAL' | 'SECURITY' | 'WEATHER' | 'ROADBLOCK' | 'OTHER';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Incident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  status: IncidentStatus;
  location: Location;
  reportedAt: string;
  resolvedAt?: string;
  description: string;
  reportedBy: string; // User ID
}

export type SystemRole = 'SUPER_ADMIN' | 'ADMIN' | 'OFFICER' | 'FIELD_OFFICER' | 'DRIVER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: SystemRole;
}

export type SyncStatus = 'PENDING' | 'SYNCING' | 'SYNCED' | 'FAILED';

export interface LocalIncidentRecord extends Partial<Incident> {
  localId: string;
  syncStatus: SyncStatus;
  retryCount: number;
  createdAt: string;
  updatedAt: string;
  photoUri?: string;
}
