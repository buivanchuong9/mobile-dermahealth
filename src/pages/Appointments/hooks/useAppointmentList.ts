import { useCallback, useMemo, useState } from 'react';
import { useAsyncQuery } from '@hooks';
import type { Appointment } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';
import {
  belongsToTab,
  sortForTab,
} from '../../../utils/appointments/appointmentRules';
import type { AppointmentTab } from '../../../utils/appointments/appointmentRules';

export const APPOINTMENT_TABS: readonly AppointmentTab[] = [
  'upcoming',
  'past',
  'follow_up',
];

export function useAppointmentList(repository: AppointmentRepository) {
  const [tab, setTab] = useState<AppointmentTab>('upcoming');
  const load = useCallback(() => repository.list(), [repository]);
  const query = useAsyncQuery(load, repository.subscribe);

  const counts = useMemo(() => {
    const all: readonly Appointment[] =
      query.status === 'ready' ? query.data : [];
    return {
      upcoming: all.filter(item => belongsToTab(item, 'upcoming')).length,
      past: all.filter(item => belongsToTab(item, 'past')).length,
      follow_up: all.filter(item => belongsToTab(item, 'follow_up')).length,
    } satisfies Record<AppointmentTab, number>;
  }, [query]);

  const visible = useMemo(() => {
    if (query.status !== 'ready') {
      return [];
    }
    return sortForTab(
      query.data.filter(item => belongsToTab(item, tab)),
      tab,
    );
  }, [query, tab]);

  return { query, tab, setTab, counts, visible };
}
