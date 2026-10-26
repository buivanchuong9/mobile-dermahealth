import type { Appointment } from '@modules/appointments';
import type { QueueSnapshot } from '@modules/queue';
import type { AsyncQuery } from '@shared/hooks';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
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
