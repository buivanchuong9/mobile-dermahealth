import { RecordsScreen } from '@pages/MedicalRecords';
import { useAppServices } from '../../../../contexts/AppServicesProvider';
import { useAppActions } from '../../hooks/useAppActions';

export function RecordsTab() {
  const services = useAppServices();
  const app = useAppActions();
  return (
    <RecordsScreen
      repository={services.records}
      onOpenRecord={app.openRecord}
    />
  );
}
