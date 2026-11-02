import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Card } from '../components/ui';
import { BellRing } from 'lucide-react-native';

const MOCK_ALERTS = [
  { id: '1', title: 'System Maintenance', desc: 'NER-SHIELD routing engines will be down for 5 mins tonight.', date: 'Today, 09:00 AM' },
  { id: '2', title: 'New Safety Protocol', desc: 'All drivers must submit photos at checkpoints starting Monday.', date: 'Yesterday, 14:30 PM' }
];

export const AlertsScreen = () => {
  const renderItem = ({ item }: any) => (
    <Card style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <BellRing color="#f59e0b" size={20} />
        <Text style={styles.alertDate}>{item.date}</Text>
      </View>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDesc}>{item.desc}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>
      </View>
      <FlatList
        data={MOCK_ALERTS}
        keyExtractor={i => i.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { padding: 20, paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: '700', color: '#0f172a' },
  list: { padding: 20, paddingTop: 10, gap: 16 },
  alertCard: { padding: 20 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  alertDate: { fontSize: 12, color: '#94a3b8', fontWeight: '500' },
  alertTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 8 },
  alertDesc: { fontSize: 14, color: '#475569', lineHeight: 20 }
});
