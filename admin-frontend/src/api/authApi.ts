import { apiClient } from './client';
import type { User, CreateUserDTO, UpdateUserDTO, RolePermissionMap, SystemRole, SystemPermission, SystemSettingsConfig } from '../features/admin/types';

export const authApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  createUser: async (data: CreateUserDTO): Promise<User> => {
    const response = await apiClient.post<User>('/users', data);
    return response.data;
  },

  updateUser: async (id: string, data: UpdateUserDTO): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}`, data);
    return response.data;
  },

  toggleUserStatus: async (id: string): Promise<User> => {
    const response = await apiClient.post<User>(`/users/${id}/toggle-status`);
    return response.data;
  },

  getRolePermissions: async (): Promise<RolePermissionMap> => {
    const response = await apiClient.get<RolePermissionMap>('/roles/permissions');
    return response.data;
  },

  updateRolePermissions: async (role: SystemRole, permissions: SystemPermission[]): Promise<RolePermissionMap> => {
    const response = await apiClient.put<RolePermissionMap>(`/roles/${role}/permissions`, { permissions });
    return response.data;
  },

  getSettings: async (): Promise<SystemSettingsConfig> => {
    const response = await apiClient.get<SystemSettingsConfig>('/settings');
    return response.data;
  },

  updateSettings: async (settings: SystemSettingsConfig): Promise<SystemSettingsConfig> => {
    const response = await apiClient.put<SystemSettingsConfig>('/settings', settings);
    return response.data;
  }
};
