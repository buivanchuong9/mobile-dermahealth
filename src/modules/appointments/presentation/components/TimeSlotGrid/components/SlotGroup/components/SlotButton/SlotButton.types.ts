import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { TimeSlot } from '../../../../../../../domain/entities/Appointment';

export type SlotButtonProps = {
  readonly slot: TimeSlot;
  readonly selected: boolean;
  readonly disabled: boolean;
  readonly onSelect: (startsAt: LocalDateTime) => void;
};
