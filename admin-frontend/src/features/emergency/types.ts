export type EmergencyStatus = 'NORMAL' | 'ELEVATED' | 'CRITICAL';
export type RecommendationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface EmergencyData {
  status: EmergencyStatus;
  affectedDistricts: string[];
  blockedRoutes: string[];
  affectedVehicles: string[];
  criticalShipments: string[];
  activeIncidents: number;
}

export interface AIRecommendation {
  id: string;
  description: string;
  riskAssessment: string;
  actionSteps: string[];
  status: RecommendationStatus;
}

export interface ActionPlan {
  id: string;
  title: string;
  steps: string[];
  status: 'IN_PROGRESS' | 'COMPLETED';
}

export type SimulationScenario = 'LANDSLIDE' | 'FLOOD' | 'HEAVY_RAINFALL' | 'ROAD_BLOCKAGE' | 'MULTIPLE_INCIDENTS';

export interface RouteAlternative {
  original: string;
  alternative: string;
  addedDelayMinutes: number;
}

export interface EstimatedDelay {
  region: string;
  delayHours: number;
}

export interface SimulationResult {
  scenario: SimulationScenario;
  affectedRoads: string[];
  affectedVehicles: string[];
  affectedShipments: string[];
  routeAlternatives: RouteAlternative[];
  estimatedDelays: EstimatedDelay[];
  aiRecommendations: AIRecommendation[];
}

