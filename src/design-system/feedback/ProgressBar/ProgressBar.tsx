import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useReducedMotion } from '../../motion';
import { useTheme } from '../../theme';

export type ProgressBarProps = {
  /** 0 to 1 */
  readonly value: number;
  readonly accessibilityLabel: string;
};

const clamp = (value: number): number => Math.min(1, Math.max(0, value));

export function ProgressBar({ value, accessibilityLabel }: ProgressBarProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(clamp(value))).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(clamp(value));
      return undefined;
    }
    const animation = Animated.timing(progress, {
      toValue: clamp(value),
      duration: theme.motion.duration.normal,
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, theme.motion.duration.normal, value]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        min: 0,
        max: 100,
        now: Math.round(clamp(value) * 100),
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
            width: progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 8, overflow: 'hidden' },
  fill: { height: '100%' },
});
