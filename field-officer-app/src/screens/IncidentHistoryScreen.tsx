import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Card } from '../components/ui';
import type { LocalIncidentRecord } from '../shared-types/types';
import { storageService } from '../features/incidents/storageService';
import { CloudOff, Cloud, CheckCircle, AlertTriangle } from 'lucide-react-native';

export const IncidentHistoryScreen = () => {
  const [incidents, setIncidents] = useState<LocalIncidentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const data = await storageService.getIncidents();
      setIncidents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchIncidents();
    }, [])
  );

  const getSyncIcon = (status: LocalIncidentRecord['syncStatus']) => {
    switch (status) {
      case 'PENDING': return <CloudOff color="#94a3b8" size={16} />;
      case 'SYNCING': return <Cloud color="#3b82f6" size={16} />;
      case 'SYNCED': return <CheckCircle color="#10b981" size={16} />;
      case 'FAILED': return <AlertTriangle color="#ef4444" size={16} />;
      default: return null;
    }
  };

  const renderItem = ({ item }: { item: LocalIncidentRecord }) => (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{item.type}</Text>
          <View style={styles.syncStatusContainer}>
            {getSyncIcon(item.syncStatus)}
            <Text style={styles.syncText}>{item.syncStatus}</Text>
          </View>
        </View>
        
        <View style={[styles.badge, item.severity === 'CRITICAL' ? styles.badgeCritical : styles.badgeNormal]}>
          <Text style={[styles.badgeText, item.severity === 'CRITICAL' ? styles.badgeTextCritical : styles.badgeTextNormal]}>
            {item.severity}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
      </View>
      
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0f172a" />
        </View>
      ) : incidents.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <Text style={{ textAlign: 'center', color: '#64748b' }}>No incidents recorded locally.</Text>
        </View>
      ) : (
        <FlatList
          data={incidents}
          keyExtractor={i => i.localId}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  list: {
    padding: 20,
    paddingTop: 0,
    gap: 16,
  },
  card: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  syncStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeNormal: {
    backgroundColor: '#fef3c7',
  },
  badgeCritical: {
    backgroundColor: '#fef2f2',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextNormal: {
    color: '#b45309',
  },
  badgeTextCritical: {
    color: '#991b1b',
  },
  description: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    color: '#94a3b8',
  }
});
