import {
  formatDate,
  formatDayMonth,
  formatTime,
  formatWeekdayLong,
} from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';

/** `09:30, Thứ hai, 26/10/2026` */
export function formatAppointmentWhen(startsAt: LocalDateTime): string {
  return `${formatTime(startsAt)}, ${formatWeekdayLong(startsAt)}, ${formatDate(
    startsAt,
  )}`;
}

/** `Thứ hai, 26/10` */
export function formatAppointmentDay(startsAt: LocalDateTime): string {
  return `${formatWeekdayLong(startsAt)}, ${formatDayMonth(startsAt)}`;
}
