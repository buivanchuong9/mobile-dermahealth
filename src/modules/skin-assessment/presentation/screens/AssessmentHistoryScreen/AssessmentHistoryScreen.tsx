import { useCallback } from 'react';
import { View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import { Banner, EmptyState, SkeletonCard } from '@design-system/feedback';
import { FadeInView } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { Card, ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { useAsyncQuery } from '@shared/hooks';
import { formatDate } from '@shared/utilities/localDateTime';
import type { AssessmentHistoryScreenProps } from './AssessmentHistoryScreen.types';
import { URGENCY_TONE } from './AssessmentHistoryScreen.constants';

export function AssessmentHistoryScreen({
  repository,
  onBack,
  onStartAssessment,
}: AssessmentHistoryScreenProps) {
  const theme = useTheme();
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
        <View style={{ gap: theme.spacing[3] }}>
          <SkeletonCard lines={2} />
          <SkeletonCard lines={2} />
        </View>
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
            <FadeInView key={item.id} delay={index * 60}>
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
