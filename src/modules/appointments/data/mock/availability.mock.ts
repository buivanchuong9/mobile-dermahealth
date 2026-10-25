import {
  addMinutes,
  formatWeekdayShort,
} from '@shared/utilities/localDateTime';
import type {
  LocalDateKey,
  LocalDateTime,
} from '@shared/utilities/localDateTime';

const MORNING_START = '08:00';
const AFTERNOON_START = '13:30';
const SLOT_MINUTES = 30;
const SLOTS_PER_HALF_DAY = 8;

/** Deterministic pseudo-random choice so the same doctor/day always matches. */
function isTakenBySimulation(
  doctorId: string,
  startsAt: LocalDateTime,
): boolean {
  let hash = 0;
  for (const char of `${doctorId}|${startsAt}`) {
    hash = (hash * 31 + char.charCodeAt(0)) % 9973;
  }
  return hash % 4 === 0;
}

/** All slots for a day (Sunday is closed), with simulated unavailability. */
export function generateDaySlots(
  doctorId: string,
  dateKey: LocalDateKey,
): readonly {
  readonly startsAt: LocalDateTime;
  readonly simulatedTaken: boolean;
}[] {
  if (formatWeekdayShort(`${dateKey}T00:00`) === 'CN') {
    return [];
  }
  const starts = [MORNING_START, AFTERNOON_START].flatMap(start =>
    Array.from({ length: SLOTS_PER_HALF_DAY }, (_, index) =>
      addMinutes(`${dateKey}T${start}`, index * SLOT_MINUTES),
    ),
  );
  return starts.map(startsAt => ({
    startsAt,
    simulatedTaken: isTakenBySimulation(doctorId, startsAt),
  }));
}
