import { translate } from '@i18n';
import { Banner } from '../Banner';

/** Reminds users that the content shown is simulated demo data. */
export function SimulationBanner() {
  return (
    <Banner
      tone="info"
      icon="info"
      message={translate('common.simulationNotice')}
      testID="simulation-banner"
    />
  );
}
