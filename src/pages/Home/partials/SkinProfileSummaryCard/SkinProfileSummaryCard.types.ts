import type { SkinProfileUseCases } from '@pages/SkinProfile';

export type SkinProfileSummaryCardProps = {
  readonly useCases: SkinProfileUseCases;
  readonly onOpen: () => void;
};
