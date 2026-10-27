import { useCallback, useState } from 'react';
import type { Clock } from '@model/common';
import { useAsyncQuery } from '@hooks';
import type { Appointment } from '../../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../../model/appointments/AppointmentRepository';
import {
  canCheckIn,
  getChangeBlockReason,
} from '../../../utils/appointments/appointmentRules';

export type DetailNotice = 'cancelled' | 'failed' | null;

export function useAppointmentDetail(
  repository: AppointmentRepository,
  appointmentId: string,
  clock: Clock,
) {
  const load = useCallback(
    () => repository.get(appointmentId),
    [repository, appointmentId],
  );
  const query = useAsyncQuery(load, repository.subscribe);
  const [busy, setBusy] = useState<'cancel' | 'check_in' | null>(null);
  const [notice, setNotice] = useState<DetailNotice>(null);

  const appointment = query.status === 'ready' ? query.data : null;
  const now = clock.now();

  const cancel = useCallback(async () => {
    setBusy('cancel');
    setNotice(null);
    const result = await repository.cancel(appointmentId);
    setBusy(null);
    setNotice(result.ok ? 'cancelled' : 'failed');
    return result.ok;
  }, [repository, appointmentId]);

  const checkIn = useCallback(async (): Promise<Appointment | null> => {
    setBusy('check_in');
    setNotice(null);
    const result = await repository.checkIn(appointmentId);
    setBusy(null);
    if (!result.ok) {
      setNotice('failed');
      return null;
    }
    return result.value;
  }, [repository, appointmentId]);

  return {
    query,
    appointment,
    busy,
    notice,
    canCheckIn: appointment !== null && canCheckIn(appointment, now),
    changeBlockReason:
      appointment !== null ? getChangeBlockReason(appointment, now) : null,
    cancel,
    checkIn,
  };
}
