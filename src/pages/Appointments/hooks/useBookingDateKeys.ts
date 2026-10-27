import { useMemo } from 'react';
import type { Clock } from '@model/common';
import { addDays, toDateKey } from '@utils/localDateTime';
import type { LocalDateKey } from '@utils/localDateTime';

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
