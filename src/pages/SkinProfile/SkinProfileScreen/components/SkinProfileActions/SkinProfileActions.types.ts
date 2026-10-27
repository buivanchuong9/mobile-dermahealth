import type { SkinProfileNotice } from '../../../hooks/useSkinProfile';

export type SkinProfileActionsProps = {
  readonly notice: SkinProfileNotice;
  readonly saving: boolean;
  readonly hasSavedProfile: boolean;
  readonly onSave: () => void;
  readonly onRequestDelete: () => void;
};
