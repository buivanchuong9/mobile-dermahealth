import AsyncStorage from '@react-native-async-storage/async-storage';
import type { KeyValueStorage } from '@model/common';
import { createAsyncStorageKeyValueStorage } from './AsyncStorageKeyValueStorage';

/** General-purpose, UNENCRYPTED local storage. Class A/B data only. */
export function createLocalKeyValueStorage(): KeyValueStorage {
  return createAsyncStorageKeyValueStorage(AsyncStorage);
}
