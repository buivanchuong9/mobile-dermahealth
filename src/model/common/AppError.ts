export type AppErrorCode =
  | 'validation'
  | 'not_found'
  | 'storage'
  | 'network'
  | 'permission_denied'
  | 'unavailable'
  | 'unknown';

/**
 * Application-level error. `message` is a developer-facing English string and
 * must never contain personal or health data; user-facing text is derived from
 * `code` through localization.
 */
export type AppError = {
  readonly code: AppErrorCode;
  readonly message: string;
  readonly retryable: boolean;
  readonly cause?: unknown;
};

const RETRYABLE_CODES: ReadonlySet<AppErrorCode> = new Set([
  'network',
  'unavailable',
]);

export function createAppError(
  code: AppErrorCode,
  message: string,
  cause?: unknown,
): AppError {
  const base = { code, message, retryable: RETRYABLE_CODES.has(code) };
  return cause === undefined ? base : { ...base, cause };
}
