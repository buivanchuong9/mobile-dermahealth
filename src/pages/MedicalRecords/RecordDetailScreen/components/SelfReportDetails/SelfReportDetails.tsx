import { Banner } from '@components/feedback';
import { Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { translate } from '@i18n';
import { DetailSection } from '../../../partials/DetailSection';
import type { SelfReportDetailsProps } from './SelfReportDetails.types';

/** Patient-reported information, clearly not clinician-confirmed. */
export function SelfReportDetails({ entry }: SelfReportDetailsProps) {
  return (
    <>
      <Banner
        tone="neutral"
        message={translate('records.detail.selfReportNote')}
      />
      <Card>
        <Typography>{entry.summary}</Typography>
      </Card>
      <DetailSection
        title={translate('records.detail.symptoms')}
        items={entry.symptoms.map(item => ({ primary: item }))}
      />
    </>
  );
}
