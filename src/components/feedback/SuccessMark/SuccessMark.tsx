import { Animated, StyleSheet } from 'react-native';
import { useEntranceAnimation } from '../../motion';
import { Icon } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import type { SuccessMarkProps } from './SuccessMark.types';

/** Check mark that scales in once; static when reduced motion is requested. */
export function SuccessMark({ size = 88 }: SuccessMarkProps) {
  const theme = useTheme();
  const animatedStyle = useEntranceAnimation({
    variant: 'scale',
    duration: 'slow',
  });

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
        },
        animatedStyle,
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
