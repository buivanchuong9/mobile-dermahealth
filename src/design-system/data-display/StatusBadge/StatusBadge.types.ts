import type { IconName } from '../../primitives';

export type StatusTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export type StatusBadgeProps = {
  readonly label: string;
  readonly tone?: StatusTone;
  /** Pair color with an icon so status is not conveyed by color alone. */
  readonly icon?: IconName;
  readonly testID?: string;
};
