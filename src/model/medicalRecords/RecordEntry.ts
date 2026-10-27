import type { LocalDateTime } from '@utils/localDateTime';

/** Who is vouching for the information in an entry. */
export type RecordSource =
  | 'clinician_confirmed'
  | 'patient_reported'
  | 'ai_generated';

export type Diagnosis = { readonly label: string };

export type Prescription = {
  readonly name: string;
  readonly instructions: string;
};

export type TestStatus = 'normal' | 'attention' | 'pending';

export type TestResult = {
  readonly name: string;
  readonly summary: string;
  readonly status: TestStatus;
};

export type FollowUpRecommendation = {
  readonly withinDays: number;
  readonly note: string;
  readonly specialtyId: 'general' | 'acne' | 'aesthetic' | 'allergy';
  readonly doctorId: string;
};

export type VisitRecord = {
  readonly kind: 'visit';
  readonly id: string;
  readonly source: 'clinician_confirmed';
  readonly date: LocalDateTime;
  readonly doctorName: string;
  readonly clinicName: string;
  readonly reason: string;
  readonly diagnoses: readonly Diagnosis[];
  readonly prescriptions: readonly Prescription[];
  readonly careInstructions: readonly string[];
  readonly tests: readonly TestResult[];
  readonly procedures: readonly string[];
  readonly followUp?: FollowUpRecommendation;
};

export type SelfReportRecord = {
  readonly kind: 'self_report';
  readonly id: string;
  readonly source: 'patient_reported';
  readonly date: LocalDateTime;
  readonly title: string;
  readonly summary: string;
  readonly symptoms: readonly string[];
};

export type AiAssessmentRecord = {
  readonly kind: 'ai_assessment';
  readonly id: string;
  readonly source: 'ai_generated';
  readonly date: LocalDateTime;
  readonly title: string;
  readonly summary: string;
};

export type RecordEntry = VisitRecord | SelfReportRecord | AiAssessmentRecord;

export type RecordFilter = 'all' | RecordSource;
