import { MMKV } from 'react-native-mmkv';

const authStorage = new MMKV({ id: 'remote-padi-auth' });

export function getStoredSession(key: string): string | null {
  try {
    return authStorage.getString(key) ?? null;
  } catch {
    return null;
  }
}

export function setStoredSession(key: string, value: string): void {
  try {
    authStorage.set(key, value);
  } catch {
    // no-op
  }
}

export function removeStoredSession(key: string): void {
  try {
    authStorage.delete(key);
  } catch {
    // no-op
  }
}
