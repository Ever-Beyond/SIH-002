export interface RoadSegment {
  id: string;
  name: string;
  district: string;
  status: 'OPEN' | 'PARTIAL' | 'BLOCKED';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: 'HIGHWAY' | 'LOCAL' | 'DIRT';
  coordinates: [number, number][];
}

export interface CriticalCorridor {
  id: string;
  name: string;
  status: 'OPERATIONAL' | 'COMPROMISED';
  coordinates: [number, number][];
}

export interface MapIncident {
  id: string;
  type: 'LANDSLIDE' | 'FLOOD' | 'ACCIDENT' | 'CONSTRUCTION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  coordinates: [number, number];
}

export interface AccessibilityFiltersState {
  status: 'ALL' | 'OPEN' | 'PARTIAL' | 'BLOCKED';
  risk: 'ALL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  district: string | 'ALL';
  incidentType: 'ALL' | 'LANDSLIDE' | 'FLOOD' | 'ACCIDENT' | 'CONSTRUCTION';
}

export interface RoadDetailsData extends RoadSegment {
  weatherImpact: string;
  affectedVehicles: string[];
  affectedShipments: string[];
  recentIncidents: {
    id: string;
    type: 'LANDSLIDE' | 'FLOOD' | 'ACCIDENT' | 'CONSTRUCTION';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    date: string;
  }[];
  alternativeRoutes: {
    id: string;
    name: string;
    status: 'OPEN' | 'PARTIAL' | 'BLOCKED';
  }[];
}

export interface RouteDetailsData {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedTimeMinutes: number;
  currentRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'PARTIAL' | 'BLOCKED';
  weatherImpact: string;
  segments: {
    id: string;
    name: string;
    status: 'OPEN' | 'PARTIAL' | 'BLOCKED';
  }[];
  incidents: MapIncident[];
  coordinates: [number, number][];
  alternativeRoutes: {
    id: string;
    name: string;
    distanceKm: number;
    status: 'OPEN' | 'PARTIAL' | 'BLOCKED';
  }[];
}
