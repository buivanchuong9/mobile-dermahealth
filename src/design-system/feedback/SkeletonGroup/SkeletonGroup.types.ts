import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type SkeletonGroupProps = {
  readonly children: ReactNode;
  /** Announced once for the whole group; defaults to the generic loading text. */
  readonly label?: string;
  readonly gap?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly testID?: string;
};
