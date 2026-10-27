export interface SelectionFillProps {
  readonly selected: boolean;
  readonly unselectedBackground: string;
  readonly selectedBackground: string;
  readonly unselectedBorder?: string;
  readonly selectedBorder?: string;
  readonly borderWidth?: number;
  readonly borderRadius: number;
}
