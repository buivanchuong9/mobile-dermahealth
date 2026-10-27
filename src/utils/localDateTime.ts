/**
 * Timezone-independent date/time helpers. A value is a local wall-clock string
 * `YYYY-MM-DDTHH:mm` (no offset), so formatting never shifts with the device
 * timezone and mock data stays deterministic.
 */
export type LocalDateTime = string;

export type LocalDateKey = string; // YYYY-MM-DD

type Parts = {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly hour: number;
  readonly minute: number;
};

const WEEKDAY_LONG = [
  'Chủ nhật',
  'Thứ hai',
  'Thứ ba',
  'Thứ tư',
  'Thứ năm',
  'Thứ sáu',
  'Thứ bảy',
] as const;
const WEEKDAY_SHORT = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'] as const;

const PATTERN = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/;

const pad = (value: number): string => String(value).padStart(2, '0');

function parse(value: string): Parts {
  const match = PATTERN.exec(value);
  if (!match) {
    throw new Error(`Invalid local date/time "${value}"`);
  }
  const [, year, month, day, hour, minute] = match;
  return {
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour ?? 0),
    minute: Number(minute ?? 0),
  };
}

function toUtcMs(parts: Parts): number {
  return Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
  );
}

function fromUtcMs(ms: number): LocalDateTime {
  const date = new Date(ms);
  return (
    `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
      date.getUTCDate(),
    )}` + `T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`
  );
}

export function addMinutes(
  value: LocalDateTime,
  minutes: number,
): LocalDateTime {
  return fromUtcMs(toUtcMs(parse(value)) + minutes * 60_000);
}

export function addDays(key: LocalDateKey, days: number): LocalDateKey {
  return toDateKey(addMinutes(`${key}T00:00`, days * 24 * 60));
}

/** Minutes from `from` to `to` (negative when `to` is earlier). */
export function diffMinutes(from: LocalDateTime, to: LocalDateTime): number {
  return Math.round((toUtcMs(parse(to)) - toUtcMs(parse(from))) / 60_000);
}

export function compareLocal(a: LocalDateTime, b: LocalDateTime): number {
  return toUtcMs(parse(a)) - toUtcMs(parse(b));
}

export function toDateKey(value: LocalDateTime): LocalDateKey {
  const { year, month, day } = parse(value);
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function isSameDay(a: LocalDateTime, b: LocalDateTime): boolean {
  return toDateKey(a) === toDateKey(b);
}

function weekdayIndex(value: string): number {
  const { year, month, day } = parse(value);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

export function formatTime(value: LocalDateTime): string {
  const { hour, minute } = parse(value);
  return `${pad(hour)}:${pad(minute)}`;
}

export function formatDayMonth(value: LocalDateTime): string {
  const { day, month } = parse(value);
  return `${pad(day)}/${pad(month)}`;
}

export function formatDate(value: LocalDateTime): string {
  const { day, month, year } = parse(value);
  return `${pad(day)}/${pad(month)}/${year}`;
}

export function formatWeekdayLong(value: LocalDateTime): string {
  return WEEKDAY_LONG[weekdayIndex(value)] ?? '';
}

export function formatWeekdayShort(value: LocalDateTime): string {
  return WEEKDAY_SHORT[weekdayIndex(value)] ?? '';
}

/** `Thứ hai, 26/10/2026` */
export function formatDateWithWeekday(value: LocalDateTime): string {
  return `${formatWeekdayLong(value)}, ${formatDate(value)}`;
}

export function formatDayOfMonth(value: LocalDateTime): string {
  return pad(parse(value).day);
}
