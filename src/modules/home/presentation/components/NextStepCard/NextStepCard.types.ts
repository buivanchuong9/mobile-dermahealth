import type { Appointment } from '@modules/appointments';
import type { QueueSnapshot } from '@modules/queue';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type { HomeActions } from '../../types';

export type NextStepCardProps = {
  readonly appointments: readonly Appointment[];
  readonly queue: QueueSnapshot | null;
  readonly now: LocalDateTime;
  readonly actions: HomeActions;
};
