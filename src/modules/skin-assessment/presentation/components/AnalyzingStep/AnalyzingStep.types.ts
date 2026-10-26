import type { AnalysisStatus } from '../../hooks/useAssessmentFlow';

export type AnalyzingStepProps = {
  readonly status: AnalysisStatus;
  readonly onRetry: () => void;
};
