import type {
  RecordEntry,
  VisitRecord,
} from '../../../../../domain/entities/RecordEntry';

export type RecordEntryDetailsProps = {
  readonly entry: RecordEntry;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
  readonly onBookVisit: () => void;
};
