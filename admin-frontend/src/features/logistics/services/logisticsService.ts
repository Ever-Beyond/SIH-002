import { useShipmentStore } from '../../../store/shipmentStore';
import { shipmentApi } from '../../../api/shipmentApi';
import { shouldUseRealApi } from '../../../api/client';
import type { Shipment, ShipmentFiltersState } from '../types';

export const logisticsService = {
  getShipments: async (filters: ShipmentFiltersState): Promise<Shipment[]> => {
    if (shouldUseRealApi()) return shipmentApi.getShipments(filters);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...useShipmentStore.getState().shipments];

    if (filters.searchQuery) {
      const lowerQ = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.id.toLowerCase().includes(lowerQ) || 
        s.origin.toLowerCase().includes(lowerQ) ||
        s.destination.toLowerCase().includes(lowerQ) ||
        (s.assignedVehicleId && s.assignedVehicleId.toLowerCase().includes(lowerQ))
      );
    }
    
    if (filters.status !== 'ALL') {
      filtered = filtered.filter(s => s.status === filters.status);
    }

    if (filters.priority !== 'ALL') {
      filtered = filtered.filter(s => s.priority === filters.priority);
    }

    if (filters.commodityType !== 'ALL') {
      filtered = filtered.filter(s => s.commodityType === filters.commodityType);
    }

    return filtered;
  },

  getShipmentById: async (id: string) => {
    if (shouldUseRealApi()) return shipmentApi.getShipmentById(id);

    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Lazy load the detailed mock data to avoid circular deps if they existed
    const { mockShipmentDetails } = await import('../mockDetails');
    
    const details = mockShipmentDetails[id];
    if (!details) {
      throw new Error('Shipment not found');
    }
    return details;
  }
};
