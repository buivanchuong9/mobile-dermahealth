import type { VisitRecord } from '../../../domain/entities/RecordEntry';
import type { RecordRepository } from '../../../domain/repositories/RecordRepository';

export type RecordDetailScreenProps = {
  readonly repository: RecordRepository;
  readonly recordId: string;
  readonly onBack: () => void;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
  readonly onBookVisit: () => void;
};
