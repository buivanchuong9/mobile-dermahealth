export type OnboardingActionsProps = {
  readonly canGoBack: boolean;
  readonly isLast: boolean;
  readonly onBack: () => void;
  readonly onNext: () => void;
  readonly onFinish: () => void;
};
