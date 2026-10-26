import { StatusBadge } from '@design-system/data-display';
import { translate } from '@shared/localization';
import { PRESENTATION } from './AppointmentStatusBadge.constants';
import type { AppointmentStatusBadgeProps } from './AppointmentStatusBadge.types';

export function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const { tone, icon } = PRESENTATION[status];
  return (
    <StatusBadge
      label={translate(`appointments.status.${status}`)}
      tone={tone}
      icon={icon}
    />
  );
}
