import type { ReactElement } from 'react';
import { Pressable, Text, StyleSheet, type GestureResponderEvent } from 'react-native';

export interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export function Button({ label, onPress, disabled = false }: ButtonProps): ReactElement {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    minWidth: 200,
    alignItems: 'center',
    marginVertical: 6
  },
  pressed: {
    opacity: 0.9
  },
  disabled: {
    opacity: 0.5
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
