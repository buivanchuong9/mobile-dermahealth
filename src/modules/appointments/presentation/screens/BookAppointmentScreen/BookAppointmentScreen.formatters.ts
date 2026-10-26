import { translate } from '@shared/localization';
import type { BookingMode } from '../../hooks/useBookingForm.types';

/** Title and optional intro line for the booking screen's header. */
export function getBookingHeading(
  mode: BookingMode,
  rescheduleDoctorName: string | undefined,
): { readonly title: string; readonly subtitle: string | undefined } {
  if (mode.type === 'reschedule') {
    return {
      title: translate('appointments.booking.rescheduleTitle'),
      subtitle: rescheduleDoctorName
        ? translate('appointments.booking.rescheduleIntro', {
            doctor: rescheduleDoctorName,
          })
        : undefined,
    };
  }
  if (mode.followUp) {
    return {
      title: translate('appointments.booking.followUpTitle'),
      subtitle: translate('appointments.booking.followUpIntro'),
    };
  }
  return {
    title: translate('appointments.booking.title'),
    subtitle: undefined,
  };
}
