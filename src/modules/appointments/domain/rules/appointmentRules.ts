import { err, ok } from '@core/contracts';
import type { Result } from '@core/contracts';
import {
  compareLocal,
  diffMinutes,
  isSameDay,
} from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { Appointment } from '../entities/Appointment';

/** A slot must start at least this long from now. */
export const MIN_BOOKING_LEAD_MINUTES = 60;
/** Changes and cancellations are blocked this close to the start time. */
export const CHANGE_CUTOFF_MINUTES = 120;
/** Another active appointment this close in time counts as an overlap. */
export const OVERLAP_WINDOW_MINUTES = 30;
/** Check-in stays open this long after the scheduled start. */
export const CHECK_IN_GRACE_MINUTES = 30;

export type BookingIssue =
  | 'missing_doctor'
  | 'missing_time'
  | 'slot_in_past'
  | 'overlaps_existing';

export const isActive = (appointment: Appointment): boolean =>
  appointment.status === 'confirmed' || appointment.status === 'checked_in';

export function validateBookingSelection(input: {
  readonly doctorId: string | null;
  readonly startsAt: LocalDateTime | null;
  readonly now: LocalDateTime;
  readonly existing: readonly Appointment[];
  /** Appointment being rescheduled, ignored when checking overlaps. */
  readonly ignoreAppointmentId?: string;
}): Result<void, readonly BookingIssue[]> {
  const issues: BookingIssue[] = [];
  if (input.doctorId === null) {
    issues.push('missing_doctor');
  }
  if (input.startsAt === null) {
    issues.push('missing_time');
  } else {
    const startsAt = input.startsAt;
    if (diffMinutes(input.now, startsAt) < MIN_BOOKING_LEAD_MINUTES) {
      issues.push('slot_in_past');
    }
    const overlaps = input.existing.some(
      appointment =>
        appointment.id !== input.ignoreAppointmentId &&
        isActive(appointment) &&
        Math.abs(diffMinutes(appointment.startsAt, startsAt)) <
          OVERLAP_WINDOW_MINUTES,
    );
    if (overlaps) {
      issues.push('overlaps_existing');
    }
  }
  return issues.length === 0 ? ok(undefined) : err(issues);
}

export type ChangeBlockReason = 'not_active' | 'too_close' | 'not_confirmed';

export function getChangeBlockReason(
  appointment: Appointment,
  now: LocalDateTime,
): ChangeBlockReason | null {
  if (appointment.status !== 'confirmed') {
    return appointment.status === 'checked_in' ? 'not_confirmed' : 'not_active';
  }
  return diffMinutes(now, appointment.startsAt) < CHANGE_CUTOFF_MINUTES
    ? 'too_close'
    : null;
}

export function canCheckIn(
  appointment: Appointment,
  now: LocalDateTime,
): boolean {
  return (
    appointment.status === 'confirmed' &&
    appointment.consultationType === 'in_person' &&
    isSameDay(appointment.startsAt, now) &&
    diffMinutes(appointment.startsAt, now) <= CHECK_IN_GRACE_MINUTES
  );
}

export type AppointmentTab = 'upcoming' | 'past' | 'follow_up';

export function belongsToTab(
  appointment: Appointment,
  tab: AppointmentTab,
): boolean {
  switch (tab) {
    case 'upcoming':
      return isActive(appointment) && appointment.kind === 'new';
    case 'follow_up':
      return isActive(appointment) && appointment.kind === 'follow_up';
    case 'past':
      return (
        appointment.status === 'completed' || appointment.status === 'cancelled'
      );
  }
}

export function sortForTab(
  appointments: readonly Appointment[],
  tab: AppointmentTab,
): readonly Appointment[] {
  const sorted = [...appointments].sort((a, b) =>
    compareLocal(a.startsAt, b.startsAt),
  );
  return tab === 'past' ? sorted.reverse() : sorted;
}

/** The nearest active appointment that has not finished yet. */
export function pickNextAppointment(
  appointments: readonly Appointment[],
): Appointment | null {
  const active = appointments
    .filter(isActive)
    .sort((a, b) => compareLocal(a.startsAt, b.startsAt));
  return active[0] ?? null;
}
