import type { SkinConcern } from '../value-objects/SkinConcern';
import type { SkinType } from '../value-objects/SkinType';

/** What the user declared about their own skin. It is not a diagnosis. */
export type SkinProfile = {
  readonly skinType: SkinType;
  readonly concerns: readonly SkinConcern[];
  /** ISO 8601 timestamp of the last explicit save. */
  readonly updatedAt: string;
};

/** An in-progress, possibly incomplete answer set. */
export type SkinProfileDraft = {
  readonly skinType: SkinType | null;
  readonly concerns: readonly SkinConcern[];
};
