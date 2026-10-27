import type { AssessmentResult } from '../../../../model/skinAssessment/Assessment';

export type ResultStepProps = {
  readonly result: AssessmentResult;
  readonly onBookAppointment: (
    specialtyId: AssessmentResult['suggestedSpecialtyId'],
  ) => void;
  readonly onViewHistory: () => void;
  readonly onStartOver: () => void;
};
