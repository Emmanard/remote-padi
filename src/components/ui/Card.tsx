import type { ReactElement, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

export interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps): ReactElement {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb'
  }
});
