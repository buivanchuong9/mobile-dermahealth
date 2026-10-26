import { Banner } from '@design-system/feedback';
import { Button, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { translate } from '@shared/localization';
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
