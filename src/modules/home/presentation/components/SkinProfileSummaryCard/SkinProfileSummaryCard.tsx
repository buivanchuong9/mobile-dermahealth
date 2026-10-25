import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Chip } from '@design-system/data-display';
import { Button, Typography } from '@design-system/primitives';
import { SectionCard } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { SkinProfileUseCases } from '@modules/skin-profile';
import { useSkinProfileSummary } from '../../hooks/useSkinProfileSummary';

export type SkinProfileSummaryCardProps = {
  readonly useCases: SkinProfileUseCases;
  readonly onOpen: () => void;
};

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
        <View
          accessibilityRole="progressbar"
          accessibilityLabel={translate('home.skinCard.loading')}
          style={styles.loading}
          testID="home-skin-loading"
        >
          <ActivityIndicator color={theme.colors.brand.primary} />
        </View>
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
  loading: { paddingVertical: 16, alignItems: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
});
