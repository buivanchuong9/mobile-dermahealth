import { useCallback } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AppointmentDetailScreen,
  BookAppointmentScreen,
  BookingConfirmationScreen,
} from '@modules/appointments';
import type { Appointment, BookingMode } from '@modules/appointments';
import { QueueScreen } from '@modules/queue';
import type { QueueAlertSettings } from '@modules/queue';
import { useAsyncQuery } from '@shared/hooks';
import { useAppServices } from '../../providers/AppServicesProvider';
import type { RootStackParamList } from '../types';
import { useRootNavigation } from '../useRootNavigation';

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

export function QueueRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();

  const loadPreferences = useCallback(
    () => services.notifications.getPreferences(),
    [services.notifications],
  );
  const preferences = useAsyncQuery(
    loadPreferences,
    services.notifications.subscribe,
  );
  const settings: QueueAlertSettings =
    preferences.status === 'ready'
      ? {
          notifications: preferences.data.queueUpdates,
          sound: preferences.data.alertVibration,
        }
      : { notifications: true, sound: true };

  return (
    <QueueScreen
      repository={services.queue}
      alertSettings={settings}
      onChangeAlertSettings={next => {
        services.notifications.updatePreferences({
          queueUpdates: next.notifications,
          alertVibration: next.sound,
        });
      }}
      onBack={navigation.goBack}
      onOpenAppointments={() =>
        navigation.navigate('Main', { screen: 'Appointments' })
      }
      onOpenJourney={() => navigation.navigate('Main', { screen: 'Journey' })}
    />
  );
}
