import type { StatusTone } from '@components/data-display';
import type { IconName } from '@components/primitives';
import type { AppointmentStatus } from '../../../../model/appointments/Appointment';

export const PRESENTATION: Record<
  AppointmentStatus,
  { tone: StatusTone; icon: IconName }
> = {
  confirmed: { tone: 'info', icon: 'circle-check' },
  checked_in: { tone: 'success', icon: 'door-open' },
  completed: { tone: 'neutral', icon: 'check' },
  cancelled: { tone: 'danger', icon: 'x' },
};
