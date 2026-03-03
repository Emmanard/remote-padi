import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import { getAuthStore } from '@/stores/authStore';

function AuthInitializer({ children }: { children: ReactNode }): ReactElement {
  useEffect(() => {
    void getAuthStore().refreshSession();
  }, []);
  return <>{children}</>;
}

export function RootLayout(): ReactElement {
  return (
    <AuthInitializer>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </AuthInitializer>
  );
}

export default RootLayout;

