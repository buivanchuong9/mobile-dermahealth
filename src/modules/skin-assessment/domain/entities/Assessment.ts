import type { LocalDateTime } from '@shared/utilities/localDateTime';

export const SKIN_AREAS = [
  'face',
  'neck',
  'back',
  'arms',
  'legs',
  'scalp',
] as const;
export type SkinArea = (typeof SKIN_AREAS)[number];

export const SYMPTOM_DURATIONS = ['days', 'weeks', 'months', 'longer'] as const;
export type SymptomDuration = (typeof SYMPTOM_DURATIONS)[number];

export const SKIN_SYMPTOMS = [
  'redness',
  'itching',
  'dryness',
  'scaling',
  'bumps',
  'oiliness',
  'dark_spots',
  'pain',
] as const;
export type SkinSymptom = (typeof SKIN_SYMPTOMS)[number];

export const SEVERITIES = ['mild', 'moderate', 'severe'] as const;
export type Severity = (typeof SEVERITIES)[number];

/** Structured, self-reported answers. No photo data is ever part of this. */
export type AssessmentAnswers = {
  readonly area: SkinArea;
  readonly duration: SymptomDuration;
  readonly symptoms: readonly SkinSymptom[];
  readonly severity: Severity;
};

/** In-progress answers; any field may still be unanswered. */
export type AssessmentDraft = {
  readonly area: SkinArea | null;
  readonly duration: SymptomDuration | null;
  readonly symptoms: readonly SkinSymptom[];
  readonly severity: Severity | null;
};

export type FindingId =
  | 'dry_skin_pattern'
  | 'acne_pattern'
  | 'irritation_pattern'
  | 'pigmentation_pattern';

/** Qualitative fit of a common pattern to the description; never a probability. */
export type FitLevel = 'low' | 'moderate' | 'high';
export type Urgency = 'routine' | 'soon' | 'prompt';

export type AssessmentFinding = {
  readonly id: FindingId;
  readonly fit: FitLevel;
};

export type AssessmentResult = {
  readonly id: string;
  readonly createdAt: LocalDateTime;
  /** Always `simulated` here: no real model produced this result. */
  readonly origin: 'simulated';
  readonly findings: readonly AssessmentFinding[];
  readonly urgency: Urgency;
  readonly suggestedSpecialtyId: 'general' | 'acne' | 'aesthetic' | 'allergy';
};
