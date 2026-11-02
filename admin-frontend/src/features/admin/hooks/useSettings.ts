import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import type { SystemSettingsConfig } from '../types';
import { useToast } from '../../../components';

export const useSettings = () => {
  const [settings, setSettings] = useState<SystemSettingsConfig | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMutating, setIsMutating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchSettings = useCallback(async () => {
    try {
      const data = await adminService.getSettings();
      setSettings(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load system settings.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: SystemSettingsConfig) => {
    setIsMutating(true);
    try {
      const updated = await adminService.updateSettings(newSettings);
      setSettings(updated);
      addToast({ title: 'Settings Saved', message: 'System configurations have been successfully updated.', type: 'success' });
    } catch (err) {
      console.error(err);
      addToast({ title: 'Error', message: 'Failed to save system settings.', type: 'error' });
    } finally {
      setIsMutating(false);
    }
  };

  return {
    settings,
    isLoading,
    isMutating,
    error,
    updateSettings,
    refresh: fetchSettings
  };
};
