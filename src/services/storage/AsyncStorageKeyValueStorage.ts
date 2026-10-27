import { createAppError, err, ok } from '@model/common';
import type { AppError, KeyValueStorage, Result } from '@model/common';

/** The subset of the AsyncStorage client this adapter needs. */
export type AsyncStorageClient = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

/**
 * Adapts AsyncStorage to the core `KeyValueStorage` contract. AsyncStorage is
 * unencrypted: see docs/security/data-storage-policy.md for what may go in it.
 */
export function createAsyncStorageKeyValueStorage(
  client: AsyncStorageClient,
): KeyValueStorage {
  async function run<T>(
    operation: string,
    action: () => Promise<T>,
  ): Promise<Result<T, AppError>> {
    try {
      return ok(await action());
    } catch (cause) {
      // The message never includes keys or values; `cause` is the platform error.
      return err(
        createAppError('storage', `AsyncStorage ${operation} failed`, cause),
      );
    }
  }

  return {
    getItem: key => run('getItem', () => client.getItem(key)),
    setItem: (key, value) => run('setItem', () => client.setItem(key, value)),
    removeItem: key => run('removeItem', () => client.removeItem(key)),
  };
}
