export type TermsConsentProps = {
  readonly accepted: boolean;
  readonly showError: boolean;
  readonly disabled: boolean;
  readonly onToggle: () => void;
};
