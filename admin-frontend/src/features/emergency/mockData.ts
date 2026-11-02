import type { EmergencyData, AIRecommendation, ActionPlan } from './types';

export const mockEmergencyData: EmergencyData = {
  status: 'CRITICAL',
  affectedDistricts: ['Kamrup', 'Dibrugarh', 'Nagaon'],
  blockedRoutes: ['NH-37', 'NH-27', 'State Highway 12'],
  affectedVehicles: ['VH-1023', 'VH-1054', 'VH-1099', 'VH-1102'],
  criticalShipments: ['SHP-2026-105', 'SHP-2026-302', 'SHP-2026-550'],
  activeIncidents: 12
};

export const mockRecommendations: AIRecommendation[] = [
  {
    id: 'REC-001',
    description: 'Reroute critical shipments away from NH-37 due to severe roadblock.',
    riskAssessment: 'High risk of supply chain delay. Alternative route adds 2 hours but avoids indefinite stoppage.',
    actionSteps: [
      'Notify drivers of VH-1023 and VH-1054.',
      'Broadcast new coordinates via fleet comms.',
      'Alert destination warehouses of delayed ETA.'
    ],
    status: 'PENDING'
  },
  {
    id: 'REC-002',
    description: 'Dispatch emergency response team to Dibrugarh sector.',
    riskAssessment: 'Medium risk. Two vehicles stranded. Requires immediate mechanical assistance.',
    actionSteps: [
      'Locate nearest available response unit.',
      'Dispatch unit to coordinates 27.47, 94.91.',
      'Establish direct comms with stranded drivers.'
    ],
    status: 'PENDING'
  }
];

export const mockActionPlans: ActionPlan[] = [
  {
    id: 'AP-001',
    title: 'Flood Response - Kamrup',
    steps: [
      'Evacuate fleet from low-lying areas.',
      'Establish temporary staging point at higher elevation.'
    ],
    status: 'IN_PROGRESS'
  }
];
