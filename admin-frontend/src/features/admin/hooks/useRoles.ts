import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import type { RolePermissionMap, SystemRole, SystemPermission } from '../types';
import { useToast } from '../../../components';

export const useRoles = () => {
  const [roleMap, setRoleMap] = useState<RolePermissionMap | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchRoles = useCallback(async () => {
    try {
      const data = await adminService.getRolePermissions();
      setRoleMap(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load role configurations.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRoles();
  }, [fetchRoles]);

  const updatePermissions = async (role: SystemRole, permissions: SystemPermission[]) => {
    setIsMutating(true);
    try {
      const newMap = await adminService.updateRolePermissions(role, permissions);
      setRoleMap(newMap);
      addToast({ title: 'Permissions Saved', message: `Permissions for ${role} have been successfully updated.`, type: 'success' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', message: 'Failed to update role permissions.', type: 'error' });
    } finally {
      setIsMutating(false);
    }
  };

  return {
    roleMap,
    isLoading,
    isMutating,
    error,
    updatePermissions,
    refresh: fetchRoles
  };
};
