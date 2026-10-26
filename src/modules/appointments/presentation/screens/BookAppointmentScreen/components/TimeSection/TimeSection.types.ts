import type {
  LocalDateKey,
  LocalDateTime,
} from '@shared/utilities/localDateTime';
import type { TimeSlot } from '../../../../../domain/entities/Appointment';
import type { BookingIssue } from '../../../../../domain/rules/appointmentRules';

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
