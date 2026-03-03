import { create } from 'zustand';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/services/supabase';

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  refreshSession: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  isLoading: true,

  setSession: (session) => {
    set({
      session,
      user: session?.user ?? null
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  refreshSession: async () => {
    get().setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    get().setSession(session);
    get().setLoading(false);
  },

  clearSession: () => {
    set({ session: null, user: null });
  }
}));

export function getAuthStore(): AuthState {
  return useAuthStore.getState();
}
