import { View } from 'react-native';
import {
  Banner,
  EmptyState,
  SimulationBanner,
  SkeletonGroup,
  SkeletonRow,
} from '@design-system/feedback';
import { TextField } from '@design-system/inputs';
import { FadeInView, staggerDelay } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { RecordFilterChips } from '../../components/RecordFilterChips';
import { RecordTimelineItem } from '../../components/RecordTimelineItem';
import { useRecords } from '../../hooks/useRecords';
import type { RecordsScreenProps } from './RecordsScreen.types';

export function RecordsScreen({
  repository,
  onOpenRecord,
}: RecordsScreenProps) {
  const theme = useTheme();
  const { records, query, setQuery, filter, setFilter, visible } =
    useRecords(repository);

  return (
    <ScreenContainer
      bottomInset={false}
      header={
        <ScreenHeader
          title={translate('records.title')}
          subtitle={translate('records.subtitle')}
        />
      }
    >
      <SimulationBanner />
      <Banner
        tone="info"
        icon="shield-check"
        message={translate('records.legend')}
      />
      <TextField
        label={translate('records.searchLabel')}
        placeholder={translate('records.searchPlaceholder')}
        value={query}
        onChangeText={setQuery}
        leftIcon="search"
        autoCapitalize="none"
        returnKeyType="search"
        testID="records-search"
      />
      <RecordFilterChips value={filter} onChange={setFilter} />

      {records.status === 'loading' ? (
        <SkeletonGroup>
          <SkeletonRow leading="square" lines={2} trailing />
          <SkeletonRow leading="square" lines={2} trailing />
          <SkeletonRow leading="square" lines={2} trailing />
        </SkeletonGroup>
      ) : null}
      {records.status === 'error' ? (
        <EmptyState
          icon="triangle-alert"
          title={translate('common.loadFailedTitle')}
          description={translate('common.loadFailedBody')}
          actionLabel={translate('common.retry')}
          onAction={records.reload}
        />
      ) : null}
      {records.status === 'ready' && records.data.length === 0 ? (
        <EmptyState
          icon="file-text"
          title={translate('records.empty.title')}
          description={translate('records.empty.description')}
        />
      ) : null}
      {records.status === 'ready' &&
      records.data.length > 0 &&
      visible.length === 0 ? (
        <EmptyState
          icon="search"
          title={translate('records.noMatches.title')}
          description={translate('records.noMatches.description')}
          testID="records-no-matches"
        />
      ) : null}
      {visible.length > 0 ? (
        <View>
          <Typography variant="caption" tone="secondary">
            {translate('records.resultsCount', { count: visible.length })}
          </Typography>
          <View style={{ marginTop: theme.spacing[3] }}>
            {visible.map((entry, index) => (
              <FadeInView key={entry.id} delay={staggerDelay(index)}>
                <RecordTimelineItem
                  entry={entry}
                  isLast={index === visible.length - 1}
                  onPress={onOpenRecord}
                />
              </FadeInView>
            ))}
          </View>
        </View>
      ) : null}
    </ScreenContainer>
  );
}
