export type ShipmentStatus = 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'DELAYED' | 'CANCELLED';
export type ShipmentPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type CommodityType = 'GENERAL' | 'HAZARDOUS' | 'PERISHABLE' | 'FRAGILE' | 'SECURE';

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  commodityType: CommodityType;
  weightKg: number;
  assignedVehicleId: string | null;
  status: ShipmentStatus;
  priority: ShipmentPriority;
  eta: string | null;
  createdAt: string;
}

export interface ShipmentFiltersState {
  searchQuery: string;
  status: ShipmentStatus | 'ALL';
  priority: ShipmentPriority | 'ALL';
  commodityType: CommodityType | 'ALL';
}

export interface CreateShipmentPayload {
  commodityType: CommodityType | '';
  origin: string;
  destination: string;
  priority: ShipmentPriority | '';
  quantity: string;
  requiredDeliveryTime: string;
  vehicle: string;
  driver: string;
  specialRequirements: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: 'success' | 'warning' | 'danger' | 'neutral' | 'primary';
}

export interface ShipmentDetails extends Shipment {
  driverName: string;
  driverPhone: string;
  currentLocation: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  incidentImpact: string | null;
  timeline: TimelineEvent[];
}
