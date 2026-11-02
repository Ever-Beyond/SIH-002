import { useState, useEffect, useCallback, useMemo } from 'react';
import { adminService } from '../services/adminService';
import type { User, CreateUserDTO, UpdateUserDTO, SystemRole, UserStatus } from '../types';
import { useToast } from '../../../components';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<SystemRole | ''>('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | ''>('');

  const fetchUsers = useCallback(async () => {
    try {
      const data = await adminService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load users.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter ? user.role === roleFilter : true;
      const matchesStatus = statusFilter ? user.status === statusFilter : true;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const createUser = async (data: CreateUserDTO) => {
    setIsMutating(true);
    try {
      const newUser = await adminService.createUser(data);
      setUsers(prev => [newUser, ...prev]);
      addToast({ title: 'User Created', message: `${newUser.name} has been added.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: 'Failed to create user.', type: 'error' });
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const updateUser = async (id: string, data: UpdateUserDTO) => {
    setIsMutating(true);
    try {
      const updated = await adminService.updateUser(id, data);
      setUsers(prev => prev.map(u => u.id === id ? updated : u));
      addToast({ title: 'User Updated', message: `${updated.name}'s details saved.`, type: 'success' });
    } catch (err) {
      addToast({ title: 'Error', message: 'Failed to update user.', type: 'error' });
      throw err;
    } finally {
      setIsMutating(false);
    }
  };

  const toggleStatus = async (id: string) => {
    setIsMutating(true);
    try {
      const updated = await adminService.toggleUserStatus(id);
      setUsers(prev => prev.map(u => u.id === id ? updated : u));
      addToast({ 
        title: 'Status Changed', 
        message: `User is now ${updated.status}.`, 
        type: updated.status === 'ACTIVE' ? 'success' : 'info' 
      });
    } catch {
      addToast({ title: 'Error', message: 'Failed to change user status.', type: 'error' });
    } finally {
      setIsMutating(false);
    }
  };

  return {
    users: filteredUsers,
    isLoading,
    isMutating,
    error,
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    createUser,
    updateUser,
    toggleStatus,
    refresh: fetchUsers
  };
};
