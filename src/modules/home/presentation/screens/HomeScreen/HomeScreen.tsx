import { View } from 'react-native';
import {
  EmptyState,
  SimulationBanner,
  SkeletonCard,
} from '@design-system/feedback';
import { FadeInView } from '@design-system/motion';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { AppointmentSummary } from '../../components/AppointmentSummary';
import { FirstTimeTip } from '../../components/FirstTimeTip';
import { NextStepCard } from '../../components/NextStepCard';
import { QueueStatusCard } from '../../components/QueueStatusCard';
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
  const theme = useTheme();
  const dashboard = useDashboardData(repositories);
  const now = clock.now();
  const data = dashboard.status === 'ready' ? dashboard.data : null;
  const unread = data
    ? data.notifications.filter(item => !item.read).length
    : 0;

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

      {dashboard.status === 'loading' ? (
        <View style={{ gap: theme.spacing[3] }}>
          <SkeletonCard lines={3} />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : null}

      {dashboard.status === 'error' ? (
        <EmptyState
          icon="triangle-alert"
          title={translate('common.loadFailedTitle')}
          description={translate('home.loadFailed')}
          actionLabel={translate('common.retry')}
          onAction={dashboard.reload}
          testID="home-error"
        />
      ) : null}

      {data ? (
        <>
          <FadeInView>
            <NextStepCard
              appointments={data.appointments}
              queue={data.queue}
              now={now}
              actions={actions}
            />
          </FadeInView>
          {data.queue ? (
            <FadeInView delay={60}>
              <QueueStatusCard
                queue={data.queue}
                onPress={actions.onOpenQueue}
              />
            </FadeInView>
          ) : null}
          <FadeInView delay={120}>
            <AppointmentSummary
              appointments={data.appointments}
              onOpenAppointment={actions.onOpenAppointment}
              onOpenAppointments={actions.onOpenAppointments}
              onBookAppointment={actions.onBookAppointment}
            />
          </FadeInView>
          <QuickActions actions={actions} />
          <SkinProfileSummaryCard
            useCases={skinProfileUseCases}
            onOpen={actions.onOpenSkinProfile}
          />
          <ReminderList
            notifications={data.notifications}
            onOpenNotifications={actions.onOpenNotifications}
          />
          <RecentVisits
            visits={data.visits}
            onOpenRecord={actions.onOpenRecord}
            onOpenRecords={actions.onOpenRecords}
          />
        </>
      ) : null}
    </ScreenContainer>
  );
}
