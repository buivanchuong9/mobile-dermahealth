import { EmptyState } from '@components/feedback';
import { RecordDetailSkeleton } from '../partials/RecordDetailSkeleton';
import { ScreenHeader } from '@components/navigation';
import { Typography } from '@components/primitives';
import { ScreenContainer } from '@components/surfaces';
import { translate } from '@i18n';
import { RecordEntryDetails } from './components/RecordEntryDetails';
import { RecordSummaryCard } from './components/RecordSummaryCard';
import { useRecordEntry } from './hooks/useRecordEntry';
import type { RecordDetailScreenProps } from './RecordDetailScreen.types';

export function RecordDetailScreen({
  repository,
  recordId,
  onBack,
  onBookFollowUp,
  onBookVisit,
}: RecordDetailScreenProps) {
  const query = useRecordEntry(repository, recordId);
  const header = (
    <ScreenHeader title={translate('records.detail.title')} onBack={onBack} />
  );

  if (query.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <RecordDetailSkeleton />
      </ScreenContainer>
    );
  }
  if (query.status === 'error') {
    return (
      <ScreenContainer header={header}>
        <EmptyState
          icon="triangle-alert"
          title={translate('records.detail.notFound')}
          actionLabel={translate('common.back')}
          onAction={onBack}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer header={header}>
      <RecordSummaryCard entry={query.data} />
      <RecordEntryDetails
        entry={query.data}
        onBookFollowUp={onBookFollowUp}
        onBookVisit={onBookVisit}
      />
      <Typography variant="caption" tone="secondary">
        {translate('records.detail.simulatedNote')}
      </Typography>
    </ScreenContainer>
  );
}
