export type OnboardingSlideId = 'booking' | 'queue' | 'records' | 'assessment';

export type OnboardingSlide = {
  readonly id: OnboardingSlideId;
};

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  { id: 'booking' },
  { id: 'queue' },
];
