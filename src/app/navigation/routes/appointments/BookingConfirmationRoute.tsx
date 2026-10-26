import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookingConfirmationScreen } from '@modules/appointments';
import { useAppServices } from '../../../providers/AppServicesProvider';
import type { RootStackParamList } from '../../navigation.types';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function BookingConfirmationRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'BookingConfirmation'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <BookingConfirmationScreen
      repository={services.appointments}
      appointmentId={route.params.appointmentId}
      rescheduled={route.params.rescheduled}
      onViewDetail={appointmentId =>
        navigation.replace('AppointmentDetail', { appointmentId })
      }
      onGoHome={() => navigation.navigate('Main', { screen: 'Home' })}
    />
  );
}
