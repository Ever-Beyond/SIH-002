import { useVehicleStore } from '../../../store/vehicleStore';
import { fleetApi } from '../../../api/fleetApi';
import { shouldUseRealApi } from '../../../api/client';
import type { Vehicle, FleetFilters, VehicleDetails, Driver, DriverStatus, DriverDetails } from '../types';

export const fleetService = {
  getVehicles: async (filters?: FleetFilters): Promise<Vehicle[]> => {
    if (shouldUseRealApi()) {
      return fleetApi.getVehicles(filters);
    }

    await new Promise(resolve => setTimeout(resolve, 600));
    let filtered = [...useVehicleStore.getState().vehicles];

    if (filters) {
      if (filters.searchQuery) {
        const lowerQ = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(v => 
          v.id.toLowerCase().includes(lowerQ) || 
          v.plateNumber.toLowerCase().includes(lowerQ) ||
          v.driverName.toLowerCase().includes(lowerQ)
        );
      }
      
      if (filters.status && filters.status !== 'ALL') {
        filtered = filtered.filter(v => v.status === filters.status);
      }

      if (filters.riskLevel && filters.riskLevel !== 'ALL') {
        filtered = filtered.filter(v => v.currentRiskLevel === filters.riskLevel);
      }
    }

    return filtered;
  },

  getVehicleById: async (id: string): Promise<Vehicle | null> => {
    if (shouldUseRealApi()) {
      try {
        return await fleetApi.getVehicleById(id);
      } catch {
        return null;
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const vehicle = useVehicleStore.getState().vehicles.find(v => v.id === id);
    return vehicle || null;
  },

  getVehicleDetails: async (id: string): Promise<VehicleDetails | null> => {
    if (shouldUseRealApi()) {
      try {
        return await fleetApi.getVehicleDetails(id);
      } catch {
        return null;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    const detailsMap = useVehicleStore.getState().vehicleDetails;
    if (detailsMap[id]) {
      return detailsMap[id];
    }
    const vehicle = useVehicleStore.getState().vehicles.find(v => v.id === id);
    if (!vehicle) return null;

    return {
      ...vehicle,
      currentShipment: null,
      routeHistory: [
        { location: 'Origin Hub', timestamp: 'Unknown', status: 'COMPLETED' },
        { location: vehicle.location.address, timestamp: 'Current', status: 'CURRENT' }
      ],
      incidentHistory: []
    };
  },

  getDrivers: async (searchQuery?: string, status?: DriverStatus | 'ALL'): Promise<Driver[]> => {
    if (shouldUseRealApi()) {
      return fleetApi.getDrivers(searchQuery, status);
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    let filtered = [...useVehicleStore.getState().drivers];

    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        d.id.toLowerCase().includes(lowerQ) || 
        d.name.toLowerCase().includes(lowerQ) ||
        d.licenseNumber.toLowerCase().includes(lowerQ)
      );
    }
    
    if (status && status !== 'ALL') {
      filtered = filtered.filter(d => d.status === status);
    }

    return filtered;
  },

  getDriverDetails: async (id: string): Promise<DriverDetails | null> => {
    if (shouldUseRealApi()) {
      try {
        return await fleetApi.getDriverDetails(id);
      } catch {
        return null;
      }
    }

    await new Promise(resolve => setTimeout(resolve, 400));
    const detailsMap = useVehicleStore.getState().driverDetails;
    if (detailsMap[id]) {
      return detailsMap[id];
    }
    
    const driver = useVehicleStore.getState().drivers.find(d => d.id === id);
    if (!driver) return null;

    return {
      ...driver,
      tripHistory: []
    };
  }
};
