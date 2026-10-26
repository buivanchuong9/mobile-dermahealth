import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppointmentDetailScreen } from '@modules/appointments';
import { useAppServices } from '../../../providers/AppServicesProvider';
import type { RootStackParamList } from '../../navigation.types';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function AppointmentDetailRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'AppointmentDetail'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <AppointmentDetailScreen
      repository={services.appointments}
      clock={services.clock}
      appointmentId={route.params.appointmentId}
      onBack={navigation.goBack}
      onReschedule={appointmentId =>
        navigation.navigate('BookAppointment', {
          mode: { type: 'reschedule', appointmentId },
        })
      }
      onCheckedIn={async appointment => {
        await services.issueQueueTicket(appointment);
        navigation.navigate('Queue');
      }}
    />
  );
}
