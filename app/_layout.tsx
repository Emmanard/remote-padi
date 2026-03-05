import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/services/supabase';

function AuthInitializer({ children }: { children: ReactNode }): ReactElement {
  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async (): Promise<void> => {
      try {
        setLoading(true);
        const {
          data: { session }
        } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(session);
        }
      } catch {
        if (isMounted) {
          setSession(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void bootstrapSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }
      setSession(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [setLoading, setSession]);

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

