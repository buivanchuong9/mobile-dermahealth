import type { IconName } from '@components/primitives';

export type InfoRowProps = {
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
  readonly secondaryValue?: string;
};
