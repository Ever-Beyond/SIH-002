import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSync } from '../context/SyncContext';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react-native';

export const SyncBanner = () => {
  const { isOnline, isSyncing, pendingCount, forceSync } = useSync();

  if (!isOnline) {
    return (
      <View style={[styles.container, styles.offline]}>
        <WifiOff color="#fff" size={16} />
        <Text style={styles.text}>Offline Mode - Reports will be saved locally</Text>
      </View>
    );
  }

  if (isSyncing) {
    return (
      <View style={[styles.container, styles.syncing]}>
        <RefreshCw color="#fff" size={16} />
        <Text style={styles.text}>Syncing {pendingCount} items to Command Center...</Text>
      </View>
    );
  }

  // Optional: show a clickable banner to manually sync if they are online but things are pending
  // (though our hook automatically triggers it)
  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  offline: {
    backgroundColor: '#64748b',
  },
  syncing: {
    backgroundColor: '#3b82f6',
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  }
});
