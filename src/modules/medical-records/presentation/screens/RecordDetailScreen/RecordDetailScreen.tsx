import { useCallback } from 'react';
import { View } from 'react-native';
import { Banner, EmptyState, SkeletonCard } from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { Button, Typography } from '@design-system/primitives';
import { Card, ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { useAsyncQuery } from '@shared/hooks';
import { formatDate, formatTime } from '@shared/utilities/localDateTime';
import type {
  RecordEntry,
  VisitRecord,
} from '../../../domain/entities/RecordEntry';
import type { RecordRepository } from '../../../domain/repositories/RecordRepository';
import { getRecordTitle } from '../../../domain/rules/recordRules';
import { DetailSection } from '../../components/DetailSection';
import { RecordSourceBadge } from '../../components/RecordSourceBadge';

export type RecordDetailScreenProps = {
  readonly repository: RecordRepository;
  readonly recordId: string;
  readonly onBack: () => void;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
  readonly onBookVisit: () => void;
};

function VisitDetails({
  visit,
  onBookFollowUp,
}: {
  readonly visit: VisitRecord;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
}) {
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
        <Card testID="record-follow-up">
          <Typography variant="subtitle" accessibilityRole="header">
            {translate('records.detail.followUp')}
          </Typography>
          <Typography>
            {translate('records.detail.followUpWithin', {
              days: visit.followUp.withinDays,
            })}
          </Typography>
          <Typography variant="caption" tone="secondary">
            {visit.followUp.note}
          </Typography>
          <Button
            label={translate('records.detail.bookFollowUp')}
            onPress={() => onBookFollowUp(visit)}
            fullWidth
            testID="record-book-follow-up"
          />
        </Card>
      ) : null}
    </>
  );
}

function EntryBody({
  entry,
  onBookFollowUp,
  onBookVisit,
}: {
  readonly entry: RecordEntry;
  readonly onBookFollowUp: (visit: VisitRecord) => void;
  readonly onBookVisit: () => void;
}) {
  const theme = useTheme();
  switch (entry.kind) {
    case 'visit':
      return <VisitDetails visit={entry} onBookFollowUp={onBookFollowUp} />;
    case 'self_report':
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
    case 'ai_assessment':
      return (
        <>
          <Banner tone="warning" message={translate('records.detail.aiNote')} />
          <Card>
            <Typography>{entry.summary}</Typography>
          </Card>
          <View style={{ gap: theme.spacing[2] }}>
            <Button
              label={translate('records.detail.bookVisit')}
              onPress={onBookVisit}
              fullWidth
              testID="record-book-visit"
            />
          </View>
        </>
      );
  }
}

export function RecordDetailScreen({
  repository,
  recordId,
  onBack,
  onBookFollowUp,
  onBookVisit,
}: RecordDetailScreenProps) {
  const load = useCallback(
    () => repository.get(recordId),
    [repository, recordId],
  );
  const query = useAsyncQuery(load);
  const header = (
    <ScreenHeader title={translate('records.detail.title')} onBack={onBack} />
  );

  if (query.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <SkeletonCard lines={4} />
        <SkeletonCard />
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

  const entry = query.data;
  return (
    <ScreenContainer header={header}>
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
      <EntryBody
        entry={entry}
        onBookFollowUp={onBookFollowUp}
        onBookVisit={onBookVisit}
      />
      <Typography variant="caption" tone="secondary">
        {translate('records.detail.simulatedNote')}
      </Typography>
    </ScreenContainer>
  );
}
