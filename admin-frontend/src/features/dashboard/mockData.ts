import type { DashboardData } from './types';

export const mockDashboardData: DashboardData = {
  metrics: {
    activeVehicles: 42,
    activeShipments: 128,
    activeIncidents: 3,
    criticalCorridors: 2,
    delayedShipments: 5,
    highRiskRoutes: 4
  },
  incidents: [
    { id: 'INC-001', type: 'Landslide', location: 'NH-10, Sikkim', severity: 'CRITICAL', timeReported: '10 mins ago' },
    { id: 'INC-002', type: 'Heavy Rainfall', location: 'Guwahati, Assam', severity: 'HIGH', timeReported: '45 mins ago' },
    { id: 'INC-003', type: 'Road Block', location: 'Shillong Highway', severity: 'MEDIUM', timeReported: '2 hours ago' }
  ],
  recommendations: [
    { id: 'REC-001', action: 'Reroute Vehicle V-124', reason: 'Landslide detected ahead on planned route.', confidence: 94, targetId: 'V-124' },
    { id: 'REC-002', action: 'Delay Shipment S-892', reason: 'Severe weather warning at destination.', confidence: 88, targetId: 'S-892' }
  ],
  delays: [
    { shipmentId: 'S-442', vehicleId: 'V-045', destination: 'Gangtok', delayReason: 'Weather', estimatedDelayMins: 120 },
    { shipmentId: 'S-451', vehicleId: 'V-088', destination: 'Itanagar', delayReason: 'Traffic', estimatedDelayMins: 45 }
  ],
  risks: [
    { routeId: 'RTE-10', origin: 'Siliguri', destination: 'Gangtok', riskLevel: 'HIGH', primaryRiskFactor: 'Landslide Probability' },
    { routeId: 'RTE-12', origin: 'Guwahati', destination: 'Shillong', riskLevel: 'MEDIUM', primaryRiskFactor: 'Visibility' }
  ],
  emergencies: [
    { id: 'EMG-01', type: 'Medical Emergency', status: 'ACTIVE', affectedVehicles: 1 }
  ]
};
