import type { AppError } from './AppError';
import type { Result } from './Result';

/**
 * Asynchronous string key-value storage.
 *
 * Implementations are chosen per data class. A general-purpose implementation
 * (for example AsyncStorage) is NOT encrypted and must only hold non-sensitive
 * data. Credentials, tokens and health photos belong to secure storage.
 */
export interface KeyValueStorage {
  getItem(key: string): Promise<Result<string | null, AppError>>;
  setItem(key: string, value: string): Promise<Result<void, AppError>>;
  removeItem(key: string): Promise<Result<void, AppError>>;
}
