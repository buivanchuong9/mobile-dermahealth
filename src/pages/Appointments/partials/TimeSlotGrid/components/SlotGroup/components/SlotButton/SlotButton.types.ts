import type { LocalDateTime } from '@utils/localDateTime';
import type { TimeSlot } from '../../../../../../../../model/appointments/Appointment';

export type SlotButtonProps = {
  readonly slot: TimeSlot;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onSelect: (startsAt: LocalDateTime) => void;
};
