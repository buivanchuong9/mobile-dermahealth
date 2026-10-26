import { useMemo } from 'react';
import type { Clock } from '@core/contracts';
import { addDays, toDateKey } from '@shared/utilities/localDateTime';
import type { LocalDateKey } from '@shared/utilities/localDateTime';

const VISIBLE_DAYS = 14;

/** The selectable days, starting today. */
export function useBookingDateKeys(clock: Clock): readonly LocalDateKey[] {
  return useMemo(() => {
    const today = toDateKey(clock.now());
    return Array.from({ length: VISIBLE_DAYS }, (_, index) =>
      addDays(today, index),
    );
  }, [clock]);
}
