import { mockRoads, mockCorridors, mockIncidents, mockRoadDetails, mockRouteDetails } from '../mockData';
import type { AccessibilityFiltersState } from '../types';

export const accessibilityService = {
  getRoadNetwork: async (filters: AccessibilityFiltersState) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    let filtered = [...mockRoads];

    if (filters.status !== 'ALL') {
      filtered = filtered.filter(r => r.status === filters.status);
    }
    if (filters.risk !== 'ALL') {
      filtered = filtered.filter(r => r.riskLevel === filters.risk);
    }
    if (filters.district !== 'ALL') {
      filtered = filtered.filter(r => r.district === filters.district);
    }
    return filtered;
  },

  getCriticalCorridors: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockCorridors;
  },

  getIncidents: async (filters: AccessibilityFiltersState) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    let filtered = [...mockIncidents];
    if (filters.incidentType !== 'ALL') {
      // For this mock, we assume the map incident matches the road type or similar logic
      // In a real scenario, this would be a spatial join
      filtered = filtered.filter(i => i.type === filters.incidentType);
    }
    return filtered;
  },

  getRoadDetails: async (roadId: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const details = mockRoadDetails[roadId];
    if (!details) {
      throw new Error('Road details not found');
    }
    return details;
  },

  getRouteDetails: async (routeId: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const details = mockRouteDetails[routeId];
    if (!details) {
      throw new Error('Route details not found');
    }
    return details;
  }
};
