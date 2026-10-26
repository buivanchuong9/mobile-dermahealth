import { Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { formatDate, formatTime } from '@shared/utilities/localDateTime';
import { getRecordTitle } from '../../../../../domain/rules/recordRules';
import { RecordSourceBadge } from '../../../../components/RecordSourceBadge';
import type { RecordSummaryCardProps } from './RecordSummaryCard.types';

/** Source badge, title, date and (for visits) doctor and clinic. */
export function RecordSummaryCard({ entry }: RecordSummaryCardProps) {
  return (
    <Card>
      <RecordSourceBadge source={entry.source} />
      <Typography variant="title" accessibilityRole="header">
        {getRecordTitle(entry)}
      </Typography>
      <Typography variant="caption" tone="secondary">
        {translate('records.detail.when')}: {formatDate(entry.date)}{' '}
        {formatTime(entry.date)}
      </Typography>
      {entry.kind === 'visit' ? (
        <Typography variant="caption" tone="secondary">
          {entry.doctorName} · {entry.clinicName}
        </Typography>
      ) : null}
    </Card>
  );
}
