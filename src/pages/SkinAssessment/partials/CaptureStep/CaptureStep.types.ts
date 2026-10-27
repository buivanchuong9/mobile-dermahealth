export type CaptureStepProps = {
  readonly samplePhoto: boolean;
  readonly onChooseSample: () => void;
  readonly onRemoveSample: () => void;
  readonly onContinue: () => void;
};
