import { AsyncStateView, SimulationBanner } from '@components/feedback';
import { ScreenContainer } from '@components/surfaces';
import { translate } from '@i18n';
import { AppointmentSummary } from '../partials/AppointmentSummary';
import { FirstTimeTip } from '../partials/FirstTimeTip';
import { HomeSectionSkeleton } from '../partials/HomeSectionSkeleton';
import { HomeNextStep } from '../partials/HomeNextStep';
import { QuickActions } from '../partials/QuickActions';
import { RecentVisits } from '../partials/RecentVisits';
import { ReminderList } from '../partials/ReminderList';
import { SkinProfileSummaryCard } from '../partials/SkinProfileSummaryCard';
import { WelcomeHeader } from '../partials/WelcomeHeader';
import { useDashboardData } from '../hooks/useDashboardData';
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
