import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '../components/ui';
import { AlertCircle, MapPin, ShieldAlert } from 'lucide-react-native';

export const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back, Officer</Text>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
        </View>

        <View style={styles.statsGrid}>
          <Card style={[styles.statCard, { borderTopWidth: 4, borderTopColor: '#3b82f6' }]}>
            <MapPin color="#3b82f6" size={24} />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Routes</Text>
          </Card>
          
          <Card style={[styles.statCard, { borderTopWidth: 4, borderTopColor: '#ef4444' }]}>
            <AlertCircle color="#ef4444" size={24} />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Pending Incidents</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>Recent Alerts</Text>
        
        <Card style={styles.alertCard}>
          <ShieldAlert color="#ef4444" size={20} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Severe Weather Warning</Text>
            <Text style={styles.alertDesc}>Heavy rainfall expected in Kamrup district over the next 4 hours.</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  date: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  alertCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    backgroundColor: '#fef2f2',
    borderColor: '#fca5a5',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991b1b',
  },
  alertDesc: {
    fontSize: 13,
    color: '#7f1d1d',
    marginTop: 4,
    lineHeight: 18,
  }
});
