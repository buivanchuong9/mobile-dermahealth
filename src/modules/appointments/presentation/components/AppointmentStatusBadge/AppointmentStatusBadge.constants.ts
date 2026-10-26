import type { StatusTone } from '@design-system/data-display';
import type { IconName } from '@design-system/primitives';
import type { AppointmentStatus } from '../../../domain/entities/Appointment';

export const PRESENTATION: Record<
  AppointmentStatus,
  { tone: StatusTone; icon: IconName }
> = {
  confirmed: { tone: 'info', icon: 'circle-check' },
  checked_in: { tone: 'success', icon: 'door-open' },
  completed: { tone: 'neutral', icon: 'check' },
  cancelled: { tone: 'danger', icon: 'x' },
};
