import { Tabs } from 'expo-router';
import type { ReactElement } from 'react';

export function TabsLayout(): ReactElement {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarLabelStyle: { fontSize: 12 }
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarLabel: 'Dashboard' }} />
      <Tabs.Screen name="invoices" options={{ title: 'Invoices', tabBarLabel: 'Invoices' }} />
      <Tabs.Screen name="cvs" options={{ title: 'CVs', tabBarLabel: 'CVs' }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarLabel: 'Settings' }} />
    </Tabs>
  );
}

export default TabsLayout;
