import type { Appointment } from '@pages/Appointments';
import type { QueueSnapshot } from '@pages/Queue';
import type { LocalDateTime } from '@utils/localDateTime';
import type { HomeActions } from '../../types';

export type NextStepCardProps = {
  readonly appointments: readonly Appointment[];
  readonly queue: QueueSnapshot | null;
  readonly now: LocalDateTime;
  readonly actions: HomeActions;
};
