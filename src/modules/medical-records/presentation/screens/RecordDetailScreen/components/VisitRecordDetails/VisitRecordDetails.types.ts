import type { VisitRecord } from '../../../../../domain/entities/RecordEntry';

export type VisitRecordDetailsProps = {
  readonly visit: VisitRecord;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
};
