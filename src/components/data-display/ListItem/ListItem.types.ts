import type { ReactNode } from 'react';
import type { IconName } from '../../primitives';

export type ListItemProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly icon?: IconName;
  /** Replaces the icon (for example an Avatar). */
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly onPress?: () => void;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
};
