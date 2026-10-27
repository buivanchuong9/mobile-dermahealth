import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RecordDetailScreen } from '@pages/MedicalRecords';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import type { RootStackParamList } from '../../navigation.types';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function RecordDetailRoute({
  route,
}: NativeStackScreenProps<RootStackParamList, 'RecordDetail'>) {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <RecordDetailScreen
      repository={services.records}
      recordId={route.params.recordId}
      onBack={navigation.goBack}
      onBookFollowUp={visit => {
        navigation.navigate('BookAppointment', {
          mode: {
            type: 'new',
            followUp: {
              visitId: visit.id,
              specialtyId: visit.followUp?.specialtyId,
              doctorId: visit.followUp?.doctorId,
            },
          },
        });
      }}
      onBookVisit={() =>
        navigation.navigate('BookAppointment', { mode: { type: 'new' } })
      }
    />
  );
}
