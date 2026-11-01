import type { AppError, Result } from '@model/common';
import type { AssessmentAnswers, AssessmentResult } from './Assessment';

/**
 * Boundary for the assessment request. The mock receives a local photo URI
 * but does not upload or inspect its contents; it is not a diagnosis.
 */
export interface SkinAssessmentService {
  assess(
    answers: AssessmentAnswers,
    photoUri?: string,
  ): Promise<Result<AssessmentResult, AppError>>;
}
