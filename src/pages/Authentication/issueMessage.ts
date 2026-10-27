import { translate } from '@i18n';
import type { FieldIssue } from '../../utils/authentication/authValidation';

/** Vietnamese message for a validation issue, or undefined when valid. */
export function getIssueMessage(
  issue: FieldIssue | undefined,
): string | undefined {
  return issue ? translate(`auth.issues.${issue}`) : undefined;
}
