export type VehicleStatus = 'ACTIVE' | 'IDLE' | 'OFFLINE' | 'MAINTENANCE';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Location {
  lat: number;
  lng: number;
  address: string;
  timestamp: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  type: string;
  status: VehicleStatus;
  currentRiskLevel: RiskLevel;
  location: Location;
  driverId: string;
  driverName: string;
  speedKmH: number;
  batteryOrFuelLevel: number; // percentage 0-100
  lastPing: string;
}

export interface FleetFilters {
  searchQuery?: string;
  status?: VehicleStatus | 'ALL';
  riskLevel?: RiskLevel | 'ALL';
}

export interface ShipmentDetail {
  id: string;
  destination: string;
  status: 'IN_TRANSIT' | 'DELAYED' | 'PENDING' | 'DELIVERED';
  eta: string;
  goodsType: string;
  weight: string;
}

export interface RouteSegment {
  location: string;
  timestamp: string;
  status: 'COMPLETED' | 'CURRENT' | 'PENDING';
}

export interface VehicleIncident {
  id: string;
  type: string;
  severity: RiskLevel;
  timestamp: string;
  description: string;
}

export interface VehicleDetails extends Vehicle {
  currentShipment: ShipmentDetail | null;
  routeHistory: RouteSegment[];
  incidentHistory: VehicleIncident[];
}

export type DriverStatus = 'AVAILABLE' | 'ON_DUTY' | 'OFF_DUTY' | 'SUSPENDED';

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  status: DriverStatus;
  contactNumber: string;
  assignedVehicleId: string | null;
}

export interface TripRecord {
  id: string;
  date: string;
  vehicleId: string;
  distanceKm: number;
  startLocation: string;
  endLocation: string;
  status: 'COMPLETED' | 'CANCELLED' | 'IN_PROGRESS';
}

export interface DriverDetails extends Driver {
  tripHistory: TripRecord[];
}

export interface RouteAlternative {
  id: string;
  distanceKm: number;
  eta: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  reason: string;
  pathOverview: string;
}

export interface RerouteRecommendation {
  vehicleId: string;
  currentRouteRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  alternatives: RouteAlternative[];
}
