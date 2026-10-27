import type { Animated } from 'react-native';

export type PageDotsProps = {
  readonly count: number;
  /** Horizontal scroll offset in pixels. */
  readonly scrollX: Animated.Value;
  readonly pageWidth: number;
};
