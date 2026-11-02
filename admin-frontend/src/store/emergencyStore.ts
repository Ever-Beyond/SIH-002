import { create } from 'zustand';
import type { EmergencyData, AIRecommendation, ActionPlan } from '../features/emergency/types';
import { mockEmergencyData, mockRecommendations, mockActionPlans } from '../features/emergency/mockData';

interface EmergencyState {
  emergencyData: EmergencyData;
  recommendations: AIRecommendation[];
  actionPlans: ActionPlan[];
  
  // Actions
  approveRecommendation: (id: string) => void;
  rejectRecommendation: (id: string) => void;
}

export const useEmergencyStore = create<EmergencyState>((set) => ({
  emergencyData: mockEmergencyData,
  recommendations: mockRecommendations,
  actionPlans: mockActionPlans,

  approveRecommendation: (id) => set((state) => {
    const recommendations = [...state.recommendations];
    const actionPlans = [...state.actionPlans];
    
    const recIndex = recommendations.findIndex(r => r.id === id);
    if (recIndex > -1) {
      recommendations[recIndex] = { ...recommendations[recIndex], status: 'APPROVED' };
      
      const rec = recommendations[recIndex];
      actionPlans.unshift({
        id: `AP-${Date.now()}`,
        title: `(AI) ${rec.description}`,
        steps: rec.actionSteps,
        status: 'IN_PROGRESS'
      });
    }
    
    return { recommendations, actionPlans };
  }),

  rejectRecommendation: (id) => set((state) => {
    const recommendations = [...state.recommendations];
    const recIndex = recommendations.findIndex(r => r.id === id);
    if (recIndex > -1) {
      recommendations[recIndex] = { ...recommendations[recIndex], status: 'REJECTED' };
    }
    return { recommendations };
  })
}));
