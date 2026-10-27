import { err } from '@model/common';
import type { Result } from '@model/common';
import type { SkinProfile } from '../../model/skinProfile/SkinProfile';
import { restoreSkinProfile } from '../../utils/skinProfile/skinProfileRules';

export const SKIN_PROFILE_STORAGE_KEY = 'dermahealth.skin-profile';
export const SUPPORTED_SCHEMA_VERSION = 1;

export type StoredSkinProfileProblem = 'corrupt' | 'newer_version';

export function serializeSkinProfile(profile: SkinProfile): string {
  return JSON.stringify({
    schemaVersion: SUPPORTED_SCHEMA_VERSION,
    skinType: profile.skinType,
    concerns: profile.concerns,
    updatedAt: profile.updatedAt,
  });
}

/**
 * Parses stored text. The JSON parser's own error is never propagated because
 * it can quote fragments of the stored data.
 */
export function parseStoredSkinProfile(
  raw: string,
): Result<SkinProfile, StoredSkinProfileProblem> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return err('corrupt');
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    return err('corrupt');
  }

  const record = parsed as Record<string, unknown>;
  const version = record.schemaVersion;
  if (
    typeof version !== 'number' ||
    !Number.isInteger(version) ||
    version < 1
  ) {
    return err('corrupt');
  }
  if (version > SUPPORTED_SCHEMA_VERSION) {
    return err('newer_version');
  }

  const restored = restoreSkinProfile({
    skinType: record.skinType,
    concerns: record.concerns,
    updatedAt: record.updatedAt,
  });
  return restored.ok ? restored : err('corrupt');
}
