import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { TimeSlot } from '../../../../../domain/entities/Appointment';

export type SlotGroupProps = {
  readonly title: string;
  readonly slots: readonly TimeSlot[];
  readonly selected: LocalDateTime | null;
  readonly onSelect: (startsAt: LocalDateTime) => void;
  readonly disabled: boolean;
};
