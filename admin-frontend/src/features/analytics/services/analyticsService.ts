import { shouldUseRealApi } from '../../../api/client';
import { analyticsApi } from '../../../api/analyticsApi';
import { mockAnalyticsData, mockReports } from '../mockData';
import type { AnalyticsDashboardData, GeneratedReport, ReportFilterState } from '../types';

let currentReports = [...mockReports];

export const analyticsService = {
  getDashboardData: async (): Promise<AnalyticsDashboardData> => {
    if (shouldUseRealApi()) return analyticsApi.getAnalyticsDashboard() as unknown as AnalyticsDashboardData;
    // Simulate network delay to show off loading states
    await new Promise(resolve => setTimeout(resolve, 1200));
    return mockAnalyticsData;
  },

  getReports: async (): Promise<GeneratedReport[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...currentReports]; // return a copy
  },

  generateReport: async (filters: ReportFilterState): Promise<GeneratedReport> => {
    // Simulate a long report generation process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newReport: GeneratedReport = {
      id: `REP-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toISOString(),
      filters,
      status: 'COMPLETED',
      summary: `Custom generated report for period ${filters.startDate || 'Any'} to ${filters.endDate || 'Any'}.`
    };
    
    currentReports = [newReport, ...currentReports];
    return newReport;
  }
};
