export type SegmentedTabItem = {
  readonly key: string;
  readonly label: string;
  readonly count?: number;
};

export type SegmentedTabsProps = {
  readonly items: readonly SegmentedTabItem[];
  readonly selectedKey: string;
  readonly onSelect: (key: string) => void;
};
