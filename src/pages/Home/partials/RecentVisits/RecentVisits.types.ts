import type { VisitRecord } from '@pages/MedicalRecords';

export type RecentVisitsProps = {
  readonly visits: readonly VisitRecord[];
  readonly onOpenRecord: (recordId: string) => void;
  readonly onOpenRecords: () => void;
};
