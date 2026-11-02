export type SystemRole = 'SUPER_ADMIN' | 'ADMIN' | 'OFFICER' | 'FIELD_OFFICER' | 'DRIVER' | 'VIEWER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: SystemRole;
}

export type TripStatus = 'SCHEDULED' | 'IN_TRANSIT' | 'DELAYED' | 'COMPLETED' | 'CANCELLED';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Waypoint {
  id: string;
  location: Location;
  status: 'PENDING' | 'ARRIVED' | 'DEPARTED';
  estimatedArrivalTime: string;
}

export interface Cargo {
  id: string;
  type: string;
  weight: number;
  isHazardous: boolean;
}

export interface Trip {
  id: string;
  driverId: string;
  vehicleId: string;
  status: TripStatus;
  origin: Location;
  destination: Location;
  waypoints: Waypoint[];
  cargo: Cargo[];
  estimatedArrivalTime: string;
}
