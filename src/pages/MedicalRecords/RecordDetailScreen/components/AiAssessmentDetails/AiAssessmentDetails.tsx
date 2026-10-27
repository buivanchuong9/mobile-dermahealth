import { Banner } from '@components/feedback';
import { Button, Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { translate } from '@i18n';
import type { AiAssessmentDetailsProps } from './AiAssessmentDetails.types';

/** A simulated reference suggestion, never a diagnosis. */
export function AiAssessmentDetails({
  entry,
  onBookVisit,
}: AiAssessmentDetailsProps) {
  return (
    <>
      <Banner tone="warning" message={translate('records.detail.aiNote')} />
      <Card>
        <Typography>{entry.summary}</Typography>
      </Card>
      <Button
        label={translate('records.detail.bookVisit')}
        onPress={onBookVisit}
        fullWidth
        testID="record-book-visit"
      />
    </>
  );
}
