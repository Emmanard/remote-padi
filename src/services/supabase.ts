import { createClient } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import {
  getStoredSession,
  setStoredSession,
  removeStoredSession
} from '@/services/auth-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: getStoredSession,
      setItem: setStoredSession,
      removeItem: removeStoredSession
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

export function getRedirectUrl(): string {
  return Linking.createURL('/(auth)/callback');
}
