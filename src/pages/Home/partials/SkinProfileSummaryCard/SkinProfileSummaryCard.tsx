import { StyleSheet, View } from 'react-native';
import { Chip } from '@components/data-display';
import { Skeleton, SkeletonGroup } from '@components/feedback';
import { Button, Typography } from '@components/primitives';
import { SectionCard } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { useSkinProfileSummary } from './hooks/useSkinProfileSummary';
import type { SkinProfileSummaryCardProps } from './SkinProfileSummaryCard.types';

export function SkinProfileSummaryCard({
  useCases,
  onOpen,
}: SkinProfileSummaryCardProps) {
  const theme = useTheme();
  const summary = useSkinProfileSummary(useCases);

  return (
    <SectionCard
      title={translate('home.skinCard.title')}
      subtitle={translate('home.skinCard.subtitle')}
      testID="home-skin-card"
    >
      {summary.status === 'loading' ? (
        <SkeletonGroup
          label={translate('home.skinCard.loading')}
          gap={theme.spacing[2]}
          testID="home-skin-loading"
        >
          <Skeleton width="30%" height={12} />
          <Skeleton width="55%" height={18} />
          <Skeleton width="30%" height={12} />
          <Skeleton height={32} radius={theme.radius.pill} />
        </SkeletonGroup>
      ) : null}

      {summary.status === 'failed' ? (
        <>
          <Typography tone="error" accessibilityRole="alert">
            {translate('home.skinCard.loadFailed')}
          </Typography>
          <Button
            label={translate('home.skinCard.manageAction')}
            variant="secondary"
            onPress={onOpen}
            fullWidth
            testID="home-skin-open"
          />
        </>
      ) : null}

      {summary.status === 'ready' && summary.profile === null ? (
        <>
          <Typography tone="secondary" testID="home-skin-empty">
            {translate('home.skinCard.empty')}
          </Typography>
          <Button
            label={translate('home.skinCard.createAction')}
            onPress={onOpen}
            fullWidth
            testID="home-skin-open"
          />
        </>
      ) : null}

      {summary.status === 'ready' && summary.profile !== null ? (
        <>
          <View style={{ gap: theme.spacing[1] }}>
            <Typography variant="caption" tone="secondary">
              {translate('home.skinCard.skinTypeLabel')}
            </Typography>
            <Typography variant="bodyStrong" testID="home-skin-type">
              {translate(
                `skinProfile.skinType.options.${summary.profile.skinType}.label`,
              )}
            </Typography>
          </View>
          <View style={{ gap: theme.spacing[2] }}>
            <Typography variant="caption" tone="secondary">
              {translate('home.skinCard.concernsLabel')}
            </Typography>
            {summary.profile.concerns.length === 0 ? (
              <Typography tone="secondary">
                {translate('home.skinCard.noConcerns')}
              </Typography>
            ) : (
              <View style={[styles.chips, { gap: theme.spacing[2] }]}>
                {summary.profile.concerns.map(concern => (
                  <Chip
                    key={concern}
                    label={translate(`skinProfile.concerns.options.${concern}`)}
                  />
                ))}
              </View>
            )}
          </View>
          <Button
            label={translate('home.skinCard.manageAction')}
            variant="secondary"
            onPress={onOpen}
            fullWidth
            testID="home-skin-open"
          />
        </>
      ) : null}
    </SectionCard>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
});
