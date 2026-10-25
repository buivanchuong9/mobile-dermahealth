import { translate } from '@shared/localization';
import type { FieldIssue } from '../domain/rules/authValidation';

/** Vietnamese message for a validation issue, or undefined when valid. */
export function getIssueMessage(
  issue: FieldIssue | undefined,
): string | undefined {
  return issue ? translate(`auth.issues.${issue}`) : undefined;
}
