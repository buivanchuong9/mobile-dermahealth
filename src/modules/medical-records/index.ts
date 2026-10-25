export { createMockRecordRepository } from './data/repositories/createMockRecordRepository';
export type {
  AiAssessmentRecord,
  FollowUpRecommendation,
  RecordEntry,
  RecordFilter,
  RecordSource,
  SelfReportRecord,
  VisitRecord,
} from './domain/entities/RecordEntry';
export type { RecordRepository } from './domain/repositories/RecordRepository';
export { RecordDetailScreen } from './presentation/screens/RecordDetailScreen';
export { RecordsScreen } from './presentation/screens/RecordsScreen';
