import type { Appointment } from '@pages/Appointments';
import type { QueueSnapshot } from '@pages/Queue';
import type { AsyncQuery } from '@hooks';
import type { LocalDateTime } from '@utils/localDateTime';
import type { HomeActions } from '../../types';

export type HomeNextStepData = {
  readonly appointments: readonly Appointment[];
  readonly queue: QueueSnapshot | null;
};

export type HomeNextStepProps = {
  readonly appointments: AsyncQuery<readonly Appointment[], unknown>;
  readonly queue: AsyncQuery<QueueSnapshot | null, unknown>;
  readonly now: LocalDateTime;
  readonly actions: HomeActions;
  readonly onRetry: () => void;
};
