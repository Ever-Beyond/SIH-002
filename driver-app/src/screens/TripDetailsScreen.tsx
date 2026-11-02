import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '../components/ui';
import { Package, ShieldAlert, Navigation } from 'lucide-react-native';

export const TripDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Trip Details</Text>
          <Text style={styles.subtitle}>Manifest & Cargo Information</Text>
        </View>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Package color="#0f172a" size={20} />
            <Text style={styles.sectionTitle}>Cargo Manifest</Text>
          </View>
          <View style={styles.cargoItem}>
            <Text style={styles.cargoType}>Medical Supplies (Class A)</Text>
            <Text style={styles.cargoWeight}>2.5 Tons</Text>
          </View>
          <View style={styles.cargoItem}>
            <Text style={styles.cargoType}>Emergency Rations</Text>
            <Text style={styles.cargoWeight}>1.2 Tons</Text>
          </View>
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShieldAlert color="#0f172a" size={20} />
            <Text style={styles.sectionTitle}>Safety Protocols</Text>
          </View>
          <Text style={styles.infoText}>
            This trip traverses through a Level 2 Risk Corridor. Maintain a maximum speed of 40km/h and report immediately upon reaching Checkpoint Alpha.
          </Text>
        </Card>

        <Card style={styles.section}>
          <View style={styles.sectionHeader}>
            <Navigation color="#0f172a" size={20} />
            <Text style={styles.sectionTitle}>Waypoints</Text>
          </View>
          <View style={styles.waypoint}>
            <View style={[styles.waypointStatus, { backgroundColor: '#10b981' }]} />
            <Text style={styles.waypointText}>Guwahati Hub (Departed 08:00 AM)</Text>
          </View>
          <View style={styles.waypoint}>
            <View style={[styles.waypointStatus, { backgroundColor: '#f59e0b' }]} />
            <Text style={styles.waypointText}>Nagaon Checkpoint (Pending)</Text>
          </View>
          <View style={styles.waypoint}>
            <View style={[styles.waypointStatus, { backgroundColor: '#cbd5e1' }]} />
            <Text style={styles.waypointText}>Jorhat DC (Destination)</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  content: { padding: 20 },
  header: { marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b', marginTop: 4 },
  section: { padding: 20, marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#0f172a' },
  cargoItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cargoType: { fontSize: 14, color: '#334155', fontWeight: '500' },
  cargoWeight: { fontSize: 14, color: '#64748b' },
  infoText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  waypoint: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  waypointStatus: { width: 12, height: 12, borderRadius: 6 },
  waypointText: { fontSize: 14, color: '#334155' }
});
