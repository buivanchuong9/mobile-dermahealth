import type { SkinType } from '../../../../model/skinProfile/SkinType';

export type SkinTypeSelectorProps = {
  readonly value: SkinType | null;
  readonly onChange: (value: SkinType) => void;
  readonly errorMessage?: string;
  readonly disabled?: boolean;
};
