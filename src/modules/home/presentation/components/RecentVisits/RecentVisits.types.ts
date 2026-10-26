import type { VisitRecord } from '@modules/medical-records';

export type RecentVisitsProps = {
  readonly visits: readonly VisitRecord[];
  readonly onOpenRecord: (recordId: string) => void;
  readonly onOpenRecords: () => void;
};
