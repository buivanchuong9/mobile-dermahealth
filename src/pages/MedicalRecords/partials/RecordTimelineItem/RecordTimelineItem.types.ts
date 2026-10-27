import type { RecordEntry } from '../../../../model/medicalRecords/RecordEntry';

export type RecordTimelineItemProps = {
  readonly entry: RecordEntry;
  readonly isLast: boolean;
  readonly onPress: (id: string) => void;
};
