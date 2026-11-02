import { apiClient } from './client';
import type { AiPrediction, RiskCorridor, RiskCorridorDetails, SimulationParams, RouteSimulationResult } from '../features/ai/types';

export const aiApi = {
  getPredictions: async (): Promise<AiPrediction[]> => {
    const response = await apiClient.get<AiPrediction[]>('/ai/predictions');
    return response.data;
  },

  getRiskCorridors: async (): Promise<RiskCorridor[]> => {
    const response = await apiClient.get<RiskCorridor[]>('/ai/risk-corridors');
    return response.data;
  },

  getRiskCorridorDetails: async (corridorId: string): Promise<RiskCorridorDetails> => {
    const response = await apiClient.get<RiskCorridorDetails>(`/ai/risk-corridors/${corridorId}`);
    return response.data;
  },

  simulateRoute: async (params: SimulationParams): Promise<RouteSimulationResult> => {
    const response = await apiClient.post<RouteSimulationResult>('/ai/simulate-route', params);
    return response.data;
  }
};
