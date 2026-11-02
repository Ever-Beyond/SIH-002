import type { CreateShipmentPayload, CommodityType, ShipmentPriority } from '../types';
import { useShipmentStore } from '../../../store/shipmentStore';
import { shipmentApi as globalShipmentApi } from '../../../api/shipmentApi';
import { shouldUseRealApi } from '../../../api/client';

export const shipmentApi = {
  createShipment: async (payload: CreateShipmentPayload): Promise<{ success: boolean; id?: string; error?: string }> => {
    if (shouldUseRealApi()) return globalShipmentApi.createShipment(payload);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate random failure (~10% chance) to demonstrate error state handling
    if (Math.random() < 0.1) {
      return { success: false, error: 'Simulated network timeout. Please try again.' };
    }

    const newId = `SHP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    // Add to our global Zustand store so it shows up in the table immediately
    useShipmentStore.getState().addShipment({
      id: newId,
      origin: payload.origin,
      destination: payload.destination,
      commodityType: (payload.commodityType || 'GENERAL') as CommodityType, // Cast to handle empty string
      weightKg: parseInt(payload.quantity) || 0, // Map quantity to weightKg
      assignedVehicleId: payload.vehicle || null, // Map vehicle to assignedVehicleId
      status: 'PENDING',
      priority: (payload.priority || 'LOW') as ShipmentPriority, // Cast to handle empty string
      eta: null,
      createdAt: new Date().toISOString()
    });

    console.log('Shipment created and added to mock data:', payload);

    return {
      success: true,
      id: newId
    };
  }
};
