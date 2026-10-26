import { AssessmentHistoryScreen } from '@modules/skin-assessment';
import { useAppServices } from '../../../providers/AppServicesProvider';
import { useRootNavigation } from '../../hooks/useRootNavigation';

export function AssessmentHistoryRoute() {
  const navigation = useRootNavigation();
  const services = useAppServices();
  return (
    <AssessmentHistoryScreen
      repository={services.assessmentHistory}
      onBack={navigation.goBack}
      onStartAssessment={() => navigation.replace('SkinAssessment')}
    />
  );
}
