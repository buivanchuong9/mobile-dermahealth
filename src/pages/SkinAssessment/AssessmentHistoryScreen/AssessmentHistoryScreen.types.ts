import type { AssessmentHistoryRepository } from '../../../model/skinAssessment/AssessmentHistoryRepository';

export type AssessmentHistoryScreenProps = {
  readonly repository: AssessmentHistoryRepository;
  readonly onBack: () => void;
  readonly onStartAssessment: () => void;
};
