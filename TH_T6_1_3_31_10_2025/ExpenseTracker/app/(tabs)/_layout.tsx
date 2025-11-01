import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // (Tùy chọn)

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="index"
        options={{
          // Câu 1c: Tiêu đề
          title: 'EXPENSE TRACKER',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics', // (Câu 12)
          tabBarIcon: ({ color }) => <Ionicons size={28} name="pie-chart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          title: 'Trash', // (Câu 5)
          tabBarIcon: ({ color }) => <Ionicons size={28} name="trash" color={color} />,
        }}
      />
    </Tabs>
  );
}