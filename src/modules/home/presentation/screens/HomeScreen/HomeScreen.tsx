import { AsyncStateView, SimulationBanner } from '@design-system/feedback';
import { ScreenContainer } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { AppointmentSummary } from '../../components/AppointmentSummary';
import { FirstTimeTip } from '../../components/FirstTimeTip';
import { HomeSectionSkeleton } from '../../components/HomeSectionSkeleton';
import { HomeNextStep } from '../../components/HomeNextStep';
import { QuickActions } from '../../components/QuickActions';
import { RecentVisits } from '../../components/RecentVisits';
import { ReminderList } from '../../components/ReminderList';
import { SkinProfileSummaryCard } from '../../components/SkinProfileSummaryCard';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { useDashboardData } from '../../hooks/useDashboardData';
import type { HomeScreenProps } from './HomeScreen.types';

export function HomeScreen({
  userName,
  clock,
  repositories,
  skinProfileUseCases,
  actions,
}: HomeScreenProps) {
  const dashboard = useDashboardData(repositories);
  const now = clock.now();
  const unread =
    dashboard.notifications.status === 'ready'
      ? dashboard.notifications.data.filter(item => !item.read).length
      : 0;
  const retryHome = () => {
    dashboard.appointments.reload();
    dashboard.queue.reload();
  };

  return (
    <ScreenContainer bottomInset={false}>
      <WelcomeHeader
        name={userName}
        now={now}
        unreadCount={unread}
        onOpenNotifications={actions.onOpenNotifications}
      />
      <SimulationBanner />
      <FirstTimeTip onOpenGuide={actions.onOpenGuide} />

      <HomeNextStep
        appointments={dashboard.appointments}
        queue={dashboard.queue}
        now={now}
        actions={actions}
        onRetry={retryHome}
      />

      <AsyncStateView
        state={dashboard.appointments}
        loading={<HomeSectionSkeleton variant="appointments" />}
        errorDescription={translate('home.loadFailed')}
        onRetry={dashboard.appointments.reload}
        errorTestID="home-error"
      >
        {appointments => (
          <AppointmentSummary
            appointments={appointments}
            onOpenAppointment={actions.onOpenAppointment}
            onOpenAppointments={actions.onOpenAppointments}
            onBookAppointment={actions.onBookAppointment}
          />
        )}
      </AsyncStateView>

      <QuickActions actions={actions} />
      <SkinProfileSummaryCard
        useCases={skinProfileUseCases}
        onOpen={actions.onOpenSkinProfile}
      />

      <AsyncStateView
        state={dashboard.notifications}
        loading={<HomeSectionSkeleton variant="reminders" />}
        onRetry={dashboard.notifications.reload}
      >
        {notifications => (
          <ReminderList
            notifications={notifications}
            onOpenNotifications={actions.onOpenNotifications}
          />
        )}
      </AsyncStateView>

      <AsyncStateView
        state={dashboard.visits}
        loading={<HomeSectionSkeleton variant="visits" />}
        onRetry={dashboard.visits.reload}
      >
        {visits => (
          <RecentVisits
            visits={visits}
            onOpenRecord={actions.onOpenRecord}
            onOpenRecords={actions.onOpenRecords}
          />
        )}
      </AsyncStateView>
    </ScreenContainer>
  );
}
