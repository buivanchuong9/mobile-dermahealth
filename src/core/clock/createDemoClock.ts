import type { Clock } from '../contracts';

/** Fixed starting point for every simulated session: a Monday morning. */
export const DEMO_START = '2026-10-26T08:05';

export type DemoClock = Clock & {
  advanceMinutes(minutes: number): void;
  reset(): void;
};

function toParts(value: string) {
  const [date = '', time = '00:00'] = value.split('T');
  const [year = 0, month = 1, day = 1] = date.split('-').map(Number);
  const [hour = 0, minute = 0] = time.split(':').map(Number);
  return { year, month, day, hour, minute };
}

const pad = (n: number): string => String(n).padStart(2, '0');

/**
 * Deterministic clock for the simulated experience. It only moves when the
 * simulation calls `advanceMinutes`, so every launch starts identically.
 */
export function createDemoClock(start: string = DEMO_START): DemoClock {
  let current = start;

  return {
    now: () => current,
    advanceMinutes(minutes) {
      const { year, month, day, hour, minute } = toParts(current);
      const date = new Date(
        Date.UTC(year, month - 1, day, hour, minute + minutes),
      );
      current =
        `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(
          date.getUTCDate(),
        )}` + `T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
    },
    reset() {
      current = start;
    },
  };
}
