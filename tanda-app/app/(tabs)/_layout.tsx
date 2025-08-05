import { Tabs } from 'expo-router';
import { AlertTriangle, Home, MapPin, ShieldCheck, Volume2 } from 'lucide-react-native';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 12,
          marginTop: -2,
        },
        tabBarActiveTintColor: '#dc2626', 
        tabBarInactiveTintColor: '#a3a3a3',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Lapor',
          tabBarIcon: ({ color }) => <AlertTriangle size={26} color={color} />,
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: '#dc2626', color: '#fff', fontWeight: 'bold', fontSize: 13, top: 3 },
        }}
      />
      <Tabs.Screen
        name="broadcast"
        options={{
          title: 'Broadcast',
          tabBarIcon: ({ color }) => <Volume2 size={26} color={color} />,
          tabBarBadge: 12,
          tabBarBadgeStyle: { backgroundColor: '#facc15', color: '#7f1d1d', fontWeight: 'bold', fontSize: 13, top: 3 },
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Bantuan',
          tabBarIcon: ({ color }) => <ShieldCheck size={26} color={color} />,
          tabBarBadge: 7,
          tabBarBadgeStyle: { backgroundColor: '#3b82f6', color: '#fff', fontWeight: 'bold', fontSize: 13, top: 3 },
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Peta',
          tabBarIcon: ({ color }) => <MapPin size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}
