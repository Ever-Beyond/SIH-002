import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Button, Card } from '../components/ui';
import { User } from 'lucide-react-native';

export const ProfileScreen = ({ navigation }: any) => {
  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => navigation.replace('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <View style={styles.avatar}>
            <User color="#0f172a" size={40} />
          </View>
          <Text style={styles.name}>Field Ops Lead</Text>
          <Text style={styles.email}>ops.lead@ner-shield.gov.in</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>FIELD_OFFICER</Text>
          </View>
        </Card>

        <Button 
          title="Log Out" 
          variant="secondary" 
          onPress={handleLogout} 
          style={{ marginTop: 24, borderColor: '#ef4444' }}
        />
      </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  content: {
    padding: 20,
  },
  profileCard: {
    alignItems: 'center',
    padding: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  roleBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  }
});
