import { View } from 'react-native';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { SkinProfileIntroProps } from './SkinProfileIntro.types';

/** Title, "self-reported, not a diagnosis" notice and empty-state hint. */
export function SkinProfileIntro({ hasSavedProfile }: SkinProfileIntroProps) {
  const theme = useTheme();
  return (
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
      {hasSavedProfile ? null : (
        <Typography tone="secondary" testID="skin-profile-empty">
          {translate('skinProfile.emptyIntro')}
        </Typography>
      )}
    </View>
  );
}
