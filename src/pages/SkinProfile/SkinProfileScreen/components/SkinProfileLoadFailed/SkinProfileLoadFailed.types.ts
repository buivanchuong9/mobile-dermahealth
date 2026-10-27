export type SkinProfileLoadFailedProps = {
  readonly deleteFailed: boolean;
  readonly onRetry: () => void;
  readonly onRequestDelete: () => void;
};
