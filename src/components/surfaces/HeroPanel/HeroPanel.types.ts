import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type HeroPanelProps = {
  readonly children: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
};
