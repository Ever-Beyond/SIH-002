import { apiClient } from './client';

export const analyticsApi = {
  getAnalyticsDashboard: async (): Promise<unknown> => {
    const response = await apiClient.get('/analytics/dashboard');
    return response.data;
  },
  
  getReports: async (): Promise<unknown[]> => {
    const response = await apiClient.get('/analytics/reports');
    return response.data;
  }
};
