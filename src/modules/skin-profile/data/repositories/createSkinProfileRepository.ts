import { createAppError, err, ok } from '@core/contracts';
import type { KeyValueStorage, Logger } from '@core/contracts';
import type { SkinProfileRepository } from '../../domain/repositories/SkinProfileRepository';
import {
  parseStoredSkinProfile,
  serializeSkinProfile,
  SKIN_PROFILE_STORAGE_KEY,
} from '../mappers/skinProfileStorageMapper';

export type SkinProfileRepositoryDependencies = {
  readonly storage: KeyValueStorage;
  readonly logger?: Logger;
};

/**
 * Stores the profile as one JSON document. Unreadable or newer-version data is
 * reported and never overwritten; only an explicit `clear()` removes it.
 */
export function createSkinProfileRepository({
  storage,
  logger,
}: SkinProfileRepositoryDependencies): SkinProfileRepository {
  const unreadable = (problem: 'corrupt' | 'newer_version') => {
    logger?.warn('Stored skin profile could not be read', { problem });
    return createAppError(
      'storage',
      problem === 'newer_version'
        ? 'Stored skin profile was written by a newer app version'
        : 'Stored skin profile is corrupt',
    );
  };

  return {
    async get() {
      const read = await storage.getItem(SKIN_PROFILE_STORAGE_KEY);
      if (!read.ok) {
        logger?.error('Reading the skin profile failed', {
          code: read.error.code,
        });
        return read;
      }
      if (read.value === null) {
        return ok(null);
      }
      const parsed = parseStoredSkinProfile(read.value);
      return parsed.ok ? parsed : err(unreadable(parsed.error));
    },

    async save(profile) {
      const existing = await storage.getItem(SKIN_PROFILE_STORAGE_KEY);
      if (!existing.ok) {
        logger?.error('Reading the skin profile before saving failed', {
          code: existing.error.code,
        });
        return existing;
      }
      if (existing.value !== null) {
        const parsed = parseStoredSkinProfile(existing.value);
        if (!parsed.ok) {
          return err(unreadable(parsed.error));
        }
      }

      const written = await storage.setItem(
        SKIN_PROFILE_STORAGE_KEY,
        serializeSkinProfile(profile),
      );
      if (!written.ok) {
        logger?.error('Saving the skin profile failed', {
          code: written.error.code,
        });
      }
      return written;
    },

    async clear() {
      const removed = await storage.removeItem(SKIN_PROFILE_STORAGE_KEY);
      if (!removed.ok) {
        logger?.error('Deleting the skin profile failed', {
          code: removed.error.code,
        });
      }
      return removed;
    },
  };
}
