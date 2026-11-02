import { storageService } from './storageService';
import type { LocalIncidentRecord } from '../../shared-types/types';

// Mock API function that occasionally fails to demonstrate resilient retries
const mockApiUpload = async (incident: LocalIncidentRecord): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate
      if (isSuccess) resolve();
      else reject(new Error('Network or Server Error'));
    }, 1500); // simulate 1.5s latency
  });
};

export const syncManager = {
  isProcessing: false,
  
  processQueue: async (onProgress?: (count: number) => void): Promise<void> => {
    if (syncManager.isProcessing) return;
    
    syncManager.isProcessing = true;
    
    try {
      const allIncidents = await storageService.getIncidents();
      const pendingQueue = allIncidents.filter(inc => 
        inc.syncStatus === 'PENDING' || inc.syncStatus === 'FAILED'
      );
      
      if (pendingQueue.length === 0) {
        syncManager.isProcessing = false;
        return;
      }

      // Mark all as syncing
      for (const incident of pendingQueue) {
        await storageService.updateSyncStatus(incident.localId, 'SYNCING');
      }

      let remaining = pendingQueue.length;
      if (onProgress) onProgress(remaining);

      // Process one by one
      for (const incident of pendingQueue) {
        try {
          await mockApiUpload(incident);
          // Success
          await storageService.updateSyncStatus(incident.localId, 'SYNCED');
        } catch (error) {
          // Failure / Conflict
          const newRetryCount = incident.retryCount + 1;
          const newStatus = newRetryCount >= 3 ? 'FAILED' : 'PENDING';
          await storageService.updateSyncStatusAndRetry(incident.localId, newStatus, newRetryCount);
        }
        
        remaining--;
        if (onProgress) onProgress(remaining);
      }
      
    } finally {
      syncManager.isProcessing = false;
    }
  }
};
