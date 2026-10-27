import { Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { translate } from '@i18n';
import { formatDate, formatTime } from '@utils/localDateTime';
import { getRecordTitle } from '../../../../../utils/medicalRecords/recordRules';
import { RecordSourceBadge } from '../../../partials/RecordSourceBadge';
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
