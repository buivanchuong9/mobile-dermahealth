import type { StyleProp, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type FadeInViewProps = {
  readonly children: ReactNode;
  /** Milliseconds to wait before starting; use small steps for staggering. */
  readonly delay?: number;
  readonly style?: StyleProp<ViewStyle>;
};
