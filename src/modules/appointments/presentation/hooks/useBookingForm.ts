import { useCallback, useEffect, useMemo, useState } from 'react';
import { ok } from '@core/contracts';
import type { Clock } from '@core/contracts';
import { useAsyncQuery } from '@shared/hooks';
import { addDays, toDateKey } from '@shared/utilities/localDateTime';
import type {
  LocalDateKey,
  LocalDateTime,
} from '@shared/utilities/localDateTime';
import type {
  Appointment,
  ConsultationType,
  SpecialtyId,
} from '../../domain/entities/Appointment';
import type { AppointmentRepository } from '../../domain/repositories/AppointmentRepository';
import { validateBookingSelection } from '../../domain/rules/appointmentRules';
import type { BookingIssue } from '../../domain/rules/appointmentRules';

export type BookingMode =
  | {
      readonly type: 'new';
      /** Preselects a specialty, for example from an assessment suggestion. */
      readonly specialtyId?: SpecialtyId;
      readonly followUp?: {
        readonly visitId: string;
        readonly specialtyId?: SpecialtyId;
        readonly doctorId?: string;
      };
    }
  | { readonly type: 'reschedule'; readonly appointmentId: string };

const VISIBLE_DAYS = 14;

export type BookingFormOptions = {
  readonly repository: AppointmentRepository;
  readonly clock: Clock;
  readonly mode: BookingMode;
  readonly onCompleted: (appointment: Appointment) => void;
};

export function useBookingForm({
  repository,
  clock,
  mode,
  onCompleted,
}: BookingFormOptions) {
  const rescheduleId = mode.type === 'reschedule' ? mode.appointmentId : null;
  const followUp = mode.type === 'new' ? mode.followUp : undefined;

  const loadTarget = useCallback(
    () =>
      rescheduleId === null
        ? Promise.resolve(ok<Appointment | null>(null))
        : repository.get(rescheduleId),
    [repository, rescheduleId],
  );
  const target = useAsyncQuery(loadTarget);
  const lockedAppointment =
    target.status === 'ready' ? (target.data as Appointment | null) : null;

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
  const dateKeys = useMemo<readonly LocalDateKey[]>(() => {
    const today = toDateKey(clock.now());
    return Array.from({ length: VISIBLE_DAYS }, (_, index) =>
      addDays(today, index),
    );
  }, [clock]);
  const [dateKey, setDateKey] = useState<LocalDateKey>(toDateKey(clock.now()));
  const [startsAt, setStartsAt] = useState<LocalDateTime | null>(null);
  const [issues, setIssues] = useState<readonly BookingIssue[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const effectiveSpecialty = lockedAppointment?.specialtyId ?? specialtyId;
  const effectiveType = lockedAppointment?.consultationType ?? consultationType;

  const loadDoctors = useCallback(
    () =>
      repository.listDoctors(
        rescheduleId === null ? effectiveSpecialty : undefined,
      ),
    [repository, effectiveSpecialty, rescheduleId],
  );
  const doctors = useAsyncQuery(loadDoctors);
  const doctorList = doctors.status === 'ready' ? doctors.data : [];

  const doctorId =
    lockedAppointment?.doctorId ??
    (pickedDoctorId !== null &&
    doctorList.some(item => item.id === pickedDoctorId)
      ? pickedDoctorId
      : doctorList[0]?.id ?? null);
  const doctor = doctorList.find(item => item.id === doctorId) ?? null;

  const loadSlots = useCallback(
    () =>
      doctorId === null
        ? Promise.resolve(ok([]))
        : repository.getAvailability(doctorId, dateKey),
    [repository, doctorId, dateKey],
  );
  const slots = useAsyncQuery(loadSlots, repository.subscribe);

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
