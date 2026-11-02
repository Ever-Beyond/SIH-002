import type { AiPrediction } from '../types';
import { useRouteStore } from '../../../store/routeStore';

export const aiService = {
  getPredictions: async (): Promise<AiPrediction[]> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...useRouteStore.getState().predictions];
  },

  getRiskCorridors: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...useRouteStore.getState().riskCorridors];
  },

  getRiskCorridorDetails: async (corridorId: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const details = useRouteStore.getState().riskCorridorDetails[corridorId];
    if (!details) throw new Error('Risk corridor details not found');
    return details;
  },

  simulateRoute: async (params: import('../types').SimulationParams) => {
    // Simulate complex ML computation time
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Simulation requested for:', params);
    
    return useRouteStore.getState().routeSimulation;
  }
};
