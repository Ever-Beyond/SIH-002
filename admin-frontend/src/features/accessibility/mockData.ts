import type { RoadSegment, CriticalCorridor, MapIncident } from './types';

export const mockRoads: RoadSegment[] = [
  {
    id: 'RD-001',
    name: 'NH-27 Guwahati Bypass',
    district: 'Kamrup',
    status: 'OPEN',
    riskLevel: 'LOW',
    type: 'HIGHWAY',
    coordinates: [[26.1158, 91.7086], [26.1445, 91.7362], [26.1550, 91.7800]]
  },
  {
    id: 'RD-002',
    name: 'Shillong Road',
    district: 'Ri-Bhoi',
    status: 'PARTIAL',
    riskLevel: 'MEDIUM',
    type: 'HIGHWAY',
    coordinates: [[26.1158, 91.7086], [25.9000, 91.8000], [25.5788, 91.8933]]
  },
  {
    id: 'RD-003',
    name: 'Teesta Valley Road',
    district: 'Darjeeling',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    type: 'LOCAL',
    coordinates: [[27.0500, 88.2667], [27.0800, 88.3500], [27.1200, 88.4000]]
  }
];

export const mockCorridors: CriticalCorridor[] = [
  {
    id: 'COR-001',
    name: 'Siliguri Corridor (Chicken\'s Neck)',
    status: 'OPERATIONAL',
    coordinates: [[26.7135, 88.4239], [26.5000, 88.8000], [26.4000, 89.2000]]
  }
];

export const mockIncidents: MapIncident[] = [
  {
    id: 'INC-001',
    type: 'LANDSLIDE',
    severity: 'CRITICAL',
    coordinates: [27.0800, 88.3500] // Blocking Teesta Valley Road
  },
  {
    id: 'INC-002',
    type: 'FLOOD',
    severity: 'HIGH',
    coordinates: [26.1500, 91.7500]
  }
];

export const mockRoadDetails: Record<string, import('./types').RoadDetailsData> = {
  'RD-001': {
    ...mockRoads[0], // NH-27
    weatherImpact: 'Heavy Rainfall Warning',
    affectedVehicles: ['V-102', 'V-104'],
    affectedShipments: ['SHP-2026-001', 'SHP-2026-003'],
    recentIncidents: [
      { id: 'INC-001', type: 'LANDSLIDE', severity: 'HIGH', date: '2026-09-08T06:00:00Z' }
    ],
    alternativeRoutes: [
      { id: 'RD-004', name: 'Nongpoh Bypass', status: 'PARTIAL' }
    ]
  },
  'RD-002': {
    ...mockRoads[1], // Shillong Road
    weatherImpact: 'Clear',
    affectedVehicles: [],
    affectedShipments: [],
    recentIncidents: [],
    alternativeRoutes: []
  },
  'RD-003': {
    ...mockRoads[2], // Teesta Valley
    weatherImpact: 'Snowstorm',
    affectedVehicles: ['V-105'],
    affectedShipments: ['SHP-2026-006'],
    recentIncidents: [
      { id: 'INC-002', type: 'CONSTRUCTION', severity: 'MEDIUM', date: '2026-09-07T12:00:00Z' }
    ],
    alternativeRoutes: [
      { id: 'RD-005', name: 'Bhalukpong Alt Route', status: 'OPEN' }
    ]
  }
};

export const mockRouteDetails: Record<string, import('./types').RouteDetailsData> = {
  'RT-001': {
    id: 'RT-001',
    name: 'Guwahati - Shillong Supply Route',
    origin: 'Guwahati',
    destination: 'Shillong',
    distanceKm: 98.5,
    estimatedTimeMinutes: 160,
    currentRisk: 'HIGH',
    status: 'PARTIAL',
    weatherImpact: 'Heavy Rain',
    segments: [
      { id: 'RD-001', name: 'NH-27 Guwahati Bypass', status: 'OPEN' },
      { id: 'RD-002', name: 'Shillong Road', status: 'PARTIAL' }
    ],
    incidents: [
      mockIncidents[1] // Flood
    ],
    coordinates: [
      [26.1158, 91.7086], [26.1445, 91.7362], [26.1550, 91.7800], 
      [25.9000, 91.8000], [25.5788, 91.8933]
    ],
    alternativeRoutes: [
      { id: 'RT-004', name: 'Nongpoh Bypass Route', distanceKm: 112, status: 'OPEN' }
    ]
  }
};
