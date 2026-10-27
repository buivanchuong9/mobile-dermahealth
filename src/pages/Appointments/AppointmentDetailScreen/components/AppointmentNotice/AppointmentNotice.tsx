import { Banner } from '@components/feedback';
import { translate } from '@i18n';
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
