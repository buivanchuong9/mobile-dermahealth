import type { LocalDateTime } from '@utils/localDateTime';
import type { TimeSlot } from '../../../../model/appointments/Appointment';

export type TimeSlotGridProps = {
  readonly slots: readonly TimeSlot[];
  readonly selected: LocalDateTime | null;
  readonly onSelect: (startsAt: LocalDateTime) => void;
  readonly disabled?: boolean;
};
