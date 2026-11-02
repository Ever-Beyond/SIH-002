import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card, Button } from '../components/ui';
import { Truck, MapPin, Clock, AlertTriangle } from 'lucide-react-native';
import type { Trip } from '../shared-types/types';

const MOCK_TRIP: Partial<Trip> = {
  id: 'TRP-1092',
  status: 'IN_TRANSIT',
  origin: { lat: 26.14, lng: 91.73, address: 'Guwahati Logistics Hub' },
  destination: { lat: 26.75, lng: 94.21, address: 'Jorhat Distribution Center' },
  estimatedArrivalTime: new Date(Date.now() + 10800000).toISOString()
};

export const CurrentTripScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning, Driver</Text>
          <Text style={styles.date}>Vehicle: AS-01-HC-4567</Text>
        </View>

        <Card style={styles.activeTripCard}>
          <View style={styles.tripHeader}>
            <View style={styles.tripBadge}>
              <Text style={styles.tripBadgeText}>ACTIVE TRIP</Text>
            </View>
            <Text style={styles.tripId}>{MOCK_TRIP.id}</Text>
          </View>

          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={styles.dotOrigin} />
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>From</Text>
                <Text style={styles.routeAddress}>{MOCK_TRIP.origin?.address}</Text>
              </View>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={styles.dotDestination} />
              <View style={styles.routeDetails}>
                <Text style={styles.routeLabel}>To</Text>
                <Text style={styles.routeAddress}>{MOCK_TRIP.destination?.address}</Text>
              </View>
            </View>
          </View>

          <View style={styles.metricsContainer}>
            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                <Clock color="#64748b" size={16} />
                <Text style={styles.metricText}>ETA: {new Date(MOCK_TRIP.estimatedArrivalTime!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              </View>
              <View style={styles.metric}>
                <MapPin color="#64748b" size={16} />
                <Text style={styles.metricText}>142 km remaining</Text>
              </View>
            </View>
            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                <Truck color="#64748b" size={16} />
                <Text style={styles.metricText}>3.7 Tons (Medical)</Text>
              </View>
              <View style={styles.metric}>
                <AlertTriangle color="#ef4444" size={16} />
                <Text style={[styles.metricText, { color: '#ef4444', fontWeight: '600' }]}>Level 2 Risk</Text>
              </View>
            </View>
          </View>

          <Button 
            title="Open Navigation" 
            onPress={() => navigation.navigate('Navigation')} 
            style={{ marginTop: 24 }}
          />
        </Card>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <Card style={styles.actionCard}>
            <Button 
              title="Report Issue" 
              variant="secondary"
              onPress={() => navigation.navigate('Report')}
              style={{ borderColor: '#ef4444' }}
            />
          </Card>
          <Card style={styles.actionCard}>
            <Button 
              title="Trip Details" 
              variant="secondary"
              onPress={() => navigation.navigate('Details')}
            />
          </Card>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
  date: { fontSize: 14, color: '#64748b', marginTop: 4 },
  activeTripCard: { padding: 20, marginBottom: 24 },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  tripBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  tripBadgeText: { color: '#15803d', fontSize: 10, fontWeight: '700' },
  tripId: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  routeContainer: { marginLeft: 8 },
  routePoint: { flexDirection: 'row', alignItems: 'center' },
  dotOrigin: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#3b82f6', marginRight: 16 },
  dotDestination: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ef4444', marginRight: 16 },
  routeLine: { width: 2, height: 30, backgroundColor: '#e2e8f0', marginLeft: 5, marginVertical: 4 },
  routeDetails: { flex: 1 },
  routeLabel: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  routeAddress: { fontSize: 15, color: '#0f172a', fontWeight: '600', marginTop: 2 },
  metricsContainer: { marginTop: 24, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9', gap: 12 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metric: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metricText: { fontSize: 13, color: '#475569', fontWeight: '500' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#0f172a', marginBottom: 16 },
  quickActionsGrid: { flexDirection: 'row', gap: 16 },
  actionCard: { flex: 1, padding: 12 }
});
