import { useIncidentStore } from '../../../store/incidentStore';
import type { Incident, IncidentFiltersState, PaginatedResponse } from '../types';

export const incidentService = {
  getIncidents: async (filters: IncidentFiltersState, page: number, limit: number): Promise<PaginatedResponse<Incident>> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    let filtered = [...useIncidentStore.getState().incidents];

    // Filter by search query
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(inc => 
        inc.id.toLowerCase().includes(q) ||
        inc.district.toLowerCase().includes(q) ||
        inc.affectedRoads.some(r => r.toLowerCase().includes(q))
      );
    }

    // Filter by exact match fields
    if (filters.status !== 'ALL') filtered = filtered.filter(inc => inc.status === filters.status);
    if (filters.severity !== 'ALL') filtered = filtered.filter(inc => inc.severity === filters.severity);
    if (filters.type !== 'ALL') filtered = filtered.filter(inc => inc.type === filters.type);
    if (filters.district !== 'ALL') filtered = filtered.filter(inc => inc.district === filters.district);

    // Filter by date
    if (filters.date !== 'ALL') {
      const now = Date.now();
      const msPerDay = 24 * 60 * 60 * 1000;
      let threshold = 0;
      
      switch (filters.date) {
        case 'LAST_24_HOURS': threshold = msPerDay; break;
        case 'LAST_7_DAYS': threshold = 7 * msPerDay; break;
        case 'LAST_30_DAYS': threshold = 30 * msPerDay; break;
      }
      
      filtered = filtered.filter(inc => (now - new Date(inc.timestamp).getTime()) <= threshold);
    }

    // Sort by newest first
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const startIdx = (page - 1) * limit;
    const paginatedData = filtered.slice(startIdx, startIdx + limit);

    return {
      data: paginatedData,
      total,
      page,
      totalPages
    };
  },

  getIncidentDetails: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const { mockIncidentDetails } = await import('../mockDetails');
    return mockIncidentDetails[id] || null;
  },

  blockRoad: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Blocked road for incident: ${id}`);
  },

  dispatchTeam: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`Dispatched team for incident: ${id}`);
  },

  calculateAlternativeRoute: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`Calculated alternative route for incident: ${id}`);
  }
};
