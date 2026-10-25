import { REDACTED, redactString, redactValue } from '../redact';

test('redacts sensitive keys regardless of case and separators', () => {
  const result = redactValue({
    Email: 'a@b.com',
    skin_type: 'oily',
    'access-token': 'abc',
    screen: 'profile',
  });
  expect(result).toEqual({
    Email: REDACTED,
    skin_type: REDACTED,
    'access-token': REDACTED,
    screen: 'profile',
  });
});

test('redacts nested objects and arrays', () => {
  const result = redactValue({
    user: { phone: '0901234567' },
    list: [{ pin: 1 }],
  });
  expect(result).toEqual({
    user: { phone: REDACTED },
    list: [{ pin: REDACTED }],
  });
});

test('redacts emails, phone numbers and bearer tokens inside strings', () => {
  const text = redactString(
    'user a.b@example.com called +84 901 234 567 with Bearer abc.def-123',
  );
  expect(text).not.toMatch(/example\.com|901|abc\.def/);
});

test('keeps harmless numbers and text', () => {
  expect(redactString('retry 3 of 5 for screen home')).toBe(
    'retry 3 of 5 for screen home',
  );
});

test('handles circular references and errors', () => {
  const loop: Record<string, unknown> = { id: 1 };
  loop.self = loop;
  expect(redactValue(loop)).toEqual({ id: 1, self: '[Circular]' });
  expect(redactValue(new Error('mail a@b.com'))).toEqual({
    name: 'Error',
    message: `mail ${REDACTED}`,
  });
});
