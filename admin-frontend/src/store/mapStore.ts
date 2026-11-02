import { create } from 'zustand';

interface MapState {
  center: [number, number]; // [lat, lng]
  zoom: number;
  activeOverlays: string[]; // e.g. ['traffic', 'weather']
  selectedEntityId: string | null;
  selectedEntityType: 'VEHICLE' | 'INCIDENT' | 'CORRIDOR' | null;
  
  // Actions
  setCenter: (center: [number, number], zoom?: number) => void;
  toggleOverlay: (overlay: string) => void;
  setSelectedEntity: (id: string | null, type: 'VEHICLE' | 'INCIDENT' | 'CORRIDOR' | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: [26.1445, 91.7362], // Default to Guwahati
  zoom: 7,
  activeOverlays: ['traffic'],
  selectedEntityId: null,
  selectedEntityType: null,

  setCenter: (center, zoom) => set((state) => ({
    center,
    zoom: zoom ?? state.zoom
  })),

  toggleOverlay: (overlay) => set((state) => {
    const active = state.activeOverlays.includes(overlay);
    return {
      activeOverlays: active 
        ? state.activeOverlays.filter(o => o !== overlay)
        : [...state.activeOverlays, overlay]
    };
  }),

  setSelectedEntity: (id, type) => set({
    selectedEntityId: id,
    selectedEntityType: type
  })
}));
