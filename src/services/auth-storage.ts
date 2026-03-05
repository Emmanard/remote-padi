import { MMKV } from 'react-native-mmkv';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

const SECURE_STORE_KEY = 'remote-padi-auth-mmkv-key';
const MMKV_ID = 'remote-padi-auth';
const ENCRYPTION_KEY_LENGTH = 32;

let authStorage: MMKV | null = null;
let initPromise: Promise<void> | null = null;

function generateRandomKey(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomBytes = Crypto.getRandomBytes(length);
  let result = '';
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(randomBytes[i] % chars.length);
  }
  return result;
}

async function initializeAuthStorage(): Promise<void> {
  if (authStorage) {
    return;
  }

  if (!initPromise) {
    initPromise = (async () => {
      try {
        let encryptionKey: string | null = null;

        try {
          encryptionKey = await SecureStore.getItemAsync(SECURE_STORE_KEY);
        } catch {
          encryptionKey = null;
        }

        if (!encryptionKey) {
          const newKey = generateRandomKey(ENCRYPTION_KEY_LENGTH);
          try {
            await SecureStore.setItemAsync(SECURE_STORE_KEY, newKey);
          } catch {
            // If storing the key fails, we still use it for this session
          }
          encryptionKey = newKey;
        }

        authStorage = new MMKV({
          id: MMKV_ID,
          encryptionKey
        });
      } catch {
        authStorage = null;
      }
    })();
  }

  try {
    await initPromise;
  } catch {
    // Ignore initialization errors
  }
}

export async function getAuthStorage(): Promise<MMKV | null> {
  await initializeAuthStorage();
  return authStorage;
}

export async function getStoredSession(key: string): Promise<string | null> {
  try {
    const storage = await getAuthStorage();
    if (!storage) {
      return null;
    }
    return storage.getString(key) ?? null;
  } catch {
    return null;
  }
}

export async function setStoredSession(key: string, value: string): Promise<void> {
  try {
    const storage = await getAuthStorage();
    if (!storage) {
      return;
    }
    storage.set(key, value);
  } catch {
    // no-op
  }
}

export async function removeStoredSession(key: string): Promise<void> {
  try {
    const storage = await getAuthStorage();
    if (!storage) {
      return;
    }
    storage.delete(key);
  } catch {
    // no-op
  }
}
