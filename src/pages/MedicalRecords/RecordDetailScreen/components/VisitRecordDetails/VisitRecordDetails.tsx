import { translate } from '@i18n';
import { DetailSection } from '../../../partials/DetailSection';
import { FollowUpRecommendationCard } from './components/FollowUpRecommendationCard';
import type { VisitRecordDetailsProps } from './VisitRecordDetails.types';

/** Clinician-recorded content of a visit. */
export function VisitRecordDetails({
  visit,
  onBookFollowUp,
}: VisitRecordDetailsProps) {
  return (
    <>
      <DetailSection
        title={translate('records.detail.diagnoses')}
        items={visit.diagnoses.map(item => ({ primary: item.label }))}
      />
      <DetailSection
        title={translate('records.detail.prescriptions')}
        items={visit.prescriptions.map(item => ({
          primary: item.name,
          secondary: item.instructions,
        }))}
      />
      <DetailSection
        title={translate('records.detail.careInstructions')}
        items={visit.careInstructions.map(item => ({ primary: item }))}
      />
      <DetailSection
        title={translate('records.detail.tests')}
        items={visit.tests.map(item => ({
          primary: `${item.name} · ${translate(
            `records.detail.testStatus.${item.status}`,
          )}`,
          secondary: item.summary,
        }))}
      />
      <DetailSection
        title={translate('records.detail.procedures')}
        items={visit.procedures.map(item => ({ primary: item }))}
      />
      {visit.followUp ? (
        <FollowUpRecommendationCard
          visit={visit}
          followUp={visit.followUp}
          onBookFollowUp={onBookFollowUp}
        />
      ) : null}
    </>
  );
}
