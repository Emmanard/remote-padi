import { MMKV } from 'react-native-mmkv';

const STORAGE_VERSION = 'v1';

const storage = new MMKV({ id: 'remote-padi-drafts' });

function versionedKey(key: string): string {
  return `${key}:${STORAGE_VERSION}`;
}

export function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    storage.set(versionedKey(key), serialized);
  } catch {
    // MMKV can throw on quota or serialization
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const raw = storage.getString(versionedKey(key));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function removeItem(key: string): void {
  try {
    storage.delete(versionedKey(key));
  } catch {
    // no-op
  }
}
