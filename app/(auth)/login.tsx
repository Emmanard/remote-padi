import { Link } from 'expo-router';
import type { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export function LoginScreen(): ReactElement {
  const { signInWithGoogle, signInWithApple, signInWithGithub } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remote Padi</Text>
      <Button label="Continue with Google" onPress={signInWithGoogle} />
      <Button label="Continue with Apple" onPress={signInWithApple} />
      <Button label="Continue with GitHub" onPress={signInWithGithub} />
      <Link href="/(tabs)/dashboard">Skip authentication</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24
  },
  title: {
    fontSize: 24,
    marginBottom: 24
  }
});

export default LoginScreen;

