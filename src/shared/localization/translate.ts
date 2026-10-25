import { vi } from './locales/vi';
import type { LocaleCode, TranslationKey } from './Localization.types';

const dictionaries: Record<LocaleCode, unknown> = { vi };

const DEFAULT_LOCALE: LocaleCode = 'vi';

export function translate(
  key: TranslationKey,
  locale: LocaleCode = DEFAULT_LOCALE,
): string {
  let node: unknown = dictionaries[locale];
  for (const segment of key.split('.')) {
    if (typeof node !== 'object' || node === null) {
      return key;
    }
    node = (node as Record<string, unknown>)[segment];
  }
  return typeof node === 'string' ? node : key;
}
