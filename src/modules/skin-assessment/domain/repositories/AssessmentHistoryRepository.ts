import type { AppError, Result } from '@core/contracts';
import type { AssessmentResult } from '../entities/Assessment';

export interface AssessmentHistoryRepository {
  list(): Promise<Result<readonly AssessmentResult[], AppError>>;
  add(result: AssessmentResult): Promise<Result<void, AppError>>;
  subscribe(listener: () => void): () => void;
}
