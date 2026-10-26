import type { IconName } from './iconMap';

export type IconProps = {
  readonly name: IconName;
  readonly size?: number;
  /** Defaults to the primary text color. */
  readonly color?: string;
  readonly strokeWidth?: number;
};
