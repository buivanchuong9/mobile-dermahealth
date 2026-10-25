import {
  WCAG_AA_LARGE_TEXT_AND_UI,
  WCAG_AA_NORMAL_TEXT,
} from '../accessibility';
import type { Theme } from './Theme.types';

export type ContrastPair = {
  readonly description: string;
  readonly foreground: (theme: Theme) => string;
  readonly background: (theme: Theme) => string;
  readonly minimumRatio: number;
};

/**
 * Foreground/background pairs used by the UI. Every theme must satisfy all of
 * them. Disabled text is intentionally absent (WCAG exempts inactive
 * components). Add a pair here whenever a component introduces a new one.
 */
export const contrastPairs: readonly ContrastPair[] = [
  {
    description: 'primary text on primary background',
    foreground: t => t.colors.text.primary,
    background: t => t.colors.background.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'primary text on secondary background',
    foreground: t => t.colors.text.primary,
    background: t => t.colors.background.secondary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'secondary text on primary background',
    foreground: t => t.colors.text.secondary,
    background: t => t.colors.background.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'secondary text on secondary background',
    foreground: t => t.colors.text.secondary,
    background: t => t.colors.background.secondary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'text on brand (primary button label)',
    foreground: t => t.colors.text.onBrand,
    background: t => t.colors.brand.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'text on brand-light (secondary button label)',
    foreground: t => t.colors.text.onBrandLight,
    background: t => t.colors.brand.primaryLight,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'brand text on primary background (ghost button label)',
    foreground: t => t.colors.brand.primary,
    background: t => t.colors.background.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'success status on primary background',
    foreground: t => t.colors.status.success,
    background: t => t.colors.background.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'warning status on primary background',
    foreground: t => t.colors.status.warning,
    background: t => t.colors.background.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'error status on primary background',
    foreground: t => t.colors.status.error,
    background: t => t.colors.background.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'primary text on surface (selectable card)',
    foreground: t => t.colors.text.primary,
    background: t => t.colors.surface.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'secondary text on surface (selectable card description)',
    foreground: t => t.colors.text.secondary,
    background: t => t.colors.surface.primary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'error status on secondary background (disclaimer area)',
    foreground: t => t.colors.status.error,
    background: t => t.colors.background.secondary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'selected card border on selected card background',
    foreground: t => t.colors.brand.primary,
    background: t => t.colors.background.secondary,
    minimumRatio: WCAG_AA_LARGE_TEXT_AND_UI,
  },
  {
    description: 'unselected indicator outline on surface',
    foreground: t => t.colors.text.secondary,
    background: t => t.colors.surface.primary,
    minimumRatio: WCAG_AA_LARGE_TEXT_AND_UI,
  },
  {
    description: 'success feedback text on its tinted background',
    foreground: t => t.colors.feedback.success.foreground,
    background: t => t.colors.feedback.success.background,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'warning feedback text on its tinted background',
    foreground: t => t.colors.feedback.warning.foreground,
    background: t => t.colors.feedback.warning.background,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'danger feedback text on its tinted background',
    foreground: t => t.colors.feedback.danger.foreground,
    background: t => t.colors.feedback.danger.background,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'info feedback text on its tinted background',
    foreground: t => t.colors.feedback.info.foreground,
    background: t => t.colors.feedback.info.background,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'neutral feedback text on its tinted background',
    foreground: t => t.colors.feedback.neutral.foreground,
    background: t => t.colors.feedback.neutral.background,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'primary text on neutral feedback background',
    foreground: t => t.colors.text.primary,
    background: t => t.colors.feedback.neutral.background,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'brand text on secondary background (links, active tab)',
    foreground: t => t.colors.text.onBrandLight,
    background: t => t.colors.background.secondary,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
  {
    description: 'text on error status (danger button label)',
    foreground: t => t.colors.text.onBrand,
    background: t => t.colors.status.error,
    minimumRatio: WCAG_AA_NORMAL_TEXT,
  },
];
