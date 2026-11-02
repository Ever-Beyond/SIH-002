export interface AiPrediction {
  id: string;
  affectedRoute: string; // e.g. "NH-27 Guwahati Bypass"
  riskCategory: 'WEATHER' | 'TRAFFIC' | 'INFRASTRUCTURE' | 'SECURITY';
  riskScore: number; // 0-100
  confidence: number; // probability (0-100)
  predictionTimeWindow: string; // e.g. "Next 24 Hours", "14:00 - 18:00"
  reason: string;
  modelVersion: string;
  dateGenerated: string;
}

export interface RiskCorridor {
  id: string;
  name: string;
  ranking: number;
  riskScore: number;
  disruptionProbability: number;
}

export interface RiskCorridorDetails extends RiskCorridor {
  historicalIncidents: number;
  weatherImpact: string;
  currentAccessibility: 'OPEN' | 'PARTIAL' | 'BLOCKED';
  affectedShipments: number;
  recommendedAction: string;
  coordinates: [number, number][];
}

export interface SimulationParams {
  vehicle: string;
  origin: string;
  destination: string;
  priority: string;
}

export interface SimulatedRoute {
  id: string;
  type: 'CURRENT' | 'ALTERNATIVE';
  name: string;
  distanceKm: number;
  etaHours: number;
  riskScore: number;
  reason: string;
  coordinates: [number, number][];
}

export interface RouteSimulationResult {
  currentRoute: SimulatedRoute;
  alternativeRoutes: SimulatedRoute[];
}
