import { View } from 'react-native';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import type { AuthScreenLayoutProps } from './AuthScreenLayout.types';

export function AuthScreenLayout({
  title,
  subtitle,
  onBack,
  children,
}: AuthScreenLayoutProps) {
  const theme = useTheme();
  return (
    <ScreenContainer
      background="primary"
      header={onBack ? <ScreenHeader title="" onBack={onBack} /> : undefined}
    >
      <View style={{ gap: theme.spacing[1] }}>
        <Typography variant="display" accessibilityRole="header">
          {title}
        </Typography>
        {subtitle ? <Typography tone="secondary">{subtitle}</Typography> : null}
      </View>
      {children}
    </ScreenContainer>
  );
}
