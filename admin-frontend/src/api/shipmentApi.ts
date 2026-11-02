import { apiClient } from './client';
import type { Shipment, ShipmentFiltersState, CreateShipmentPayload } from '../features/logistics/types';

export const shipmentApi = {
  getShipments: async (filters: ShipmentFiltersState): Promise<Shipment[]> => {
    const response = await apiClient.get<Shipment[]>('/shipments', { params: filters });
    return response.data;
  },

  getShipmentById: async (id: string): Promise<unknown> => { // Using any for details currently
    const response = await apiClient.get(`/shipments/${id}`);
    return response.data;
  },

  createShipment: async (payload: CreateShipmentPayload): Promise<{ success: boolean; id?: string; error?: string }> => {
    const response = await apiClient.post('/shipments', payload);
    return response.data;
  }
};
