import { useCallback, useMemo } from 'react';
import { useAppServices } from '../../providers/AppServicesProvider';
import { useRootNavigation } from './useRootNavigation';

/**
 * Named navigation intents shared by several screens (Home, Journey, ...), so
 * each rule such as "check in, then open the queue" exists once.
 */
export function useAppActions() {
  const navigation = useRootNavigation();
  const services = useAppServices();

  const openTab = useCallback(
    (screen: 'Home' | 'Appointments' | 'Journey' | 'Records' | 'Profile') =>
      navigation.navigate('Main', { screen }),
    [navigation],
  );

  const bookFollowUp = useCallback(async () => {
    const records = await services.records.list();
    const visit = records.ok
      ? records.value.find(
          entry => entry.kind === 'visit' && entry.followUp !== undefined,
        )
      : undefined;
    if (visit && visit.kind === 'visit' && visit.followUp) {
      navigation.navigate('BookAppointment', {
        mode: {
          type: 'new',
          followUp: {
            visitId: visit.id,
            specialtyId: visit.followUp.specialtyId,
            doctorId: visit.followUp.doctorId,
          },
        },
      });
      return;
    }
    navigation.navigate('BookAppointment', { mode: { type: 'new' } });
  }, [navigation, services]);

  const checkIn = useCallback(
    async (appointmentId: string) => {
      const result = await services.checkIn(appointmentId);
      if (result.ok) {
        navigation.navigate('Queue');
      } else {
        // The detail screen explains why check-in is not available.
        navigation.navigate('AppointmentDetail', { appointmentId });
      }
    },
    [navigation, services],
  );

  return useMemo(
    () => ({
      openTab,
      bookFollowUp,
      checkIn,
      openNotifications: () => navigation.navigate('Notifications'),
      openAppointment: (appointmentId: string) =>
        navigation.navigate('AppointmentDetail', { appointmentId }),
      bookAppointment: () =>
        navigation.navigate('BookAppointment', { mode: { type: 'new' } }),
      openQueue: () => navigation.navigate('Queue'),
      openAssessment: () => navigation.navigate('SkinAssessment'),
      openRecord: (recordId: string) =>
        navigation.navigate('RecordDetail', { recordId }),
      openChat: () => navigation.navigate('ConversationList'),
      openSkinProfile: () => navigation.navigate('SkinProfile'),
      openGuide: () => navigation.navigate('Guide'),
    }),
    [bookFollowUp, checkIn, navigation, openTab],
  );
}
