import type { IconName } from '@design-system/primitives';

export type OnboardingSlideId = 'booking' | 'queue' | 'records' | 'assessment';

export type OnboardingSlide = {
  readonly id: OnboardingSlideId;
  readonly icon: IconName;
  readonly secondaryIcons: readonly [IconName, IconName];
};

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  {
    id: 'booking',
    icon: 'calendar-clock',
    secondaryIcons: ['stethoscope', 'check'],
  },
  { id: 'queue', icon: 'ticket', secondaryIcons: ['alarm-clock', 'door-open'] },
  {
    id: 'records',
    icon: 'file-text',
    secondaryIcons: ['pill', 'shield-check'],
  },
  {
    id: 'assessment',
    icon: 'scan-face',
    secondaryIcons: ['camera', 'lightbulb'],
  },
];
