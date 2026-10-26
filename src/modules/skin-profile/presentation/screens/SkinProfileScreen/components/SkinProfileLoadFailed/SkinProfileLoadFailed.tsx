import { ScrollView } from 'react-native';
import { Button, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { SkinProfileLoadFailedProps } from './SkinProfileLoadFailed.types';

/** Stored data could not be read: offer retry or explicit deletion. */
export function SkinProfileLoadFailed({
  deleteFailed,
  onRetry,
  onRequestDelete,
}: SkinProfileLoadFailedProps) {
  const theme = useTheme();
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
        onPress={onRetry}
        fullWidth
        testID="skin-profile-retry"
      />
      <Button
        label={translate('skinProfile.actions.delete')}
        variant="ghost"
        onPress={onRequestDelete}
        fullWidth
        testID="skin-profile-delete"
      />
      {deleteFailed ? (
        <Typography tone="error" accessibilityRole="alert">
          {translate('skinProfile.messages.deleteFailed')}
        </Typography>
      ) : null}
    </ScrollView>
  );
}
