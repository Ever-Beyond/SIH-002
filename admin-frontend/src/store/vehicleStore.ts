import { create } from 'zustand';
import type { Vehicle, VehicleDetails, Driver, DriverDetails } from '../features/fleet/types';
import { mockVehicles, mockVehicleDetails, mockDrivers, mockDriverDetails } from '../features/fleet/mockData';

interface VehicleState {
  vehicles: Vehicle[];
  vehicleDetails: Record<string, VehicleDetails>;
  drivers: Driver[];
  driverDetails: Record<string, DriverDetails>;
  
  // Actions
  init: () => void;
  updateVehicleStatus: (id: string, status: Vehicle['status']) => void;
  updateDriverStatus: (id: string, status: Driver['status']) => void;
}

export const useVehicleStore = create<VehicleState>((set) => ({
  vehicles: mockVehicles,
  vehicleDetails: mockVehicleDetails,
  drivers: mockDrivers,
  driverDetails: mockDriverDetails,

  init: () => {
    // Kept for backward compatibility
  },

  updateVehicleStatus: (id, status) => set((state) => ({
    vehicles: state.vehicles.map(v => v.id === id ? { ...v, status } : v),
    vehicleDetails: state.vehicleDetails[id] ? {
      ...state.vehicleDetails,
      [id]: { ...state.vehicleDetails[id], status }
    } : state.vehicleDetails
  })),

  updateDriverStatus: (id, status) => set((state) => ({
    drivers: state.drivers.map(d => d.id === id ? { ...d, status } : d),
    driverDetails: state.driverDetails[id] ? {
      ...state.driverDetails,
      [id]: { ...state.driverDetails[id], status }
    } : state.driverDetails
  }))
}));
