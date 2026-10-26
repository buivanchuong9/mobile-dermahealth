import { Animated, Pressable, StyleSheet } from 'react-native';
import { usePressFeedback } from '../../motion';
import type { PressableScaleProps } from './PressableScale.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * A Pressable with spring press feedback (slight scale and opacity change on
 * the native thread). Every Pressable prop is forwarded unchanged.
 */
export function PressableScale({
  style,
  pressedScale,
  pressedOpacity,
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const flatStyle = StyleSheet.flatten(style);
  const feedback = usePressFeedback({
    scale: pressedScale,
    pressedOpacity,
    restOpacity: typeof flatStyle?.opacity === 'number' ? flatStyle.opacity : 1,
    disabled: disabled ?? false,
  });
  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={event => {
        feedback.onPressIn();
        onPressIn?.(event);
      }}
      onPressOut={event => {
        feedback.onPressOut();
        onPressOut?.(event);
      }}
      style={[style, feedback.style]}
    />
  );
}
