import type { AssessmentResult } from '../../../model/skinAssessment/Assessment';
import type { AssessmentHistoryRepository } from '../../../model/skinAssessment/AssessmentHistoryRepository';
import type { SkinAssessmentService } from '../../../model/skinAssessment/SkinAssessmentService';

export type SkinAssessmentFlowScreenProps = {
  readonly service: SkinAssessmentService;
  readonly history: AssessmentHistoryRepository;
  readonly onExit: () => void;
  readonly onBookAppointment: (
    specialtyId: AssessmentResult['suggestedSpecialtyId'],
  ) => void;
  readonly onViewHistory: () => void;
};
