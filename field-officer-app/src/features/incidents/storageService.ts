import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LocalIncidentRecord, SyncStatus } from '../../shared-types/types';

const STORAGE_KEY = '@ner_shield_incidents';

export const storageService = {
  saveIncident: async (incident: LocalIncidentRecord): Promise<void> => {
    try {
      const existing = await storageService.getIncidents();
      const updated = [incident, ...existing];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving incident locally:', error);
      throw error;
    }
  },

  getIncidents: async (): Promise<LocalIncidentRecord[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching incidents from storage:', error);
      return [];
    }
  },

  updateSyncStatus: async (localId: string, status: SyncStatus): Promise<void> => {
    try {
      const incidents = await storageService.getIncidents();
      const updated = incidents.map(inc => 
        inc.localId === localId ? { ...inc, syncStatus: status, updatedAt: new Date().toISOString() } : inc
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating sync status:', error);
      throw error;
    }
  },

  updateSyncStatusAndRetry: async (localId: string, status: SyncStatus, retryCount: number): Promise<void> => {
    try {
      const incidents = await storageService.getIncidents();
      const updated = incidents.map(inc => 
        inc.localId === localId ? { ...inc, syncStatus: status, retryCount, updatedAt: new Date().toISOString() } : inc
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating sync retry:', error);
      throw error;
    }
  },

  clearAll: async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
};
