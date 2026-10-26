import type { IconName } from '@design-system/primitives';

export type SlideIllustrationProps = {
  readonly icon: IconName;
  readonly secondaryIcons: readonly [IconName, IconName];
};
