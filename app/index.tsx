import { Redirect } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';

export default function Index(): ReturnType<typeof Redirect> {
  const session = useAuthStore((s) => s.session);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) return null;
  if (session) return <Redirect href="/(tabs)/dashboard" />;
  return <Redirect href="/(auth)/login" />;
}
