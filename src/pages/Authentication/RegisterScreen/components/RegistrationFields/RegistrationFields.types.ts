import type {
  FieldIssues,
  RegistrationField,
} from '../../../../../utils/authentication/authValidation';
import type { RegistrationFormValues } from '../../../hooks/useRegisterForm.types';

export type RegistrationFieldsProps = {
  readonly values: RegistrationFormValues;
  readonly issues: FieldIssues<RegistrationField>;
  readonly disabled: boolean;
  readonly onChange: <K extends keyof RegistrationFormValues>(
    key: K,
    value: RegistrationFormValues[K],
  ) => void;
  /** Called when the last field is submitted from the keyboard. */
  readonly onSubmit: () => void;
};
