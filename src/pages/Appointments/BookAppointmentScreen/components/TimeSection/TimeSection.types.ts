import type { LocalDateKey, LocalDateTime } from '@utils/localDateTime';
import type { TimeSlot } from '../../../../../model/appointments/Appointment';
import type { BookingIssue } from '../../../../../utils/appointments/appointmentRules';

export type TimeSectionProps = {
  /** `null` while slots are loading. */
  readonly slots: readonly TimeSlot[] | null;
  readonly dateKey: LocalDateKey;
  readonly selected: LocalDateTime | null;
  readonly onSelect: (startsAt: LocalDateTime) => void;
  /** Validation issues that concern the chosen time. */
  readonly issues: readonly BookingIssue[];
  readonly disabled: boolean;
};
