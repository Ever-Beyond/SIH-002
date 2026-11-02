import { apiClient } from './client';

export const routeApi = {
  // Routes overlap with logistics and ai in this domain, 
  // keeping separate module for specialized routing algorithms
  getRoutePlan: async (origin: string, destination: string): Promise<unknown> => {
    const response = await apiClient.get('/routes/plan', { params: { origin, destination } });
    return response.data;
  }
};
