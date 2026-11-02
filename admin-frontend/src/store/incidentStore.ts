import { create } from 'zustand';
import type { Incident, IncidentStatus } from '../features/incidents/types';
import { mockIncidents } from '../features/incidents/mockData';

interface IncidentState {
  incidents: Incident[];
  
  // Actions
  init: () => void;
  updateIncidentStatus: (id: string, status: IncidentStatus) => void;
  addIncident: (incident: Incident) => void;
}

export const useIncidentStore = create<IncidentState>((set) => ({
  incidents: mockIncidents,

  init: () => {
    // Kept for backward compatibility
  },

  updateIncidentStatus: (id, status) => set((state) => ({
    incidents: state.incidents.map(inc => inc.id === id ? { ...inc, status } : inc)
  })),

  addIncident: (incident) => set((state) => ({
    incidents: [incident, ...state.incidents]
  }))
}));
