import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '../components/ui';
import { Info, AlertTriangle } from 'lucide-react-native';

export const RouteUpdatesScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Route Updates</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={[styles.updateCard, styles.criticalBorder]}>
          <View style={styles.updateHeader}>
            <AlertTriangle color="#ef4444" size={20} />
            <Text style={styles.updateTime}>10 Mins Ago</Text>
          </View>
          <Text style={styles.updateTitle}>Reroute Required</Text>
          <Text style={styles.updateDesc}>Accident ahead on NH-27. We have recalculated a safer route via State Highway 3.</Text>
        </Card>
        
        <Card style={[styles.updateCard, styles.infoBorder]}>
          <View style={styles.updateHeader}>
            <Info color="#3b82f6" size={20} />
            <Text style={styles.updateTime}>2 Hours Ago</Text>
          </View>
          <Text style={styles.updateTitle}>Weather Advisory</Text>
          <Text style={styles.updateDesc}>Heavy rainfall expected in destination zone. Reduce speed by 20%.</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { padding: 20, paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
  content: { padding: 20, gap: 16 },
  updateCard: { padding: 20, borderLeftWidth: 4 },
  criticalBorder: { borderLeftColor: '#ef4444' },
  infoBorder: { borderLeftColor: '#3b82f6' },
  updateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  updateTime: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  updateTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  updateDesc: { fontSize: 14, color: '#475569', lineHeight: 20 }
});
