import type { IconName } from '@design-system/primitives';
import type { MainTabParamList } from '../navigation.types';

export const TAB_ICON: Record<keyof MainTabParamList, IconName> = {
  Home: 'house',
  Appointments: 'calendar',
  Journey: 'route',
  Records: 'file-text',
  Profile: 'user',
};
