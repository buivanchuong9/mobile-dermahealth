export type CaptureStepProps = {
  readonly photo: string | null;
  readonly onPhotoChange: (photo: string | null) => void;
  readonly onContinue: () => void;
};
