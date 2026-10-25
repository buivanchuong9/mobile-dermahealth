import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useReducedMotion } from '../../motion';
import { Icon } from '../../primitives';
import { useTheme } from '../../theme';

export type SuccessMarkProps = { readonly size?: number };

/** Check mark that scales in once; static when reduced motion is requested. */
export function SuccessMark({ size = 88 }: SuccessMarkProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(1);
      return undefined;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: theme.motion.duration.slow,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reducedMotion, theme.motion.duration.slow]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.feedback.success.background,
          opacity: progress,
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        },
      ]}
    >
      <Icon
        name="circle-check"
        size={size * 0.55}
        color={theme.colors.feedback.success.foreground}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
