import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { CycleProvider } from '../context/CycleContext';

export default function RootLayout() {
  return (
    <CycleProvider>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#A84A5A',
          tabBarInactiveTintColor: '#806D72',
          tabBarStyle: { backgroundColor: '#FFFDFC', borderTopColor: '#F0D9D5' },
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Today' }} />
        <Tabs.Screen name="history" options={{ title: 'History' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
      </Tabs>
    </CycleProvider>
  );
}
