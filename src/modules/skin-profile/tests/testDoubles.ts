import { createAppError, err, ok } from '@core/contracts';
import type { KeyValueStorage, Result, AppError } from '@core/contracts';
import type { SkinProfileUseCases } from '../application/use-cases/createSkinProfileUseCases';
import type { SkinProfileRepository } from '../domain/repositories/SkinProfileRepository';

export type InMemoryStorage = KeyValueStorage & {
  readonly data: Map<string, string>;
  failNext(operation: 'getItem' | 'setItem' | 'removeItem'): void;
};

export function createInMemoryStorage(
  initial: Record<string, string> = {},
): InMemoryStorage {
  const data = new Map(Object.entries(initial));
  const failing = new Set<string>();
  const fail = (operation: string): Result<never, AppError> | null =>
    failing.delete(operation)
      ? err(createAppError('storage', `${operation} failed`))
      : null;

  return {
    data,
    failNext: operation => failing.add(operation),
    async getItem(key) {
      return fail('getItem') ?? ok(data.get(key) ?? null);
    },
    async setItem(key, value) {
      const failure = fail('setItem');
      if (failure) {
        return failure;
      }
      data.set(key, value);
      return ok(undefined);
    },
    async removeItem(key) {
      const failure = fail('removeItem');
      if (failure) {
        return failure;
      }
      data.delete(key);
      return ok(undefined);
    },
  };
}

export function createFakeRepository(
  overrides: Partial<SkinProfileRepository> = {},
): SkinProfileRepository {
  return {
    get: async () => ok(null),
    save: async () => ok(undefined),
    clear: async () => ok(undefined),
    ...overrides,
  };
}

export function createFakeUseCases(
  overrides: Partial<SkinProfileUseCases> = {},
): SkinProfileUseCases {
  return {
    load: async () => ok(null),
    save: async draft =>
      ok({
        skinType: draft.skinType ?? 'normal',
        concerns: draft.concerns,
        updatedAt: '2026-01-01T00:00:00.000Z',
      }),
    remove: async () => ok(undefined),
    ...overrides,
  };
}
