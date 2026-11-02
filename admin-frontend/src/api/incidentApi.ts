import { apiClient } from './client';
import type { Incident, IncidentFiltersState, PaginatedResponse } from '../features/incidents/types';
import type { EmergencyData, AIRecommendation, ActionPlan, SimulationScenario, SimulationResult } from '../features/emergency/types';

export const incidentApi = {
  getIncidents: async (filters: IncidentFiltersState, page: number, limit: number): Promise<PaginatedResponse<Incident>> => {
    const response = await apiClient.get<PaginatedResponse<Incident>>('/incidents', {
      params: { ...filters, page, limit }
    });
    return response.data;
  },

  getIncidentDetails: async (id: string): Promise<unknown> => {
    const response = await apiClient.get(`/incidents/${id}`);
    return response.data;
  },

  blockRoad: async (id: string): Promise<void> => {
    await apiClient.post(`/incidents/${id}/block-road`);
  },

  dispatchTeam: async (id: string): Promise<void> => {
    await apiClient.post(`/incidents/${id}/dispatch-team`);
  },

  calculateAlternativeRoute: async (id: string): Promise<void> => {
    await apiClient.post(`/incidents/${id}/calculate-route`);
  },

  getEmergencyDashboardData: async (): Promise<{ data: EmergencyData, recommendations: AIRecommendation[], plans: ActionPlan[] }> => {
    const response = await apiClient.get('/emergency/dashboard');
    return response.data;
  },

  approveRecommendation: async (id: string): Promise<void> => {
    await apiClient.post(`/emergency/recommendations/${id}/approve`);
  },

  rejectRecommendation: async (id: string): Promise<void> => {
    await apiClient.post(`/emergency/recommendations/${id}/reject`);
  },

  runSimulation: async (scenario: SimulationScenario): Promise<SimulationResult> => {
    const response = await apiClient.post<SimulationResult>('/emergency/simulate', { scenario });
    return response.data;
  }
};
