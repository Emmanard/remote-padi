import type { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { InvoiceEditor } from '@/components/invoice/InvoiceEditor';

export function InvoicesScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <InvoiceEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export default InvoicesScreen;

