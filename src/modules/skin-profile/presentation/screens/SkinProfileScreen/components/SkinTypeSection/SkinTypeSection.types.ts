import type { SkinType } from '../../../../../domain/value-objects/SkinType';

export type SkinTypeSectionProps = {
  readonly value: SkinType | null;
  readonly onChange: (value: SkinType) => void;
  readonly showRequiredError: boolean;
  readonly disabled: boolean;
};
