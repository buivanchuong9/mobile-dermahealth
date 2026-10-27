import { useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BookAppointmentScreen } from '@pages/Appointments';
import type { Appointment, BookingMode } from '@pages/Appointments';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import type { RootStackParamList } from '../../navigation.types';
import { useRootNavigation } from '../../hooks/useRootNavigation';

const NEW_BOOKING: BookingMode = { type: 'new' };

export function BookAppointmentRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'BookAppointment'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  const mode = route.params?.mode ?? NEW_BOOKING;

  const handleCompleted = useCallback(
    (appointment: Appointment) =>
      navigation.replace('BookingConfirmation', {
        appointmentId: appointment.id,
        rescheduled: mode.type === 'reschedule',
      }),
    [mode.type, navigation],
  );

  return (
    <BookAppointmentScreen
      repository={services.appointments}
      clock={services.clock}
      mode={mode}
      onBack={navigation.goBack}
      onCompleted={handleCompleted}
    />
  );
}
