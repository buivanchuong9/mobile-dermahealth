import { useCallback, useEffect, useState } from 'react';
import { useAsyncQuery } from '@shared/hooks';
import { toDateKey } from '@shared/utilities/localDateTime';
import type {
  LocalDateKey,
  LocalDateTime,
} from '@shared/utilities/localDateTime';
import type {
  ConsultationType,
  SpecialtyId,
} from '../../domain/entities/Appointment';
import { validateBookingSelection } from '../../domain/rules/appointmentRules';
import type { BookingIssue } from '../../domain/rules/appointmentRules';
import type { BookingFormOptions } from './useBookingForm.types';
import { useBookingDateKeys } from './useBookingDateKeys';
import { useBookingDoctors } from './useBookingDoctors';
import { useBookingSlots } from './useBookingSlots';
import { useBookingTarget } from './useBookingTarget';

/** Booking and rescheduling state: selection, validation and submission. */
export function useBookingForm({
  repository,
  clock,
  mode,
  onCompleted,
}: BookingFormOptions) {
  const rescheduleId = mode.type === 'reschedule' ? mode.appointmentId : null;
  const followUp = mode.type === 'new' ? mode.followUp : undefined;

  const { target, lockedAppointment } = useBookingTarget(
    repository,
    rescheduleId,
  );

  const [consultationType, setConsultationType] =
    useState<ConsultationType>('in_person');
  const [specialtyId, setSpecialtyId] = useState<SpecialtyId>(
    mode.type === 'new'
      ? mode.specialtyId ?? followUp?.specialtyId ?? 'general'
      : 'general',
  );
  const [pickedDoctorId, setPickedDoctorId] = useState<string | null>(
    followUp?.doctorId ?? null,
  );
  const [dateKey, setDateKey] = useState<LocalDateKey>(toDateKey(clock.now()));
  const [startsAt, setStartsAt] = useState<LocalDateTime | null>(null);
  const [issues, setIssues] = useState<readonly BookingIssue[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const effectiveSpecialty = lockedAppointment?.specialtyId ?? specialtyId;
  const effectiveType = lockedAppointment?.consultationType ?? consultationType;

  const dateKeys = useBookingDateKeys(clock);
  const { doctors, doctorId, doctor } = useBookingDoctors({
    repository,
    specialtyId: effectiveSpecialty,
    isReschedule: rescheduleId !== null,
    lockedDoctorId: lockedAppointment?.doctorId ?? null,
    pickedDoctorId,
  });
  const slots = useBookingSlots(repository, doctorId, dateKey);

  const loadExisting = useCallback(() => repository.list(), [repository]);
  const existing = useAsyncQuery(loadExisting, repository.subscribe);

  useEffect(() => {
    setStartsAt(null);
  }, [doctorId, dateKey]);

  const selectSpecialty = useCallback((value: SpecialtyId) => {
    setSpecialtyId(value);
    setPickedDoctorId(null);
    setStartsAt(null);
    setIssues([]);
  }, []);

  const selectDoctor = useCallback((value: string) => {
    setPickedDoctorId(value);
    setIssues([]);
  }, []);

  const selectDate = useCallback((value: LocalDateKey) => {
    setDateKey(value);
    setIssues([]);
  }, []);

  const selectSlot = useCallback((value: LocalDateTime) => {
    setStartsAt(value);
    setIssues([]);
    setSubmitFailed(false);
  }, []);

  const submit = useCallback(async () => {
    const validation = validateBookingSelection({
      doctorId,
      startsAt,
      now: clock.now(),
      existing: existing.status === 'ready' ? existing.data : [],
      ignoreAppointmentId: rescheduleId ?? undefined,
    });
    if (!validation.ok) {
      setIssues(validation.error);
      return;
    }
    if (doctorId === null || startsAt === null) {
      return;
    }
    setIssues([]);
    setSubmitFailed(false);
    setSubmitting(true);
    const result =
      rescheduleId !== null
        ? await repository.reschedule(rescheduleId, startsAt)
        : await repository.book({
            doctorId,
            specialtyId: effectiveSpecialty,
            consultationType: effectiveType,
            startsAt,
            kind: followUp ? 'follow_up' : 'new',
            followUpOfVisitId: followUp?.visitId,
          });
    setSubmitting(false);
    if (result.ok) {
      onCompleted(result.value);
    } else {
      setSubmitFailed(true);
      slots.reload();
    }
  }, [
    clock,
    doctorId,
    effectiveSpecialty,
    effectiveType,
    existing,
    followUp,
    onCompleted,
    repository,
    rescheduleId,
    slots,
    startsAt,
  ]);

  return {
    isReschedule: rescheduleId !== null,
    target,
    lockedAppointment,
    consultationType: effectiveType,
    setConsultationType,
    specialtyId: effectiveSpecialty,
    selectSpecialty,
    doctors,
    doctor,
    doctorId,
    selectDoctor,
    dateKeys,
    dateKey,
    selectDate,
    slots,
    startsAt,
    selectSlot,
    issues,
    submitting,
    submitFailed,
    submit,
  };
}
