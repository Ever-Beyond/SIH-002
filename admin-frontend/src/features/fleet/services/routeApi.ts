import type { RerouteRecommendation } from '../types';

export const routeApi = {
  reroute: async (vehicleId: string): Promise<RerouteRecommendation> => {
    // Simulate network delay for AI pathfinding
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      vehicleId,
      currentRouteRisk: 'HIGH',
      alternatives: [
        {
          id: 'ALT-1',
          distanceKm: 42.5,
          eta: '1h 15m',
          riskLevel: 'LOW',
          reason: 'Avoids heavy traffic on NH-27. Safe weather conditions.',
          pathOverview: 'Via State Highway 12 -> Ring Road'
        },
        {
          id: 'ALT-2',
          distanceKm: 38.0,
          eta: '55m',
          riskLevel: 'MEDIUM',
          reason: 'Fastest route, but passes through a moderate risk corridor.',
          pathOverview: 'Via NH-10 -> City Bypass'
        },
        {
          id: 'ALT-3',
          distanceKm: 55.2,
          eta: '1h 40m',
          riskLevel: 'LOW',
          reason: 'Maximum safety. Completely avoids all known incident zones.',
          pathOverview: 'Via Old Eastern Highway'
        }
      ]
    };
  },

  acceptRoute: async (routeId: string): Promise<boolean> => {
    // Simulate network delay for updating the vehicle's route
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log(`Successfully assigned new route: ${routeId}`);
    return true;
  }
};
