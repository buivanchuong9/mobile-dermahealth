import type { AppError, Result } from '@model/common';
import type { AssessmentResult } from './Assessment';

export interface AssessmentHistoryRepository {
  list(): Promise<Result<readonly AssessmentResult[], AppError>>;
  add(result: AssessmentResult): Promise<Result<void, AppError>>;
  subscribe(listener: () => void): () => void;
}
