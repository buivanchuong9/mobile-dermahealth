import { StatusBadge } from '@design-system/data-display';
import type { StatusTone } from '@design-system/data-display';
import type { IconName } from '@design-system/primitives';
import { translate } from '@shared/localization';
import type { AppointmentStatus } from '../../../domain/entities/Appointment';

const PRESENTATION: Record<
  AppointmentStatus,
  { tone: StatusTone; icon: IconName }
> = {
  confirmed: { tone: 'info', icon: 'circle-check' },
  checked_in: { tone: 'success', icon: 'door-open' },
  completed: { tone: 'neutral', icon: 'check' },
  cancelled: { tone: 'danger', icon: 'x' },
};

export function AppointmentStatusBadge({
  status,
}: {
  readonly status: AppointmentStatus;
}) {
  const { tone, icon } = PRESENTATION[status];
  return (
    <StatusBadge
      label={translate(`appointments.status.${status}`)}
      tone={tone}
      icon={icon}
    />
  );
}
