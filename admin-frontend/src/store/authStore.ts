import { create } from 'zustand';
import type { User, RolePermissionMap, SystemSettingsConfig } from '../features/admin/types';
import { mockUsers, mockRolePermissions, mockSystemSettings } from '../features/admin/mockData';

interface AuthState {
  currentUser: User | null;
  users: User[];
  rolePermissions: RolePermissionMap;
  settings: SystemSettingsConfig;
  
  // Actions
  init: () => void;
  login: (email: string) => void;
  logout: () => void;
  updateSettings: (newSettings: SystemSettingsConfig) => void;
  updateUserRole: (userId: string, role: User['role']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Default to the first super admin for testing purposes
  currentUser: mockUsers[0],
  users: mockUsers,
  rolePermissions: mockRolePermissions,
  settings: mockSystemSettings,

  init: () => {
    // Kept for backward compatibility
  },

  login: (email) => set((state) => ({ 
    currentUser: state.users.find(u => u.email === email) || null 
  })),
  
  logout: () => set({ currentUser: null }),
  
  updateSettings: (newSettings) => set({ settings: newSettings }),
  
  updateUserRole: (userId, role) => set((state) => ({
    users: state.users.map(u => u.id === userId ? { ...u, role } : u),
    // Update currentUser if we are changing our own role
    currentUser: state.currentUser?.id === userId ? { ...state.currentUser, role } : state.currentUser
  }))
}));
