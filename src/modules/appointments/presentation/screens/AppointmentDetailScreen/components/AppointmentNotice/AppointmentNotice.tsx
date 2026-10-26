import { Banner } from '@design-system/feedback';
import { translate } from '@shared/localization';
import type { AppointmentNoticeProps } from './AppointmentNotice.types';

/** Outcome message after cancelling or a failed action; nothing otherwise. */
export function AppointmentNotice({ notice }: AppointmentNoticeProps) {
  if (notice === 'cancelled') {
    return (
      <Banner
        tone="success"
        message={translate('appointments.detail.cancelled')}
      />
    );
  }
  if (notice === 'failed') {
    return (
      <Banner
        tone="danger"
        message={translate('appointments.detail.actionFailed')}
      />
    );
  }
  return null;
}
