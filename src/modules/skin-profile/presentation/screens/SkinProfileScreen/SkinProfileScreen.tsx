import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { SkinProfileUseCases } from '../../../application/use-cases/createSkinProfileUseCases';
import { SKIN_CONCERNS } from '../../../domain/value-objects/SkinConcern';
import { SkinConcernCard } from '../../components/SkinConcernCard';
import { SkinTypeSelector } from '../../components/SkinTypeSelector';
import { useSkinProfile } from '../../hooks/useSkinProfile';

export type SkinProfileScreenProps = {
  readonly useCases: SkinProfileUseCases;
};

export function SkinProfileScreen({ useCases }: SkinProfileScreenProps) {
  const theme = useTheme();
  const profile = useSkinProfile(useCases);

  const confirmDelete = () =>
    Alert.alert(
      translate('skinProfile.messages.deleteConfirmTitle'),
      translate('skinProfile.messages.deleteConfirmMessage'),
      [
        { text: translate('common.cancel'), style: 'cancel' },
        {
          text: translate('skinProfile.actions.delete'),
          style: 'destructive',
          onPress: profile.remove,
        },
      ],
    );

  const deleteButton = (
    <Button
      label={translate('skinProfile.actions.delete')}
      variant="ghost"
      onPress={confirmDelete}
      fullWidth
      testID="skin-profile-delete"
    />
  );

  if (profile.loadStatus === 'loading') {
    return (
      <View
        accessibilityLabel={translate('skinProfile.loading')}
        accessibilityRole="progressbar"
        style={styles.centered}
        testID="skin-profile-loading"
      >
        <ActivityIndicator color={theme.colors.brand.primary} size="large" />
      </View>
    );
  }

  if (profile.loadStatus === 'failed') {
    return (
      <ScrollView
        contentContainerStyle={{
          padding: theme.spacing[5],
          gap: theme.spacing[3],
        }}
      >
        <Typography variant="title" accessibilityRole="header">
          {translate('skinProfile.messages.loadFailedTitle')}
        </Typography>
        <Typography accessibilityRole="alert">
          {translate('skinProfile.messages.loadFailedDetail')}
        </Typography>
        <Button
          label={translate('skinProfile.actions.retry')}
          onPress={profile.reload}
          fullWidth
          testID="skin-profile-retry"
        />
        {deleteButton}
        {profile.notice === 'delete_failed' ? (
          <Typography tone="error" accessibilityRole="alert">
            {translate('skinProfile.messages.deleteFailed')}
          </Typography>
        ) : null}
      </ScrollView>
    );
  }

  const skinTypeIssue = profile.issues.find(
    issue => issue.field === 'skinType',
  );

  return (
    <ScrollView
      contentContainerStyle={{
        padding: theme.spacing[5],
        gap: theme.spacing[5],
      }}
    >
      <View style={{ gap: theme.spacing[2] }}>
        <Typography variant="title" accessibilityRole="header">
          {translate('skinProfile.title')}
        </Typography>
        <View
          style={{
            padding: theme.spacing[4],
            gap: theme.spacing[2],
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.background.secondary,
          }}
        >
          <Typography variant="caption">
            {translate('skinProfile.disclaimer')}
          </Typography>
          <Typography variant="caption" tone="secondary">
            {translate('skinProfile.storageNotice')}
          </Typography>
        </View>
        {profile.savedProfile === null ? (
          <Typography tone="secondary" testID="skin-profile-empty">
            {translate('skinProfile.emptyIntro')}
          </Typography>
        ) : null}
      </View>

      <View style={{ gap: theme.spacing[2] }}>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate('skinProfile.skinType.title')}
        </Typography>
        <SkinTypeSelector
          value={profile.skinType}
          onChange={profile.selectSkinType}
          disabled={profile.saving}
          errorMessage={
            skinTypeIssue
              ? translate('skinProfile.messages.skinTypeRequired')
              : undefined
          }
        />
      </View>

      <View style={{ gap: theme.spacing[2] }}>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate('skinProfile.concerns.title')}
        </Typography>
        <Typography variant="caption" tone="secondary">
          {translate('skinProfile.concerns.optionalHint')}
        </Typography>
        <View style={[styles.concernGrid, { gap: theme.spacing[2] }]}>
          {SKIN_CONCERNS.map(concern => (
            <View key={concern} style={styles.concernItem}>
              <SkinConcernCard
                concern={concern}
                selected={profile.concerns.includes(concern)}
                onToggle={profile.toggleConcern}
                disabled={profile.saving}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={{ gap: theme.spacing[3] }}>
        {profile.notice === 'saved' ? (
          <Typography
            tone="secondary"
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            testID="skin-profile-saved"
          >
            {translate('skinProfile.messages.saved')}
          </Typography>
        ) : null}
        {profile.notice === 'save_failed' ? (
          <Typography
            tone="error"
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
            testID="skin-profile-save-failed"
          >
            {translate('skinProfile.messages.saveFailed')}
          </Typography>
        ) : null}
        {profile.notice === 'delete_failed' ? (
          <Typography tone="error" accessibilityRole="alert">
            {translate('skinProfile.messages.deleteFailed')}
          </Typography>
        ) : null}
        <Button
          label={translate('skinProfile.actions.save')}
          onPress={profile.submit}
          loading={profile.saving}
          fullWidth
          size="lg"
          testID="skin-profile-save"
        />
        {profile.savedProfile !== null ? deleteButton : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  concernGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  concernItem: { flexGrow: 1, flexBasis: '45%' },
});
