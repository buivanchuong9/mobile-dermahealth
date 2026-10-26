import type { RecordEntry } from '../../../domain/entities/RecordEntry';

export type RecordTimelineItemProps = {
  readonly entry: RecordEntry;
  readonly isLast: boolean;
  readonly onPress: (id: string) => void;
};
