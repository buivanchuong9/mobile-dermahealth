import type { IconName } from '../../primitives';

export type EmptyStateProps = {
  readonly icon: IconName;
  readonly title: string;
  readonly description?: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
  readonly testID?: string;
};
