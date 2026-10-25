/** WCAG 2.x minimum contrast ratios. */
export const WCAG_AA_NORMAL_TEXT = 4.5;
export const WCAG_AA_LARGE_TEXT_AND_UI = 3;

/** Minimum touch target edge, in dp (Apple HIG 44pt, Material 48dp). */
export const MIN_TOUCH_TARGET = 44;

function channelToLinear(channel: number): number {
  const scaled = channel / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
}

function parseHex(hex: string): [number, number, number] {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match || match[1] === undefined) {
    throw new Error(`Unsupported color "${hex}", expected #RRGGBB`);
  }
  const hexDigits = match[1];
  return [
    parseInt(hexDigits.slice(0, 2), 16),
    parseInt(hexDigits.slice(2, 4), 16),
    parseInt(hexDigits.slice(4, 6), 16),
  ];
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

export function contrastRatio(foreground: string, background: string): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const [lighter, darker] = a >= b ? [a, b] : [b, a];
  return (lighter + 0.05) / (darker + 0.05);
}
