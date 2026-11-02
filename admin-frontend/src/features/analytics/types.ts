export interface DeliveryMetrics {
  averageDeliveryTimeHours: number;
  averageDelayMinutes: number;
  deliveryTimeHistory: { date: string; avgTime: number; avgDelay: number }[];
}

export interface IncidentMetrics {
  totalIncidents: number;
  incidentsByDistrict: { district: string; count: number }[];
}

export interface FleetMetrics {
  vehicleUtilizationPercent: number;
}

export interface RiskMetrics {
  routeDisruptionRatePercent: number;
  districtAccessibility: { district: string; score: number }[]; // 0-100 score
  criticalCorridorRisk: { corridor: string; riskLevel: number }[]; // 0-10 scale
}

export interface AnalyticsDashboardData {
  delivery: DeliveryMetrics;
  incidents: IncidentMetrics;
  fleet: FleetMetrics;
  risk: RiskMetrics;
}

export interface ReportFilterState {
  startDate: string;
  endDate: string;
  district: string;
  commodity: string;
  vehicleId: string;
  incidentType: string;
  routeId: string;
}

export interface GeneratedReport {
  id: string;
  timestamp: string;
  filters: ReportFilterState;
  status: 'COMPLETED' | 'FAILED';
  summary: string;
}
