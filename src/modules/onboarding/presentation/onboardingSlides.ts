import type { IllustrationName } from '@design-system/primitives';

export type OnboardingSlideId = 'booking' | 'queue' | 'records' | 'assessment';

export type OnboardingSlide = {
  readonly id: OnboardingSlideId;
  readonly illustration: IllustrationName;
};

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  { id: 'booking', illustration: 'booking' },
  { id: 'queue', illustration: 'queue' },
  { id: 'records', illustration: 'records' },
  { id: 'assessment', illustration: 'assessment' },
];
