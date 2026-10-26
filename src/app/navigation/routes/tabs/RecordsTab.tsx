import { RecordsScreen } from '@modules/medical-records';
import { useAppServices } from '../../../providers/AppServicesProvider';
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
