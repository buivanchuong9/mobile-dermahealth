import type { LocalDateKey } from '@shared/utilities/localDateTime';

export type DateStripProps = {
  readonly dateKeys: readonly LocalDateKey[];
  readonly selectedKey: LocalDateKey;
  readonly onSelect: (dateKey: LocalDateKey) => void;
  readonly disabled?: boolean;
};
