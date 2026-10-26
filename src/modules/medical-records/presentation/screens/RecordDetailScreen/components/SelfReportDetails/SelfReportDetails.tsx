import { Banner } from '@design-system/feedback';
import { Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { DetailSection } from '../../../../components/DetailSection';
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
