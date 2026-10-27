import type { AppError, Result } from '@model/common';
import type { RecordEntry } from './RecordEntry';

export interface RecordRepository {
  list(): Promise<Result<readonly RecordEntry[], AppError>>;
  get(id: string): Promise<Result<RecordEntry, AppError>>;
}
