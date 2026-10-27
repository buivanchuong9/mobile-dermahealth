import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type { MotionDuration } from '../../../styles/tokens';
import type { EntranceVariant } from '../hooks/useEntranceAnimation';

export type FadeInViewProps = {
  readonly children: ReactNode;
  /** Milliseconds to wait before starting; use `staggerDelay(index)` in lists. */
  readonly delay?: number;
  readonly variant?: EntranceVariant;
  readonly duration?: MotionDuration;
  readonly style?: StyleProp<ViewStyle>;
};
