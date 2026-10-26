import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation.types';

export type RootNavigation = NativeStackNavigationProp<RootStackParamList>;

/** Typed navigation for adapters, also usable from screens inside the tabs. */
export function useRootNavigation(): RootNavigation {
  return useNavigation<RootNavigation>();
}
