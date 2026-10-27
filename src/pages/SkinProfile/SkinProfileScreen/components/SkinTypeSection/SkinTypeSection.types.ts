import type { SkinType } from '../../../../../model/skinProfile/SkinType';

export type SkinTypeSectionProps = {
  readonly value: SkinType | null;
  readonly onChange: (value: SkinType) => void;
  readonly showRequiredError: boolean;
  readonly disabled: boolean;
};
