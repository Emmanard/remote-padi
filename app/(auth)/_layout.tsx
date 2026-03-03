import { Stack } from 'expo-router';
import type { ReactElement } from 'react';

export function AuthLayout(): ReactElement {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="callback" />
    </Stack>
  );
}

export default AuthLayout;
