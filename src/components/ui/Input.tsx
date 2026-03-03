import type { ReactElement } from 'react';
import { View, TextInput, Text, StyleSheet, type TextInputProps } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export function Input({
  label,
  error,
  onChange,
  onChangeText,
  ...rest
}: InputProps): ReactElement {
  const handleChangeText = (value: string): void => {
    onChange?.(value);
    onChangeText?.(value);
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        onChangeText={handleChangeText}
        placeholderTextColor="#9ca3af"
        {...rest}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#374151'
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#111827'
  },
  inputError: {
    borderColor: '#dc2626'
  },
  error: {
    fontSize: 12,
    color: '#dc2626',
    marginTop: 4
  }
});
