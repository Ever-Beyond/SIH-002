import { describe, it, expect, beforeEach } from 'vitest';
import { useVehicleStore } from './vehicleStore';

describe('vehicleStore', () => {
  beforeEach(() => {
    // Reset state before each test
    const initialState = useVehicleStore.getInitialState();
    useVehicleStore.setState(initialState, true);
    vi.useFakeTimers();
    useVehicleStore.getState().init();
    vi.advanceTimersByTime(1000);
    vi.useRealTimers();
  });

  it('should have initial state populated', () => {
    const state = useVehicleStore.getState();
    expect(state.vehicles).toBeDefined();
    expect(state.vehicles.length).toBeGreaterThan(0);
    expect(state.drivers.length).toBeGreaterThan(0);
  });

  it('should update vehicle status correctly', () => {
    const state = useVehicleStore.getState();
    const vehicleToUpdate = state.vehicles[0];
    
    // Perform update
    state.updateVehicleStatus(vehicleToUpdate.id, 'MAINTENANCE');
    
    // Verify list update
    const updatedState = useVehicleStore.getState();
    const updatedVehicle = updatedState.vehicles.find(v => v.id === vehicleToUpdate.id);
    expect(updatedVehicle?.status).toBe('MAINTENANCE');
    
    // Verify detail update if it exists
    if (updatedState.vehicleDetails[vehicleToUpdate.id]) {
      expect(updatedState.vehicleDetails[vehicleToUpdate.id].status).toBe('MAINTENANCE');
    }
  });

  it('should update driver status correctly', () => {
    const state = useVehicleStore.getState();
    const driverToUpdate = state.drivers[0];
    
    // Perform update
    state.updateDriverStatus(driverToUpdate.id, 'OFF_DUTY');
    
    // Verify list update
    const updatedState = useVehicleStore.getState();
    const updatedDriver = updatedState.drivers.find(d => d.id === driverToUpdate.id);
    expect(updatedDriver?.status).toBe('OFF_DUTY');
    
    // Verify detail update if it exists
    if (updatedState.driverDetails[driverToUpdate.id]) {
      expect(updatedState.driverDetails[driverToUpdate.id].status).toBe('OFF_DUTY');
    }
  });
});
