import type { QueueSnapshot } from '@modules/queue';

export type QueueStatusCardProps = {
  readonly queue: QueueSnapshot;
  readonly onPress: () => void;
};
