import { apiClient } from './client';
import type { Vehicle, FleetFilters, VehicleDetails, Driver, DriverStatus, DriverDetails } from '../features/fleet/types';

export const fleetApi = {
  getVehicles: async (filters?: FleetFilters): Promise<Vehicle[]> => {
    const response = await apiClient.get<Vehicle[]>('/fleet/vehicles', { params: filters });
    return response.data;
  },

  getVehicleById: async (id: string): Promise<Vehicle> => {
    const response = await apiClient.get<Vehicle>(`/fleet/vehicles/${id}`);
    return response.data;
  },

  getVehicleDetails: async (id: string): Promise<VehicleDetails> => {
    const response = await apiClient.get<VehicleDetails>(`/fleet/vehicles/${id}/details`);
    return response.data;
  },

  getDrivers: async (searchQuery?: string, status?: DriverStatus | 'ALL'): Promise<Driver[]> => {
    const response = await apiClient.get<Driver[]>('/fleet/drivers', { params: { searchQuery, status } });
    return response.data;
  },

  getDriverDetails: async (id: string): Promise<DriverDetails> => {
    const response = await apiClient.get<DriverDetails>(`/fleet/drivers/${id}/details`);
    return response.data;
  }
};
