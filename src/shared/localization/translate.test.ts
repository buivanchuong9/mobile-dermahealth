import { translate } from './translate';

test('returns the Vietnamese string for a known key', () => {
  expect(translate('app.tagline')).toBe('Chăm sóc da khoa học, mỗi ngày');
});
