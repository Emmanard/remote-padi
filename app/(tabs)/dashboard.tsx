import type { ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';

export function DashboardScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Dashboard</Text>
        <Text>Welcome to Remote Padi.</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  }
});

export default DashboardScreen;

