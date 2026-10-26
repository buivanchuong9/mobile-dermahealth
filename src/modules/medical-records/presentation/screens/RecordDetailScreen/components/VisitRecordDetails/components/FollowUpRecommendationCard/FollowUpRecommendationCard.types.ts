import type {
  FollowUpRecommendation,
  VisitRecord,
} from '../../../../../../../domain/entities/RecordEntry';

export type FollowUpRecommendationCardProps = {
  readonly visit: VisitRecord;
  readonly followUp: FollowUpRecommendation;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
};
