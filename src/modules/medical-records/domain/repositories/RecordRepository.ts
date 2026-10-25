import type { AppError, Result } from '@core/contracts';
import type { RecordEntry } from '../entities/RecordEntry';

export interface RecordRepository {
  list(): Promise<Result<readonly RecordEntry[], AppError>>;
  get(id: string): Promise<Result<RecordEntry, AppError>>;
}
