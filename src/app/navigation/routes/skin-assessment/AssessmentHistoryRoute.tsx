import { AssessmentHistoryScreen } from '@pages/SkinAssessment';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
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
