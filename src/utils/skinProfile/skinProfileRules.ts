import { err, ok } from '@model/common';
import type { Result } from '@model/common';
import type { SkinProfile } from '../../model/skinProfile/SkinProfile';
import {
  isSkinConcern,
  SKIN_CONCERNS,
} from '../../model/skinProfile/SkinConcern';
import type { SkinConcern } from '../../model/skinProfile/SkinConcern';
import { isSkinType } from '../../model/skinProfile/SkinType';
import type { SkinType } from '../../model/skinProfile/SkinType';

export type SkinProfileIssue =
  | { readonly field: 'skinType'; readonly reason: 'required' | 'invalid' }
  | { readonly field: 'concerns'; readonly reason: 'invalid' | 'duplicate' }
  | { readonly field: 'updatedAt'; readonly reason: 'invalid' };

export type ValidSkinProfileAnswers = {
  readonly skinType: SkinType;
  readonly concerns: readonly SkinConcern[];
};

/** Validates untrusted answers (UI state or stored data). */
export function validateSkinProfileAnswers(input: {
  readonly skinType: unknown;
  readonly concerns: unknown;
}): Result<ValidSkinProfileAnswers, readonly SkinProfileIssue[]> {
  const issues: SkinProfileIssue[] = [];

  if (input.skinType === null || input.skinType === undefined) {
    issues.push({ field: 'skinType', reason: 'required' });
  } else if (!isSkinType(input.skinType)) {
    issues.push({ field: 'skinType', reason: 'invalid' });
  }

  const concerns: SkinConcern[] = [];
  if (!Array.isArray(input.concerns)) {
    issues.push({ field: 'concerns', reason: 'invalid' });
  } else {
    const seen = new Set<unknown>();
    for (const concern of input.concerns as unknown[]) {
      if (!isSkinConcern(concern)) {
        issues.push({ field: 'concerns', reason: 'invalid' });
        break;
      }
      if (seen.has(concern)) {
        issues.push({ field: 'concerns', reason: 'duplicate' });
        break;
      }
      seen.add(concern);
      concerns.push(concern);
    }
  }

  if (issues.length > 0 || !isSkinType(input.skinType)) {
    return err(issues);
  }
  return ok({
    skinType: input.skinType,
    // Canonical order keeps stored data and comparisons stable.
    concerns: SKIN_CONCERNS.filter(concern => concerns.includes(concern)),
  });
}

/** Builds a profile from validated answers; `now` is injected by the caller. */
export function createSkinProfile(
  input: { readonly skinType: unknown; readonly concerns: unknown },
  now: Date,
): Result<SkinProfile, readonly SkinProfileIssue[]> {
  const answers = validateSkinProfileAnswers(input);
  if (!answers.ok) {
    return answers;
  }
  return ok({ ...answers.value, updatedAt: now.toISOString() });
}

/** Rebuilds a profile from stored data, keeping its original timestamp. */
export function restoreSkinProfile(input: {
  readonly skinType: unknown;
  readonly concerns: unknown;
  readonly updatedAt: unknown;
}): Result<SkinProfile, readonly SkinProfileIssue[]> {
  const answers = validateSkinProfileAnswers(input);
  const timestampValid =
    typeof input.updatedAt === 'string' &&
    !Number.isNaN(Date.parse(input.updatedAt));

  if (!answers.ok) {
    return timestampValid
      ? answers
      : err([...answers.error, { field: 'updatedAt', reason: 'invalid' }]);
  }
  if (!timestampValid || typeof input.updatedAt !== 'string') {
    return err([{ field: 'updatedAt', reason: 'invalid' }]);
  }
  return ok({ ...answers.value, updatedAt: input.updatedAt });
}
