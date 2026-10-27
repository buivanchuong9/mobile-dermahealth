export const REDACTED = '[REDACTED]';

const MAX_DEPTH = 6;

/**
 * Keys (compared lowercase, without `_` and `-`) whose values are always
 * replaced. This is a deny-list: callers must still avoid logging health data
 * on purpose, redaction is the safety net.
 */
const SENSITIVE_KEYS: ReadonlySet<string> = new Set([
  // credentials
  'password',
  'passcode',
  'pin',
  'token',
  'accesstoken',
  'refreshtoken',
  'idtoken',
  'authorization',
  'cookie',
  'secret',
  'apikey',
  // personal information
  'email',
  'phone',
  'phonenumber',
  'name',
  'fullname',
  'firstname',
  'lastname',
  'address',
  'dateofbirth',
  'birthdate',
  'dob',
  'gender',
  // health information
  'skintype',
  'skinconcerns',
  'concerns',
  'allergies',
  'symptoms',
  'diagnosis',
  'medications',
  'medication',
  'notes',
  'conditions',
  'routine',
  // media
  'photo',
  'photouri',
  'image',
  'imageuri',
  'base64',
]);

const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PHONE_PATTERN = /(?<![\w])\+?\d[\d\s().-]{7,}\d(?![\w])/g;
const BEARER_PATTERN = /Bearer\s+[A-Za-z0-9._~+/=-]+/gi;

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[_-]/g, '');
}

export function redactString(value: string): string {
  return value
    .replace(BEARER_PATTERN, REDACTED)
    .replace(EMAIL_PATTERN, REDACTED)
    .replace(PHONE_PATTERN, REDACTED);
}

export function redactValue(
  value: unknown,
  depth = 0,
  seen: WeakSet<object> = new WeakSet(),
): unknown {
  if (typeof value === 'string') {
    return redactString(value);
  }
  if (typeof value !== 'object' || value === null) {
    return typeof value === 'function' ? '[Function]' : value;
  }
  if (depth >= MAX_DEPTH) {
    return '[MaxDepth]';
  }
  if (seen.has(value)) {
    return '[Circular]';
  }
  seen.add(value);

  if (value instanceof Error) {
    return { name: value.name, message: redactString(value.message) };
  }
  if (Array.isArray(value)) {
    return value.map(item => redactValue(item, depth + 1, seen));
  }

  const output: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    output[key] = SENSITIVE_KEYS.has(normalizeKey(key))
      ? REDACTED
      : redactValue(child, depth + 1, seen);
  }
  return output;
}
