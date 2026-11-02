import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('authStore', () => {
  beforeEach(() => {
    const initialState = useAuthStore.getInitialState();
    useAuthStore.setState(initialState, true);
    vi.useFakeTimers();
    useAuthStore.getState().init();
    vi.advanceTimersByTime(1000);
    vi.useRealTimers();
  });

  it('should initialize with default user', () => {
    const state = useAuthStore.getState();
    expect(state.currentUser).toBeDefined();
    expect(state.users.length).toBeGreaterThan(0);
  });

  it('should login a valid user by email', () => {
    const state = useAuthStore.getState();
    const anotherUser = state.users.find(u => u.email !== state.currentUser?.email);
    
    if (anotherUser) {
      state.login(anotherUser.email);
      expect(useAuthStore.getState().currentUser?.email).toBe(anotherUser.email);
    }
  });

  it('should return null for invalid login email', () => {
    const state = useAuthStore.getState();
    state.login('invalid@example.com');
    expect(useAuthStore.getState().currentUser).toBeNull();
  });

  it('should clear currentUser on logout', () => {
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().currentUser).toBeNull();
  });

  it('should update user role and current user if self', () => {
    const state = useAuthStore.getState();
    const currentUser = state.currentUser!;
    
    expect(currentUser.role).not.toBe('ADMIN'); // Ensure it's different
    state.updateUserRole(currentUser.id, 'ADMIN');
    
    const updatedState = useAuthStore.getState();
    expect(updatedState.currentUser?.role).toBe('ADMIN');
    expect(updatedState.users.find(u => u.id === currentUser.id)?.role).toBe('ADMIN');
  });
});
