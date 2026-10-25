import type { VisitRecord } from '@modules/medical-records';
import { ListItem } from '@design-system/data-display';
import { Button, Typography } from '@design-system/primitives';
import { SectionCard } from '@design-system/surfaces';
import { translate } from '@shared/localization';
import { compareLocal, formatDate } from '@shared/utilities/localDateTime';

const MAX_ITEMS = 2;

export type RecentVisitsProps = {
  readonly visits: readonly VisitRecord[];
  readonly onOpenRecord: (recordId: string) => void;
  readonly onOpenRecords: () => void;
};

export function RecentVisits({
  visits,
  onOpenRecord,
  onOpenRecords,
}: RecentVisitsProps) {
  const recent = [...visits]
    .sort((a, b) => compareLocal(b.date, a.date))
    .slice(0, MAX_ITEMS);
  return (
    <SectionCard
      title={translate('home.recentVisits.title')}
      testID="home-recent-visits"
    >
      {recent.length === 0 ? (
        <Typography tone="secondary">
          {translate('home.recentVisits.empty')}
        </Typography>
      ) : (
        recent.map(visit => (
          <ListItem
            key={visit.id}
            icon="clipboard-list"
            title={visit.reason}
            subtitle={`${formatDate(visit.date)} · ${visit.doctorName}`}
            onPress={() => onOpenRecord(visit.id)}
            testID={`home-visit-${visit.id}`}
          />
        ))
      )}
      <Button
        label={translate('home.recentVisits.viewAll')}
        variant="ghost"
        size="sm"
        onPress={onOpenRecords}
      />
    </SectionCard>
  );
}
