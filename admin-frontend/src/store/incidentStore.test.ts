import { describe, it, expect, beforeEach } from 'vitest';
import { useIncidentStore } from './incidentStore';

describe('incidentStore', () => {
  beforeEach(() => {
    const initialState = useIncidentStore.getInitialState();
    useIncidentStore.setState(initialState, true);
    vi.useFakeTimers();
    useIncidentStore.getState().init();
    vi.advanceTimersByTime(1000);
    vi.useRealTimers();
  });

  it('should update incident status', () => {
    const state = useIncidentStore.getState();
    const incidentToUpdate = state.incidents[0];
    
    state.updateIncidentStatus(incidentToUpdate.id, 'RESOLVED');
    
    const updatedState = useIncidentStore.getState();
    const updatedIncident = updatedState.incidents.find(i => i.id === incidentToUpdate.id);
    expect(updatedIncident?.status).toBe('RESOLVED');
  });

  it('should add new incident to the top of the list', () => {
    const state = useIncidentStore.getState();
    const initialCount = state.incidents.length;
    
    const newIncident = {
      id: 'inc_test',
      title: 'Test Incident',
      type: 'WEATHER',
      severity: 'HIGH',
      status: 'ACTIVE',
      location: { lat: 0, lng: 0, address: 'Test' },
      timestamp: new Date().toISOString(),
    };
    
    state.addIncident(newIncident as unknown as import('../features/incidents/types').Incident);
    
    const updatedState = useIncidentStore.getState();
    expect(updatedState.incidents.length).toBe(initialCount + 1);
    expect(updatedState.incidents[0].id).toBe('inc_test');
  });
});
