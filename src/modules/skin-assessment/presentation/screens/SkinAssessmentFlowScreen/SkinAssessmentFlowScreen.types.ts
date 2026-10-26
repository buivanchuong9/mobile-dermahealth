import type { AssessmentResult } from '../../../domain/entities/Assessment';
import type { AssessmentHistoryRepository } from '../../../domain/repositories/AssessmentHistoryRepository';
import type { SkinAssessmentService } from '../../../domain/services/SkinAssessmentService';

export type SkinAssessmentFlowScreenProps = {
  readonly service: SkinAssessmentService;
  readonly history: AssessmentHistoryRepository;
  readonly onExit: () => void;
  readonly onBookAppointment: (
    specialtyId: AssessmentResult['suggestedSpecialtyId'],
  ) => void;
  readonly onViewHistory: () => void;
};
