import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Input, Button, Card } from '../components/ui';

export const LoginScreen = ({ navigation }: any) => {
  const [employeeId, setEmployeeId] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoPlaceholder} />
            <Text style={styles.title}>NER-SHIELD</Text>
            <Text style={styles.subtitle}>Driver Portal</Text>
          </View>

          <Card style={styles.card}>
            <Input 
              label="Driver ID" 
              placeholder="e.g. DRV-8492"
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="characters"
            />
            <Input 
              label="PIN" 
              placeholder="****"
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              keyboardType="numeric"
            />
            <Button 
              title="Start Shift" 
              onPress={handleLogin} 
              loading={loading}
              style={{ marginTop: 8 }}
            />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
    fontWeight: '500',
  },
  card: {
    padding: 24,
  }
});
