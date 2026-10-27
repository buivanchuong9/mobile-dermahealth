import { AppointmentListScreen } from '@pages/Appointments';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useAppActions } from '../../hooks/useAppActions';

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
