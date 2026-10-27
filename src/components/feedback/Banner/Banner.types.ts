import type { IconName } from '../../primitives';
import type { StatusTone } from '../../data-display';

export type BannerProps = {
  readonly message: string;
  readonly title?: string;
  readonly tone?: StatusTone;
  readonly icon?: IconName;
  readonly onDismiss?: () => void;
  readonly testID?: string;
};
