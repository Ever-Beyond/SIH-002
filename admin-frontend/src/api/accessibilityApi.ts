import { apiClient } from './client';

export const accessibilityApi = {
  getRoads: async (): Promise<unknown[]> => {
    const response = await apiClient.get('/accessibility/roads');
    return response.data;
  },
  
  getCorridors: async (): Promise<unknown[]> => {
    const response = await apiClient.get('/accessibility/corridors');
    return response.data;
  }
};
