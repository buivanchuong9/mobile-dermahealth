import type {
  FollowUpRecommendation,
  VisitRecord,
} from '../../../../../../../model/medicalRecords/RecordEntry';

export type FollowUpRecommendationCardProps = {
  readonly visit: VisitRecord;
  readonly followUp: FollowUpRecommendation;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
};
