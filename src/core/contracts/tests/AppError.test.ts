import { createAppError } from '../AppError';

test('network and unavailable errors are retryable', () => {
  expect(createAppError('network', 'offline').retryable).toBe(true);
  expect(createAppError('unavailable', 'down').retryable).toBe(true);
});

test('other errors are not retryable', () => {
  expect(createAppError('validation', 'bad').retryable).toBe(false);
  expect(createAppError('storage', 'full').retryable).toBe(false);
});

test('cause is only present when provided', () => {
  expect('cause' in createAppError('unknown', 'x')).toBe(false);
  const cause = new Error('inner');
  expect(createAppError('unknown', 'x', cause).cause).toBe(cause);
});
