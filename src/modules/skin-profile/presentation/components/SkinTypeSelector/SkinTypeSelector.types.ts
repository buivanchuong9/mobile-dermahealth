import type { SkinType } from '../../../domain/value-objects/SkinType';

export type SkinTypeSelectorProps = {
  readonly value: SkinType | null;
  readonly onChange: (value: SkinType) => void;
  readonly errorMessage?: string;
  readonly disabled?: boolean;
};
