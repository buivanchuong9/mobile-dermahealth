import type { vi } from './locales/vi';

type Dictionary = typeof vi;

type Join<Prefix extends string, Key extends string> = `${Prefix}.${Key}`;

type DotPath<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string
    ? Prefix extends ''
      ? K
      : Join<Prefix, K>
    : DotPath<T[K], Prefix extends '' ? K : Join<Prefix, K>>;
}[keyof T & string];

export type TranslationKey = DotPath<Dictionary>;
export type LocaleCode = 'vi';
