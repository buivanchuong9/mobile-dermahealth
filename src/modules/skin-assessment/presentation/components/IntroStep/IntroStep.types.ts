export type IntroStepProps = {
  readonly consent: boolean;
  readonly consentMissing: boolean;
  readonly onToggleConsent: (value: boolean) => void;
  readonly onStart: () => void;
};
