import type { StatusTone } from '@components/data-display';
import type { IconName } from '@components/primitives';
import type { QueueStage } from '../../../../model/queue/Queue';

export const STAGE_PRESENTATION: Record<
  QueueStage,
  { tone: StatusTone; icon: IconName }
> = {
  waiting: { tone: 'info', icon: 'hourglass' },
  upcoming: { tone: 'warning', icon: 'alarm-clock' },
  called: { tone: 'success', icon: 'door-open' },
  in_consultation: { tone: 'success', icon: 'stethoscope' },
  completed: { tone: 'neutral', icon: 'check' },
};
