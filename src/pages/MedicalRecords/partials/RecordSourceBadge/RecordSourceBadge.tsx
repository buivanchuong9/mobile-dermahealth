import { StatusBadge } from '@components/data-display';
import { translate } from '@i18n';
import { PRESENTATION } from './RecordSourceBadge.constants';
import type { RecordSourceBadgeProps } from './RecordSourceBadge.types';

export function RecordSourceBadge({ source }: RecordSourceBadgeProps) {
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
