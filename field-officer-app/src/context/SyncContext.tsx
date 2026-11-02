import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Network from 'expo-network';
import { syncManager } from '../features/incidents/syncManager';

interface SyncContextType {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  forceSync: () => void;
}

const SyncContext = createContext<SyncContextType>({
  isOnline: true,
  isSyncing: false,
  pendingCount: 0,
  forceSync: () => {}
});

export const useSync = () => useContext(SyncContext);

export const SyncProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    // Check initial network state
    const checkNetwork = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsOnline(!!state.isConnected && !!state.isInternetReachable);
    };
    checkNetwork();

    // Poll for network changes (since expo-network doesn't have an event listener in SDK 50+ out of the box that works universally without netinfo)
    const interval = setInterval(async () => {
      const state = await Network.getNetworkStateAsync();
      const currentlyOnline = !!state.isConnected && !!state.isInternetReachable;
      
      setIsOnline(prev => {
        if (!prev && currentlyOnline) {
          // We just came back online! Trigger sync automatically.
          triggerSync();
        }
        return currentlyOnline;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const triggerSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      await syncManager.processQueue((remaining) => {
        setPendingCount(remaining);
      });
    } finally {
      setIsSyncing(false);
      setPendingCount(0);
    }
  };

  return (
    <SyncContext.Provider value={{ isOnline, isSyncing, pendingCount, forceSync: triggerSync }}>
      {children}
    </SyncContext.Provider>
  );
};
