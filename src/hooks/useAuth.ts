import { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { supabase, getRedirectUrl } from '@/services/supabase';
import { useAuthStore } from '@/stores/authStore';

type OAuthProvider = 'google' | 'apple' | 'github';

async function openOAuth(provider: OAuthProvider): Promise<void> {
  const redirectUrl = getRedirectUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: redirectUrl }
  });

  if (error) return;
  const url = data?.url;
  if (!url) return;

  const result = await WebBrowser.openAuthSessionAsync(url, redirectUrl);
  if (result.type === 'success' && result.url) {
    const parsed = Linking.parse(result.url);
    const params = parsed.queryParams ?? {};
    if (typeof params.access_token === 'string' && typeof params.refresh_token === 'string') {
      await supabase.auth.setSession({
        access_token: params.access_token,
        refresh_token: params.refresh_token
      });
    }
  }
}

export function useAuth(): {
  signInWithGoogle: () => void;
  signInWithApple: () => void;
  signInWithGithub: () => void;
  signOut: () => void;
  completeOAuthSignIn: (params: Record<string, unknown>) => Promise<boolean>;
} {
  const router = useRouter();
  const { setSession, clearSession } = useAuthStore();

  const signInWithGoogle = useCallback(() => {
    void openOAuth('google');
  }, []);

  const signInWithApple = useCallback(() => {
    void openOAuth('apple');
  }, []);

  const signInWithGithub = useCallback(() => {
    void openOAuth('github');
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    clearSession();
    router.replace('/(auth)/login');
  }, [clearSession, router]);

  const completeOAuthSignIn = useCallback(
    async (params: Record<string, unknown>): Promise<boolean> => {
      const accessToken = params.access_token ?? params['#access_token'];
      const refreshToken = params.refresh_token ?? params['#refresh_token'];
      if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
          return true;
        }
        return false;
      }
      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
      if (!error) {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        return true;
      }
      return false;
    },
    [setSession]
  );

  return {
    signInWithGoogle,
    signInWithApple,
    signInWithGithub,
    signOut,
    completeOAuthSignIn
  };
}
