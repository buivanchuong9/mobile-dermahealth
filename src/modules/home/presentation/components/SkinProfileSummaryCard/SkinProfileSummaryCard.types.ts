import type { SkinProfileUseCases } from '@modules/skin-profile';

export type SkinProfileSummaryCardProps = {
  readonly useCases: SkinProfileUseCases;
  readonly onOpen: () => void;
};
