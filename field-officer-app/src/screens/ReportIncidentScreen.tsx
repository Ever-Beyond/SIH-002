import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Input, Button, Card } from '../components/ui';
import { Camera, MapPin } from 'lucide-react-native';
import { storageService } from '../features/incidents/storageService';
import type { IncidentType, IncidentSeverity } from '../shared-types/types';

const INCIDENT_TYPES = ['ACCIDENT', 'BREAKDOWN', 'MEDICAL', 'SECURITY', 'WEATHER', 'ROADBLOCK', 'OTHER'];
const SEVERITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export const ReportIncidentScreen = () => {
  const [type, setType] = useState('ACCIDENT');
  const [severity, setSeverity] = useState('MEDIUM');
  const [description, setDescription] = useState('');
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  
  const [uploadState, setUploadState] = useState<'IDLE' | 'UPLOADING' | 'SUCCESS'>('IDLE');
  const [progress, setProgress] = useState(0);

  const fetchLocation = async () => {
    setIsFetchingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch location');
    } finally {
      setIsFetchingLocation(false);
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required');
        return;
      }
      
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to launch camera');
    }
  };

  const isFormValid = type && severity && description && location && photoUri;

  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert('Incomplete', 'Please fill out all fields, including photo and location.');
      return;
    }
    
    setUploadState('UPLOADING');
    
    try {
      const newRecord = {
        localId: `local-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: type as IncidentType,
        severity: severity as IncidentSeverity,
        description,
        location: { lat: location!.coords.latitude, lng: location!.coords.longitude },
        photoUri: photoUri!,
        syncStatus: 'PENDING' as const,
        retryCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await storageService.saveIncident(newRecord);
      
      setUploadState('SUCCESS');
      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (err) {
      Alert.alert('Error', 'Failed to save incident locally.');
      setUploadState('IDLE');
    }
  };

  const resetForm = () => {
    setType('ACCIDENT');
    setSeverity('MEDIUM');
    setDescription('');
    setLocation(null);
    setPhotoUri(null);
    setUploadState('IDLE');
    setProgress(0);
  };

  // Simple Select simulation using Buttons
  const renderSelector = (title: string, options: string[], value: string, onSelect: (v: string) => void) => (
    <View style={styles.selectorContainer}>
      <Text style={styles.label}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorRow}>
        {options.map(opt => (
          <TouchableOpacity 
            key={opt}
            style={[styles.selectorChip, value === opt && styles.selectorChipActive]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[styles.selectorChipText, value === opt && styles.selectorChipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Report Incident</Text>
          <Text style={styles.subtitle}>Log a new event from the field</Text>
        </View>

        {uploadState === 'SUCCESS' ? (
          <Card style={styles.successCard}>
            <Text style={styles.successTitle}>Incident Submitted!</Text>
            <Text style={styles.successText}>Your report has been successfully sent to the command center.</Text>
            <Button title="Report Another" onPress={resetForm} style={{ marginTop: 16 }} />
          </Card>
        ) : (
          <Card style={styles.formCard}>
            {renderSelector('Incident Type', INCIDENT_TYPES, type, setType)}
            {renderSelector('Severity', SEVERITIES, severity, setSeverity)}
            
            <Input 
              label="Description" 
              value={description}
              onChangeText={setDescription}
              placeholder="Provide specific details..."
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: 'top' }}
              editable={uploadState === 'IDLE'}
            />

            <View style={styles.actionRow}>
              <View style={styles.actionItem}>
                <Text style={styles.label}>Evidence Photo</Text>
                {photoUri ? (
                  <View style={styles.photoPreviewContainer}>
                    <Image source={{ uri: photoUri }} style={styles.photoPreview} />
                    {uploadState === 'IDLE' && (
                      <TouchableOpacity style={styles.photoOverlay} onPress={() => setPhotoUri(null)}>
                        <Text style={styles.photoOverlayText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <Button 
                    title="Take Photo" 
                    variant="secondary" 
                    onPress={takePhoto}
                    disabled={uploadState !== 'IDLE'}
                  />
                )}
              </View>

              <View style={styles.actionItem}>
                <Text style={styles.label}>GPS Location</Text>
                {location ? (
                  <View style={styles.locationContainer}>
                    <MapPin color="#3b82f6" size={16} />
                    <Text style={styles.locationText}>
                      {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
                    </Text>
                  </View>
                ) : (
                  <Button 
                    title={isFetchingLocation ? "Acquiring..." : "Get Location"} 
                    variant="secondary" 
                    onPress={fetchLocation}
                    loading={isFetchingLocation}
                    disabled={uploadState !== 'IDLE'}
                  />
                )}
              </View>
            </View>

            {uploadState === 'UPLOADING' && (
              <View style={styles.uploadContainer}>
                <Text style={styles.uploadText}>Saving locally...</Text>
              </View>
            )}

            <Button 
              title={uploadState === 'UPLOADING' ? "Uploading..." : "Submit Report"} 
              onPress={handleSubmit} 
              disabled={!isFormValid || uploadState !== 'IDLE'}
              style={{ marginTop: 24 }}
            />
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  formCard: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 8,
  },
  selectorContainer: {
    marginBottom: 16,
  },
  selectorRow: {
    gap: 8,
    paddingBottom: 4,
  },
  selectorChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
  },
  selectorChipActive: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  selectorChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectorChipTextActive: {
    color: '#ffffff',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  actionItem: {
    flex: 1,
  },
  photoPreviewContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e2e8f0',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  photoOverlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    height: '100%',
  },
  locationText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e40af',
  },
  uploadContainer: {
    marginTop: 24,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
    textAlign: 'center',
  },
  successCard: {
    padding: 32,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#15803d',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  }
});
