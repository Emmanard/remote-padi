import type { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import { CvEditor } from '@/components/cv/CvEditor';

export function CvsScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <CvEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
});

export default CvsScreen;

