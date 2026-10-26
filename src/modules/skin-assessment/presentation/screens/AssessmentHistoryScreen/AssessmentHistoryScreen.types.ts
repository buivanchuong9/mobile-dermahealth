import type { AssessmentHistoryRepository } from '../../../domain/repositories/AssessmentHistoryRepository';

export type AssessmentHistoryScreenProps = {
  readonly repository: AssessmentHistoryRepository;
  readonly onBack: () => void;
  readonly onStartAssessment: () => void;
};
