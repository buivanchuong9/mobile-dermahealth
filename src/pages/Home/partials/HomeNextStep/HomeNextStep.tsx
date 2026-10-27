import { AsyncStateView } from '@components/feedback';
import { FadeInView, staggerDelay } from '@components/motion';
import type { AsyncQueryState } from '@hooks';
import { translate } from '@i18n';
import { HomeSectionSkeleton } from '../HomeSectionSkeleton';
import { NextStepCard } from '../NextStepCard';
import { QueueStatusCard } from '../QueueStatusCard';
import type { HomeNextStepData, HomeNextStepProps } from './HomeNextStep.types';

/**
 * The next-step card needs both appointments and the live queue, so it waits
 * for both; a failure of either shows one retry for the pair.
 */
export function HomeNextStep({
  appointments,
  queue,
  now,
  actions,
  onRetry,
}: HomeNextStepProps) {
  const state: AsyncQueryState<HomeNextStepData, null> =
    appointments.status === 'error' || queue.status === 'error'
      ? { status: 'error', error: null }
      : appointments.status === 'ready' && queue.status === 'ready'
      ? {
          status: 'ready',
          data: { appointments: appointments.data, queue: queue.data },
        }
      : { status: 'loading' };

  return (
    <AsyncStateView
      state={state}
      loading={<HomeSectionSkeleton variant="nextStep" />}
      errorDescription={translate('home.loadFailed')}
      onRetry={onRetry}
      errorTestID="home-error"
    >
      {data => (
        <>
          <NextStepCard
            appointments={data.appointments}
            queue={data.queue}
            now={now}
            actions={actions}
          />
          {data.queue ? (
            <FadeInView delay={staggerDelay(1)}>
              <QueueStatusCard
                queue={data.queue}
                onPress={actions.onOpenQueue}
              />
            </FadeInView>
          ) : null}
        </>
      )}
    </AsyncStateView>
  );
}
