import { useCallback } from 'react';
import { StatusBadge } from '@components/data-display';
import {
  Banner,
  EmptyState,
  SkeletonGroup,
  SkeletonRow,
} from '@components/feedback';
import { FadeInView, staggerDelay } from '@components/motion';
import { ScreenHeader } from '@components/navigation';
import { Typography } from '@components/primitives';
import { Card, ScreenContainer } from '@components/surfaces';
import { translate } from '@i18n';
import { useAsyncQuery } from '@hooks';
import { formatDate } from '@utils/localDateTime';
import type { AssessmentHistoryScreenProps } from './AssessmentHistoryScreen.types';
import { URGENCY_TONE } from './AssessmentHistoryScreen.constants';

export function AssessmentHistoryScreen({
  repository,
  onBack,
  onStartAssessment,
}: AssessmentHistoryScreenProps) {
  const load = useCallback(() => repository.list(), [repository]);
  const query = useAsyncQuery(load, repository.subscribe);

  return (
    <ScreenContainer
      header={
        <ScreenHeader
          title={translate('assessment.historyScreen.title')}
          onBack={onBack}
        />
      }
    >
      <Banner
        tone="info"
        message={translate('assessment.historyScreen.note')}
      />
      {query.status === 'loading' ? (
        <SkeletonGroup>
          <SkeletonRow leading="square" lines={2} trailing />
          <SkeletonRow leading="square" lines={2} trailing />
          <SkeletonRow leading="square" lines={2} trailing />
        </SkeletonGroup>
      ) : null}
      {query.status === 'error' ? (
        <EmptyState
          icon="triangle-alert"
          title={translate('common.loadFailedTitle')}
          description={translate('common.loadFailedBody')}
          actionLabel={translate('common.retry')}
          onAction={query.reload}
        />
      ) : null}
      {query.status === 'ready' && query.data.length === 0 ? (
        <EmptyState
          icon="scan-face"
          title={translate('assessment.historyScreen.empty.title')}
          description={translate('assessment.historyScreen.empty.description')}
          actionLabel={translate('assessment.historyScreen.empty.action')}
          onAction={onStartAssessment}
          testID="assessment-history-empty"
        />
      ) : null}
      {query.status === 'ready'
        ? query.data.map((item, index) => (
            <FadeInView key={item.id} delay={staggerDelay(index)}>
              <Card testID={`assessment-${item.id}`}>
                <Typography variant="bodyStrong">
                  {translate('assessment.historyScreen.item', {
                    date: formatDate(item.createdAt),
                  })}
                </Typography>
                {item.findings.map(finding => (
                  <Typography key={finding.id} variant="caption">
                    {translate(
                      `assessment.result.findings.${finding.id}.title`,
                    )}{' '}
                    · {translate(`assessment.result.fit.${finding.fit}`)}
                  </Typography>
                ))}
                <StatusBadge
                  label={translate(
                    `assessment.result.urgency.${item.urgency}.title`,
                  )}
                  tone={URGENCY_TONE[item.urgency]}
                  icon="stethoscope"
                />
                <StatusBadge
                  label={translate('common.simulated')}
                  tone="neutral"
                />
              </Card>
            </FadeInView>
          ))
        : null}
    </ScreenContainer>
  );
}
