import { SkinAssessmentFlowScreen } from '@modules/skin-assessment';
import { useAppServices } from '../../../providers/AppServicesProvider';
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
