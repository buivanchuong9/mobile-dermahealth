import { StatusBadge } from '@design-system/data-display';
import type { StatusTone } from '@design-system/data-display';
import type { IconName } from '@design-system/primitives';
import { translate } from '@shared/localization';
import type { RecordSource } from '../../../domain/entities/RecordEntry';

const PRESENTATION: Record<RecordSource, { tone: StatusTone; icon: IconName }> =
  {
    clinician_confirmed: { tone: 'success', icon: 'shield-check' },
    patient_reported: { tone: 'neutral', icon: 'user' },
    ai_generated: { tone: 'warning', icon: 'sparkles' },
  };

export function RecordSourceBadge({
  source,
}: {
  readonly source: RecordSource;
}) {
  const { tone, icon } = PRESENTATION[source];
  return (
    <StatusBadge
      label={translate(`records.source.${source}`)}
      tone={tone}
      icon={icon}
      testID={`source-${source}`}
    />
  );
}
