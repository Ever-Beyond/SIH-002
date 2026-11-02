import { useAuthStore } from '../../../store/authStore';
import { authApi } from '../../../api/authApi';
import { shouldUseRealApi } from '../../../api/client';
import type { User, CreateUserDTO, UpdateUserDTO, UserStatus, RolePermissionMap, SystemRole, SystemPermission, SystemSettingsConfig } from '../types';

export const adminService = {
  getUsers: async (): Promise<User[]> => {
    if (shouldUseRealApi()) return authApi.getUsers();
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...useAuthStore.getState().users];
  },

  createUser: async (data: CreateUserDTO): Promise<User> => {
    if (shouldUseRealApi()) return authApi.createUser(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const currentUsers = useAuthStore.getState().users;
    const newUser: User = {
      ...data,
      id: `USR-00${currentUsers.length + 1}`,
      lastLogin: null,
      createdAt: new Date().toISOString()
    };
    useAuthStore.setState({ users: [newUser, ...currentUsers] });
    return newUser;
  },

  updateUser: async (id: string, data: UpdateUserDTO): Promise<User> => {
    if (shouldUseRealApi()) return authApi.updateUser(id, data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const users = [...useAuthStore.getState().users];
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    users[index] = { ...users[index], ...data };
    useAuthStore.setState({ users });
    return users[index];
  },

  toggleUserStatus: async (id: string): Promise<User> => {
    if (shouldUseRealApi()) return authApi.toggleUserStatus(id);
    await new Promise(resolve => setTimeout(resolve, 600));
    const users = [...useAuthStore.getState().users];
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    
    const newStatus: UserStatus = users[index].status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    users[index] = { ...users[index], status: newStatus };
    useAuthStore.setState({ users });
    return users[index];
  },

  getRolePermissions: async (): Promise<RolePermissionMap> => {
    if (shouldUseRealApi()) return authApi.getRolePermissions();
    await new Promise(resolve => setTimeout(resolve, 600));
    return JSON.parse(JSON.stringify(useAuthStore.getState().rolePermissions));
  },

  updateRolePermissions: async (role: SystemRole, permissions: SystemPermission[]): Promise<RolePermissionMap> => {
    if (shouldUseRealApi()) return authApi.updateRolePermissions(role, permissions);
    if (role === 'SUPER_ADMIN') throw new Error('Cannot modify SUPER_ADMIN permissions');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const rolePermissions = JSON.parse(JSON.stringify(useAuthStore.getState().rolePermissions));
    rolePermissions[role] = permissions;
    useAuthStore.setState({ rolePermissions });
    return rolePermissions;
  },

  getSettings: async (): Promise<SystemSettingsConfig> => {
    if (shouldUseRealApi()) return authApi.getSettings();
    await new Promise(resolve => setTimeout(resolve, 500));
    return JSON.parse(JSON.stringify(useAuthStore.getState().settings));
  },

  updateSettings: async (settings: SystemSettingsConfig): Promise<SystemSettingsConfig> => {
    if (shouldUseRealApi()) return authApi.updateSettings(settings);
    await new Promise(resolve => setTimeout(resolve, 800));
    const newSettings = JSON.parse(JSON.stringify(settings));
    useAuthStore.setState({ settings: newSettings });
    return newSettings;
  }
};
