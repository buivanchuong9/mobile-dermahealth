import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export type PressableScaleProps = Omit<PressableProps, 'style'> & {
  /** Plain style only: press feedback is applied by this component. */
  readonly style?: StyleProp<ViewStyle>;
  /** Scale while pressed (default from the motion tokens). */
  readonly pressedScale?: number;
  /** Opacity while pressed; use 1 when the platform ripple is the cue. */
  readonly pressedOpacity?: number;
};
