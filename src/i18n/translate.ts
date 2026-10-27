import { vi } from './locales/vi';
import type { LocaleCode, TranslationKey } from './Localization.types';

const dictionaries: Record<LocaleCode, unknown> = { vi };

const DEFAULT_LOCALE: LocaleCode = 'vi';

export type TranslationParams = Readonly<Record<string, string | number>>;

/**
 * Looks up a UI string. `{name}` placeholders are replaced from `params`;
 * unknown placeholders are left untouched so missing data is visible.
 */
export function translate(
  key: TranslationKey,
  params?: TranslationParams,
  locale: LocaleCode = DEFAULT_LOCALE,
): string {
  let node: unknown = dictionaries[locale];
  for (const segment of key.split('.')) {
    if (typeof node !== 'object' || node === null) {
      return key;
    }
    node = (node as Record<string, unknown>)[segment];
  }
  if (typeof node !== 'string') {
    return key;
  }
  if (params === undefined) {
    return node;
  }
  return node.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = params[name];
    return value === undefined ? placeholder : String(value);
  });
}
