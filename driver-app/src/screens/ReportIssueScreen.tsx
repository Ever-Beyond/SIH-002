import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Input, Button, Card } from '../components/ui';

export const ReportIssueScreen = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!description) {
      Alert.alert('Error', 'Please provide a description.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Submitted', 'Command center has been notified of the delay/issue.');
      setDescription('');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Report Issue</Text>
          <Text style={styles.subtitle}>Log mechanical failure, roadblock, or emergency</Text>
        </View>

        <Card style={styles.formCard}>
          <Input 
            label="Current Location" 
            value="GPS Coordinates: 26.14° N, 91.73° E"
            editable={false}
          />
          
          <Input 
            label="Issue Details" 
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the problem..."
            multiline
            numberOfLines={5}
            style={{ height: 120, textAlignVertical: 'top' }}
          />

          <Button 
            title="Send Alert to Dispatch" 
            onPress={handleSubmit} 
            loading={loading}
            style={{ marginTop: 16, backgroundColor: '#ef4444' }}
          />
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
  formCard: { padding: 20 }
});
