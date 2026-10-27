import type { IconName } from '../../primitives';
import type { StatusTone } from '../../data-display';

export const DEFAULT_ICON: Record<StatusTone, IconName> = {
  success: 'circle-check',
  warning: 'triangle-alert',
  danger: 'triangle-alert',
  info: 'info',
  neutral: 'info',
};
