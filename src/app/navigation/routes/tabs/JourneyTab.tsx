import { routeForNextAction, CareJourneyScreen } from '@modules/journey';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useAppActions } from '../../hooks/useAppActions';

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
