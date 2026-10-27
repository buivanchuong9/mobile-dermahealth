import type { AppError, Result } from '@model/common';
import type { AssessmentAnswers, AssessmentResult } from './Assessment';

/**
 * Boundary for producing a reference suggestion from structured answers.
 * The only implementation today is a rule-based simulation; it receives no
 * image data and must never present its output as a diagnosis.
 */
export interface SkinAssessmentService {
  assess(
    answers: AssessmentAnswers,
  ): Promise<Result<AssessmentResult, AppError>>;
}
