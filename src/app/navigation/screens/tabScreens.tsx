import { AppointmentListScreen } from '@modules/appointments';
import { HomeScreen } from '@modules/home';
import type { HomeActions } from '@modules/home';
import { routeForNextAction, CareJourneyScreen } from '@modules/journey';
import { RecordsScreen } from '@modules/medical-records';
import { ProfileScreen } from '@modules/settings';
import { useAppServices } from '../../providers/AppServicesProvider';
import { useAppSession } from '../../providers/AppSessionProvider';
import { useAppActions } from '../useAppActions';
import { useRootNavigation } from '../useRootNavigation';

export function HomeTab() {
  const services = useAppServices();
  const { session } = useAppSession();
  const app = useAppActions();

  const actions: HomeActions = {
    onOpenNotifications: app.openNotifications,
    onOpenAppointment: app.openAppointment,
    onOpenAppointments: () => app.openTab('Appointments'),
    onBookAppointment: app.bookAppointment,
    onBookFollowUp: app.bookFollowUp,
    onCheckIn: app.checkIn,
    onOpenQueue: app.openQueue,
    onOpenAssessment: app.openAssessment,
    onOpenRecords: () => app.openTab('Records'),
    onOpenRecord: app.openRecord,
    onOpenChat: app.openChat,
    onOpenSkinProfile: app.openSkinProfile,
    onOpenGuide: app.openGuide,
  };

  return (
    <HomeScreen
      userName={session?.fullName ?? ''}
      clock={services.clock}
      repositories={{
        appointments: services.appointments,
        queue: services.queue,
        notifications: services.notifications,
        records: services.records,
      }}
      skinProfileUseCases={services.skinProfile}
      actions={actions}
    />
  );
}

export function AppointmentsTab() {
  const services = useAppServices();
  const app = useAppActions();
  return (
    <AppointmentListScreen
      repository={services.appointments}
      onOpenAppointment={app.openAppointment}
      onBookAppointment={app.bookAppointment}
    />
  );
}

export function JourneyTab() {
  const services = useAppServices();
  const app = useAppActions();
  return (
    <CareJourneyScreen
      appointmentRepository={services.appointments}
      queueRepository={services.queue}
      clock={services.clock}
      onBookAppointment={app.bookAppointment}
      onNextAction={(action, appointment) => {
        switch (routeForNextAction(action)) {
          case 'appointment_detail':
            return app.openAppointment(appointment.id);
          case 'check_in':
            return app.checkIn(appointment.id);
          case 'queue':
            return app.openQueue();
          case 'records':
            return app.openTab('Records');
          case 'booking':
            return app.bookFollowUp();
        }
      }}
    />
  );
}

export function RecordsTab() {
  const services = useAppServices();
  const app = useAppActions();
  return (
    <RecordsScreen
      repository={services.records}
      onOpenRecord={app.openRecord}
    />
  );
}

export function ProfileTab() {
  const navigation = useRootNavigation();
  const { session, signOut } = useAppSession();
  const app = useAppActions();
  return (
    <ProfileScreen
      fullName={session?.fullName ?? ''}
      email={session?.email ?? ''}
      onOpenSkinProfile={app.openSkinProfile}
      onOpenNotificationPreferences={() =>
        navigation.navigate('NotificationPreferences')
      }
      onOpenAssessmentHistory={() => navigation.navigate('AssessmentHistory')}
      onOpenGuide={app.openGuide}
      onOpenPrivacy={() => navigation.navigate('Privacy')}
      onOpenAccessibility={() => navigation.navigate('AccessibilitySettings')}
      onSignOut={signOut}
    />
  );
}
