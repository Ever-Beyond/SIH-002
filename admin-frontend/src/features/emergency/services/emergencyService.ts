import { useEmergencyStore } from '../../../store/emergencyStore';
import type { EmergencyData, AIRecommendation, ActionPlan } from '../types';

export const emergencyService = {
  getDashboardData: async (): Promise<{ data: EmergencyData, recommendations: AIRecommendation[], plans: ActionPlan[] }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const state = useEmergencyStore.getState();
    return {
      data: state.emergencyData,
      recommendations: state.recommendations,
      plans: state.actionPlans
    };
  },

  approveRecommendation: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    useEmergencyStore.getState().approveRecommendation(id);
  },

  rejectRecommendation: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    useEmergencyStore.getState().rejectRecommendation(id);
  },

  runSimulation: async (scenario: import('../types').SimulationScenario): Promise<import('../types').SimulationResult> => {
    // Simulate complex calculation latency
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock data generators based on scenario
    const isSevere = scenario === 'FLOOD' || scenario === 'MULTIPLE_INCIDENTS';
    
    return {
      scenario,
      affectedRoads: isSevere ? ['NH-37', 'State Highway 12', 'NH-27'] : ['NH-37'],
      affectedVehicles: isSevere ? ['VH-1023', 'VH-1054', 'VH-1099', 'VH-1102', 'VH-1150'] : ['VH-1023', 'VH-1054'],
      affectedShipments: isSevere ? ['SHP-2026-105', 'SHP-2026-302', 'SHP-2026-550'] : ['SHP-2026-105'],
      routeAlternatives: [
        { original: 'NH-37', alternative: 'NH-27 Bypass', addedDelayMinutes: 120 },
        ...(isSevere ? [{ original: 'State Highway 12', alternative: 'Local Road Network Alpha', addedDelayMinutes: 240 }] : [])
      ],
      estimatedDelays: [
        { region: 'Kamrup', delayHours: isSevere ? 8 : 2 },
        { region: 'Dibrugarh', delayHours: isSevere ? 12 : 0 }
      ],
      aiRecommendations: [
        {
          id: `SIM-REC-${Date.now()}`,
          description: `Reroute all active fleets near the ${scenario.toLowerCase().replace('_', ' ')} epicenter.`,
          riskAssessment: `Simulation indicates a high risk of catastrophic supply chain failure if fleet continues on current trajectory.`,
          actionSteps: [
            'Trigger fleet-wide alert.',
            'Push alternate coordinates to navigation units.',
            'Establish staging zones outside the affected area.'
          ],
          status: 'PENDING'
        }
      ]
    };
  }
};
