import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from 'react-native';

export const Button = ({ title, onPress, variant = 'primary', loading = false, disabled = false, style = {} }: any) => {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary ? styles.primaryBtn : styles.secondaryBtn,
        (disabled || loading) && styles.disabledBtn,
        style
      ]} 
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : '#0f172a'} />
      ) : (
        <Text style={[styles.buttonText, isPrimary ? styles.primaryText : styles.secondaryText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export const Input = ({ label, ...props }: any) => {
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput 
        style={styles.input} 
        placeholderTextColor="#94a3b8"
        {...props} 
      />
    </View>
  );
};

export const Card = ({ children, style }: any) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${Math.min(Math.max(progress, 0), 100)}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtn: {
    backgroundColor: '#0f172a',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#0f172a',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
    marginVertical: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  }
});
