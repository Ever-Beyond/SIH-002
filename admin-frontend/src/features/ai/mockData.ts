import type { AiPrediction } from './types';

export const mockPredictions: AiPrediction[] = [
  {
    id: 'PRD-1001',
    affectedRoute: 'NH-27 Guwahati Bypass',
    riskCategory: 'WEATHER',
    riskScore: 85,
    confidence: 92,
    predictionTimeWindow: 'Next 12 Hours',
    reason: 'Heavy rainfall pattern matching historical landslide precursors.',
    modelVersion: 'v2.1.0-weather',
    dateGenerated: new Date().toISOString()
  },
  {
    id: 'PRD-1002',
    affectedRoute: 'Shillong Highway',
    riskCategory: 'TRAFFIC',
    riskScore: 65,
    confidence: 78,
    predictionTimeWindow: '14:00 - 18:00',
    reason: 'Congestion buildup expected due to localized construction.',
    modelVersion: 'v1.4.2-traffic',
    dateGenerated: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'PRD-1003',
    affectedRoute: 'Teesta Valley Road',
    riskCategory: 'INFRASTRUCTURE',
    riskScore: 90,
    confidence: 88,
    predictionTimeWindow: 'Next 48 Hours',
    reason: 'Bridge structural sensors indicate stress beyond baseline thresholds.',
    modelVersion: 'v3.0.0-infra',
    dateGenerated: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'PRD-1004',
    affectedRoute: 'Siliguri Corridor',
    riskCategory: 'SECURITY',
    riskScore: 45,
    confidence: 60,
    predictionTimeWindow: 'Next 24 Hours',
    reason: 'Anomalous movement detected near border checkpoints.',
    modelVersion: 'v1.1.0-sec',
    dateGenerated: new Date(Date.now() - 10800000).toISOString()
  }
];

export const mockRiskCorridors: import('./types').RiskCorridor[] = [
  { id: 'COR-001', name: "Siliguri Corridor (Chicken's Neck)", ranking: 1, riskScore: 88, disruptionProbability: 75 },
  { id: 'COR-002', name: "Teesta Valley Pass", ranking: 2, riskScore: 72, disruptionProbability: 60 },
  { id: 'COR-003', name: "Guwahati-Shillong Supply Line", ranking: 3, riskScore: 45, disruptionProbability: 30 }
];

export const mockRiskCorridorDetails: Record<string, import('./types').RiskCorridorDetails> = {
  'COR-001': {
    ...mockRiskCorridors[0],
    historicalIncidents: 14,
    weatherImpact: 'Heavy Rainfall Warning',
    currentAccessibility: 'PARTIAL',
    affectedShipments: 12,
    recommendedAction: 'Pre-position emergency clearing equipment and divert non-essential commercial freight to southern bypasses.',
    coordinates: [[26.7135, 88.4239], [26.5000, 88.8000], [26.4000, 89.2000]]
  },
  'COR-002': {
    ...mockRiskCorridors[1],
    historicalIncidents: 22,
    weatherImpact: 'Flash Flood Risk',
    currentAccessibility: 'BLOCKED',
    affectedShipments: 5,
    recommendedAction: 'Full reroute of all active shipments to alternative mountain passes. Initiate emergency protocol for trapped vehicles.',
    coordinates: [[27.0500, 88.2667], [27.0800, 88.3500], [27.1200, 88.4000]]
  },
  'COR-003': {
    ...mockRiskCorridors[2],
    historicalIncidents: 4,
    weatherImpact: 'Clear',
    currentAccessibility: 'OPEN',
    affectedShipments: 28,
    recommendedAction: 'Monitor standard traffic patterns. No immediate AI intervention required.',
    coordinates: [[26.1158, 91.7086], [25.9000, 91.8000], [25.5788, 91.8933]]
  }
};

export const mockRouteSimulationResult: import('./types').RouteSimulationResult = {
  currentRoute: {
    id: 'RTE-CUR',
    type: 'CURRENT',
    name: 'NH-27 Primary',
    distanceKm: 450,
    etaHours: 12.5,
    riskScore: 85,
    reason: 'Original planned route. Currently passing through heavy rainfall zone.',
    coordinates: [[26.1158, 91.7086], [26.4000, 91.5000], [26.7135, 88.4239]] // Guwahati to Siliguri approx
  },
  alternativeRoutes: [
    {
      id: 'RTE-ALT-1',
      type: 'ALTERNATIVE',
      name: 'Southern Bypass',
      distanceKm: 510,
      etaHours: 14.0,
      riskScore: 30,
      reason: 'Bypasses the NH-27 flooding zone entirely. Safer but adds 1.5 hours.',
      coordinates: [[26.1158, 91.7086], [25.8000, 90.5000], [26.0000, 89.0000], [26.7135, 88.4239]]
    },
    {
      id: 'RTE-ALT-2',
      type: 'ALTERNATIVE',
      name: 'Expressway Detour',
      distanceKm: 480,
      etaHours: 13.0,
      riskScore: 45,
      reason: 'Faster than Southern bypass, but has minor traffic congestion reported.',
      coordinates: [[26.1158, 91.7086], [26.5000, 90.8000], [26.6000, 89.5000], [26.7135, 88.4239]]
    }
  ]
};
