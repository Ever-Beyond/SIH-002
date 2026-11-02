import { create } from 'zustand';
import type { Shipment, ShipmentStatus } from '../features/logistics/types';
import { mockShipments } from '../features/logistics/mockData';

interface ShipmentState {
  shipments: Shipment[];
  
  // Actions
  init: () => void;
  updateShipmentStatus: (id: string, status: ShipmentStatus) => void;
  addShipment: (shipment: Shipment) => void;
}

export const useShipmentStore = create<ShipmentState>((set) => ({
  shipments: mockShipments,

  init: () => {
    // Kept for backward compatibility
  },

  updateShipmentStatus: (id, status) => set((state) => ({
    shipments: state.shipments.map(shp => shp.id === id ? { ...shp, status } : shp)
  })),

  addShipment: (shipment) => set((state) => ({
    shipments: [shipment, ...state.shipments]
  }))
}));
