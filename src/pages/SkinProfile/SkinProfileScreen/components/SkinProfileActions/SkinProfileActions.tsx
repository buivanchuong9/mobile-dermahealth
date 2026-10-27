import { View } from 'react-native';
import { Button, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { SkinProfileActionsProps } from './SkinProfileActions.types';

/** Save/delete buttons and the outcome message of the last action. */
export function SkinProfileActions({
  notice,
  saving,
  hasSavedProfile,
  onSave,
  onRequestDelete,
}: SkinProfileActionsProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[3] }}>
      {notice === 'saved' ? (
        <Typography
          tone="secondary"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          testID="skin-profile-saved"
        >
          {translate('skinProfile.messages.saved')}
        </Typography>
      ) : null}
      {notice === 'save_failed' ? (
        <Typography
          tone="error"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          testID="skin-profile-save-failed"
        >
          {translate('skinProfile.messages.saveFailed')}
        </Typography>
      ) : null}
      {notice === 'delete_failed' ? (
        <Typography tone="error" accessibilityRole="alert">
          {translate('skinProfile.messages.deleteFailed')}
        </Typography>
      ) : null}
      <Button
        label={translate('skinProfile.actions.save')}
        onPress={onSave}
        loading={saving}
        fullWidth
        size="lg"
        testID="skin-profile-save"
      />
      {hasSavedProfile ? (
        <Button
          label={translate('skinProfile.actions.delete')}
          variant="ghost"
          onPress={onRequestDelete}
          fullWidth
          testID="skin-profile-delete"
        />
      ) : null}
    </View>
  );
}
