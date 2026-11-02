import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation as NavIcon, Bell, FileWarning, ClipboardList } from 'lucide-react-native';

import { LoginScreen } from '../screens/LoginScreen';
import { CurrentTripScreen } from '../screens/CurrentTripScreen';
import { TripDetailsScreen } from '../screens/TripDetailsScreen';
import { NavigationScreen } from '../screens/NavigationScreen';
import { RouteUpdatesScreen } from '../screens/RouteUpdatesScreen';
import { ReportIssueScreen } from '../screens/ReportIssueScreen';
import { AlertsScreen } from '../screens/AlertsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0f172a',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          elevation: 0,
        }
      }}
    >
      <Tab.Screen 
        name="Trip" 
        component={CurrentTripScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <ClipboardList color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Alerts" 
        component={AlertsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Updates" 
        component={RouteUpdatesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <NavIcon color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Report" 
        component={ReportIssueScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <FileWarning color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Details" component={TripDetailsScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="Navigation" component={NavigationScreen} options={{ presentation: 'fullScreenModal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
