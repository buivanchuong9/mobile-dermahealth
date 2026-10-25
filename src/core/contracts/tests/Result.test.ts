import { err, mapResult, ok, unwrapOr } from '../Result';

test('ok and err build discriminated results', () => {
  expect(ok(1)).toEqual({ ok: true, value: 1 });
  expect(err('x')).toEqual({ ok: false, error: 'x' });
});

test('mapResult transforms only successes', () => {
  expect(mapResult(ok(2), n => n * 2)).toEqual(ok(4));
  const failure = err('boom');
  expect(mapResult(failure, (n: number) => n * 2)).toBe(failure);
});

test('unwrapOr falls back on error', () => {
  expect(unwrapOr(ok(1), 0)).toBe(1);
  expect(unwrapOr(err('x'), 0)).toBe(0);
});
