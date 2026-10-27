import { AiAssessmentDetails } from '../AiAssessmentDetails';
import { SelfReportDetails } from '../SelfReportDetails';
import { VisitRecordDetails } from '../VisitRecordDetails';
import type { RecordEntryDetailsProps } from './RecordEntryDetails.types';

/** Chooses the details view that matches the entry's kind. */
export function RecordEntryDetails({
  entry,
  onBookFollowUp,
  onBookVisit,
}: RecordEntryDetailsProps) {
  switch (entry.kind) {
    case 'visit':
      return (
        <VisitRecordDetails visit={entry} onBookFollowUp={onBookFollowUp} />
      );
    case 'self_report':
      return <SelfReportDetails entry={entry} />;
    case 'ai_assessment':
      return <AiAssessmentDetails entry={entry} onBookVisit={onBookVisit} />;
  }
}
