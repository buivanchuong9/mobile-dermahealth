import { View } from 'react-native';
import { Banner, EmptyState, SimulationBanner } from '@components/feedback';
import { FadeInView } from '@components/motion';
import { ScreenHeader } from '@components/navigation';
import { Button } from '@components/primitives';
import { ScreenContainer } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { AlertSettings } from '../partials/AlertSettings';
import { GuidanceCard } from '../partials/GuidanceCard';
import { QueueSkeleton } from '../partials/QueueSkeleton';
import { QueueStats } from '../partials/QueueStats';
import { SimulationPanel } from '../partials/SimulationPanel';
import { TicketHeroCard } from '../partials/TicketHeroCard';
import { useQueue } from '../hooks/useQueue';
import type { QueueScreenProps } from './QueueScreen.types';

export function QueueScreen({
  repository,
  alertSettings,
  onChangeAlertSettings,
  onBack,
  onOpenAppointments,
  onOpenJourney,
  autoStepMs,
}: QueueScreenProps) {
  const theme = useTheme();
  const queue = useQueue(repository, autoStepMs);
  const header = (
    <ScreenHeader title={translate('queue.title')} onBack={onBack} />
  );

  if (queue.query.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <QueueSkeleton />
      </ScreenContainer>
    );
  }

  if (queue.query.status === 'error') {
    return (
      <ScreenContainer header={header}>
        <EmptyState
          icon="triangle-alert"
          title={translate('common.loadFailedTitle')}
          description={translate('common.loadFailedBody')}
          actionLabel={translate('common.retry')}
          onAction={queue.query.reload}
        />
      </ScreenContainer>
    );
  }

  const { snapshot } = queue;
  if (snapshot === null) {
    return (
      <ScreenContainer header={header}>
        <SimulationBanner />
        <EmptyState
          icon="ticket"
          title={translate('queue.empty.title')}
          description={translate('queue.empty.description')}
          actionLabel={translate('queue.empty.action')}
          onAction={onOpenAppointments}
          testID="queue-empty"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer header={header}>
      <SimulationBanner />
      {snapshot.stage === 'upcoming' ? (
        <Banner
          tone="warning"
          icon="alarm-clock"
          message={translate('queue.upcomingWarning', {
            count: snapshot.aheadCount,
          })}
          testID="queue-upcoming-warning"
        />
      ) : null}
      {snapshot.stage === 'called' ? (
        <Banner
          tone="success"
          icon="door-open"
          message={translate('queue.calledAlert', {
            ticket: snapshot.ticket.number,
            room: snapshot.ticket.room,
          })}
          testID="queue-called-alert"
        />
      ) : null}
      <FadeInView>
        <TicketHeroCard snapshot={snapshot} />
      </FadeInView>
      <QueueStats snapshot={snapshot} />
      <GuidanceCard snapshot={snapshot} />
      <View style={{ gap: theme.spacing[2] }}>
        <Button
          label={translate('queue.viewJourney')}
          variant="secondary"
          onPress={onOpenJourney}
          fullWidth
          testID="queue-view-journey"
        />
      </View>
      <AlertSettings
        settings={alertSettings}
        onChange={onChangeAlertSettings}
      />
      <SimulationPanel
        finished={snapshot.stage === 'completed'}
        autoRunning={queue.autoRunning}
        onAdvance={queue.advance}
        onToggleAuto={queue.toggleAuto}
        onReset={queue.reset}
      />
    </ScreenContainer>
  );
}
