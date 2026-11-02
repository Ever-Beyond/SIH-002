import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Card, Button } from '../components/ui';
import { Navigation2 } from 'lucide-react-native';

export const NavigationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapMock}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Live Map Visualization</Text>
          <Text style={styles.mapSubText}>(Simulated API View)</Text>
        </View>
        <Card style={styles.directionsCard}>
          <View style={styles.directionHeader}>
            <Navigation2 color="#3b82f6" size={32} />
            <View style={styles.directionInfo}>
              <Text style={styles.distance}>In 500 meters</Text>
              <Text style={styles.instruction}>Continue straight on NH-27</Text>
            </View>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e2e8f0' },
  mapMock: { flex: 1, position: 'relative' },
  mapPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#cbd5e1' },
  mapText: { fontSize: 20, fontWeight: '700', color: '#64748b' },
  mapSubText: { fontSize: 14, color: '#94a3b8', marginTop: 8 },
  directionsCard: { position: 'absolute', top: 60, left: 20, right: 20, padding: 20, backgroundColor: '#0f172a' },
  directionHeader: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  directionInfo: { flex: 1 },
  distance: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  instruction: { color: '#ffffff', fontSize: 20, fontWeight: '700', marginTop: 4 }
});
