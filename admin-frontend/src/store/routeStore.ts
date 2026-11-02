import { create } from 'zustand';
import type { AiPrediction, RiskCorridor, RiskCorridorDetails, RouteSimulationResult } from '../features/ai/types';
import { mockPredictions, mockRiskCorridors, mockRiskCorridorDetails, mockRouteSimulationResult } from '../features/ai/mockData';

interface RouteState {
  predictions: AiPrediction[];
  riskCorridors: RiskCorridor[];
  riskCorridorDetails: Record<string, RiskCorridorDetails>;
  routeSimulation: RouteSimulationResult | null;
  
  // Actions
  setRouteSimulation: (result: RouteSimulationResult | null) => void;
  runSimulation: () => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  predictions: mockPredictions,
  riskCorridors: mockRiskCorridors,
  riskCorridorDetails: mockRiskCorridorDetails,
  routeSimulation: mockRouteSimulationResult,

  setRouteSimulation: (result) => set({ routeSimulation: result }),
  
  runSimulation: () => {
    // In a real app, this would trigger an API call. For now, it just resets to mock data to simulate a run.
    set({ routeSimulation: null });
    setTimeout(() => {
      set({ routeSimulation: mockRouteSimulationResult });
    }, 1500);
  }
}));
