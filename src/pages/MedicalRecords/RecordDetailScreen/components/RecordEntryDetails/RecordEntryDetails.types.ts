import type {
  RecordEntry,
  VisitRecord,
} from '../../../../../model/medicalRecords/RecordEntry';

export type RecordEntryDetailsProps = {
  readonly entry: RecordEntry;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
  readonly onBookVisit: () => void;
};
