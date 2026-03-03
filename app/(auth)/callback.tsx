import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

function parseOAuthParamsFromUrl(url: string): Record<string, string> {
  const parsed = Linking.parse(url);
  const hash = parsed.path?.split('#')[1];
  const query = parsed.queryParams ?? {};
  if (!hash) return query as Record<string, string>;
  const pairs = hash.split('&');
  const out: Record<string, string> = { ...(query as Record<string, string>) };
  for (const pair of pairs) {
    const [k, v] = pair.split('=');
    if (k && v) out[decodeURIComponent(k)] = decodeURIComponent(v);
  }
  return out;
}

export function AuthCallbackScreen(): ReactElement {
  const router = useRouter();
  const { completeOAuthSignIn } = useAuth();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const url = await Linking.getInitialURL();
      const params = url ? parseOAuthParamsFromUrl(url) : {};
      if (cancelled) return;
      const ok = await completeOAuthSignIn(params);
      if (cancelled) return;
      if (ok) router.replace('/(tabs)/dashboard');
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <Text style={styles.text}>Completing sign in…</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 16
  }
});

export default AuthCallbackScreen;

