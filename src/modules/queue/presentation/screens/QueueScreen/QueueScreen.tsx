import { View } from 'react-native';
import {
  Banner,
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { FadeInView } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { Button } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { QueueAlertSettings } from '../../../domain/entities/Queue';
import type { QueueRepository } from '../../../domain/repositories/QueueRepository';
import { AlertSettings } from '../../components/AlertSettings';
import { GuidanceCard } from '../../components/GuidanceCard';
import { QueueStats } from '../../components/QueueStats';
import { SimulationPanel } from '../../components/SimulationPanel';
import { TicketHeroCard } from '../../components/TicketHeroCard';
import { useQueue } from '../../hooks/useQueue';

export type QueueScreenProps = {
  readonly repository: QueueRepository;
  readonly alertSettings: QueueAlertSettings;
  readonly onChangeAlertSettings: (settings: QueueAlertSettings) => void;
  readonly onBack: () => void;
  readonly onOpenAppointments: () => void;
  readonly onOpenJourney: () => void;
};

export function QueueScreen({
  repository,
  alertSettings,
  onChangeAlertSettings,
  onBack,
  onOpenAppointments,
  onOpenJourney,
}: QueueScreenProps) {
  const theme = useTheme();
  const queue = useQueue(repository);
  const header = (
    <ScreenHeader title={translate('queue.title')} onBack={onBack} />
  );

  if (queue.query.status === 'loading') {
    return (
      <ScreenContainer header={header}>
        <SkeletonCard lines={4} />
        <SkeletonCard />
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
