import { Button, Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { translate } from '@i18n';
import type { FollowUpRecommendationCardProps } from './FollowUpRecommendationCard.types';

/** The clinician's follow-up recommendation with a booking shortcut. */
export function FollowUpRecommendationCard({
  visit,
  followUp,
  onBookFollowUp,
}: FollowUpRecommendationCardProps) {
  return (
    <Card testID="record-follow-up">
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('records.detail.followUp')}
      </Typography>
      <Typography>
        {translate('records.detail.followUpWithin', {
          days: followUp.withinDays,
        })}
      </Typography>
      <Typography variant="caption" tone="secondary">
        {followUp.note}
      </Typography>
      <Button
        label={translate('records.detail.bookFollowUp')}
        onPress={() => onBookFollowUp(visit)}
        fullWidth
        testID="record-book-follow-up"
      />
    </Card>
  );
}
