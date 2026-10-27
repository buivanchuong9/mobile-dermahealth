import { HomeScreen } from '@pages/Home';
import type { HomeActions } from '@pages/Home';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useAppSession } from '../../../../contexts/AppSessionProvider';
import { useAppActions } from '../../hooks/useAppActions';

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
