export interface KpiMetrics {
  activeVehicles: number;
  activeShipments: number;
  activeIncidents: number;
  criticalCorridors: number;
  delayedShipments: number;
  highRiskRoutes: number;
}

export interface CriticalIncident {
  id: string;
  type: string;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  timeReported: string;
}

export interface AiRecommendation {
  id: string;
  action: string;
  reason: string;
  confidence: number;
  targetId: string;
}

export interface DelayedDelivery {
  shipmentId: string;
  vehicleId: string;
  destination: string;
  delayReason: string;
  estimatedDelayMins: number;
}

export interface RouteRisk {
  routeId: string;
  origin: string;
  destination: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  primaryRiskFactor: string;
}

export interface EmergencyStatus {
  id: string;
  type: string;
  status: 'ACTIVE' | 'RESOLVING' | 'RESOLVED';
  affectedVehicles: number;
}

export interface DashboardData {
  metrics: KpiMetrics;
  incidents: CriticalIncident[];
  recommendations: AiRecommendation[];
  delays: DelayedDelivery[];
  risks: RouteRisk[];
  emergencies: EmergencyStatus[];
}
