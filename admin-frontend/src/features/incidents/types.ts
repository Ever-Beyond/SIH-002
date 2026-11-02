export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
export type IncidentSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IncidentType = 'ROADBLOCK' | 'WEATHER' | 'ACCIDENT' | 'INFRASTRUCTURE';

export interface Incident {
  id: string;
  type: IncidentType;
  severity: IncidentSeverity;
  district: string;
  status: IncidentStatus;
  timestamp: string;
  affectedRoads: string[];
  affectedVehicles: string[];
}

export interface IncidentDetails extends Incident {
  location: string;
  photos: string[];
  description: string;
  reporter: string;
  affectedShipments: string[];
  riskImpact: string;
}

export interface IncidentFiltersState {
  searchQuery: string;
  status: IncidentStatus | 'ALL';
  severity: IncidentSeverity | 'ALL';
  type: IncidentType | 'ALL';
  district: string | 'ALL';
  date: 'ALL' | 'LAST_24_HOURS' | 'LAST_7_DAYS' | 'LAST_30_DAYS';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
