import type { RecordRepository } from '../../../domain/repositories/RecordRepository';

export type RecordsScreenProps = {
  readonly repository: RecordRepository;
  readonly onOpenRecord: (recordId: string) => void;
};
