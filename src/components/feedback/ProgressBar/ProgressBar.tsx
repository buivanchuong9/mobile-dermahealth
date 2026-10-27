import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../styles/theme';
import { clampProgress, useProgressAnimation } from './ProgressBar.animations';
import type { ProgressBarProps } from './ProgressBar.types';

export function ProgressBar({ value, accessibilityLabel }: ProgressBarProps) {
  const theme = useTheme();
  const fillScale = useProgressAnimation(value);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(clampProgress(value) * 100),
      }}
      style={[
        styles.track,
        {
          borderRadius: theme.radius.pill,
          backgroundColor: theme.colors.feedback.info.background,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.fill,
          {
            borderRadius: theme.radius.pill,
            backgroundColor: theme.colors.brand.primary,
            transform: [{ scaleX: fillScale }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, overflow: 'hidden' },
  fill: { height: '100%', width: '100%', transformOrigin: 'left' },
});
