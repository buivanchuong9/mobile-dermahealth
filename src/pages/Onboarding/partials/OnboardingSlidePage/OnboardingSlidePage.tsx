import { StyleSheet, View } from 'react-native';
import { Illustration, Typography } from '@components/primitives';
import { GradientHero } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { OnboardingSlidePageProps } from './OnboardingSlidePage.types';

const HORIZONTAL_PADDING = 24;

export function OnboardingSlidePage({
  slide,
  width,
}: OnboardingSlidePageProps) {
  const theme = useTheme();
  const title = translate(`onboarding.slides.${slide.id}.title`);
  const body = translate(`onboarding.slides.${slide.id}.body`);
  return (
    <View
      accessible
      accessibilityLabel={`${title}. ${body}`}
      style={[
        styles.page,
        { width, paddingHorizontal: HORIZONTAL_PADDING, gap: theme.spacing[5] },
      ]}
    >
      <GradientHero style={{ width: width - HORIZONTAL_PADDING * 2 }}>
        <Illustration
          name={slide.illustration}
          tone="onBrand"
          width={Math.min(width - 96, 280)}
        />
      </GradientHero>
      <View style={{ gap: theme.spacing[2] }}>
        <Typography variant="title" align="center" accessibilityRole="header">
          {title}
        </Typography>
        <Typography tone="secondary" align="center">
          {body}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { alignItems: 'center', justifyContent: 'center' },
});
