import type { QueueSnapshot } from '@pages/Queue';

export type QueueStatusCardProps = {
  readonly queue: QueueSnapshot;
  readonly onPress: () => void;
};
