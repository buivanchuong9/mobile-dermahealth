import { SkinAssessmentFlowScreen } from '@pages/SkinAssessment';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function SkinAssessmentRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <SkinAssessmentFlowScreen
      service={services.assessmentService}
      history={services.assessmentHistory}
      onExit={navigation.goBack}
      onBookAppointment={specialtyId =>
        navigation.navigate('BookAppointment', {
          mode: { type: 'new', specialtyId },
        })
      }
      onViewHistory={() => navigation.navigate('AssessmentHistory')}
    />
  );
}
