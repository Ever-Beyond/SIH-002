import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, FileText, Clock, User } from 'lucide-react-native';
import { View, SafeAreaView } from 'react-native';

import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ReportIncidentScreen } from '../screens/ReportIncidentScreen';
import { IncidentHistoryScreen } from '../screens/IncidentHistoryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SyncBanner } from '../components/SyncBanner';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#0f172a' }}>
        <SyncBanner />
      </SafeAreaView>
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
          name="Dashboard" 
          component={DashboardScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Report" 
          component={ReportIncidentScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="History" 
          component={IncidentHistoryScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
