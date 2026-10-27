import { View } from 'react-native';
import { ScreenHeader } from '@components/navigation';
import { Illustration, Typography } from '@components/primitives';
import { GradientHero, ScreenContainer } from '@components/surfaces';
import { useTheme } from '@styles/theme';
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
      <GradientHero>
        <Illustration name="account" tone="onBrand" width={170} />
      </GradientHero>
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
