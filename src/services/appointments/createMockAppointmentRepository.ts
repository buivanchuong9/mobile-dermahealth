import { createAppError, err, ok } from '@model/common';
import type { Clock } from '@model/common';
import { DEMO_DOCTORS, findDemoDoctor } from '@mocks/demo';
import { compareLocal } from '@utils/localDateTime';
import type { Appointment, Doctor } from '../../model/appointments/Appointment';
import type { AppointmentRepository } from '../../model/appointments/AppointmentRepository';
import {
  canCheckIn,
  getChangeBlockReason,
  isActive,
  validateBookingSelection,
} from '../../utils/appointments/appointmentRules';
import { generateDaySlots } from '../../mocks/appointments/availability.mock';
import {
  buildAppointment,
  createSeedAppointments,
} from '../../mocks/appointments/appointments.mock';

const DOCTORS: readonly Doctor[] = DEMO_DOCTORS.map(doctor => ({
  id: doctor.id,
  name: doctor.name,
  title: doctor.title,
  specialtyId: doctor.specialtyId,
}));

/**
 * In-memory simulation. Nothing is sent anywhere or persisted; restarting the
 * app restores the seed data.
 */
export function createMockAppointmentRepository(
  clock: Clock,
): AppointmentRepository {
  let appointments: Appointment[] = createSeedAppointments(clock.now());
  let sequence = 1;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach(listener => listener());

  const replace = (updated: Appointment) => {
    appointments = appointments.map(item =>
      item.id === updated.id ? updated : item,
    );
    notify();
    return ok(updated);
  };
  const notFound = () =>
    err(createAppError('not_found', 'Appointment not found'));

  const isSlotFree = (
    doctorId: string,
    startsAt: string,
    ignoreId?: string,
  ) => {
    const dateKey = startsAt.slice(0, 10);
    const slot = generateDaySlots(doctorId, dateKey).find(
      item => item.startsAt === startsAt,
    );
    const taken = appointments.some(
      item =>
        item.id !== ignoreId &&
        item.doctorId === doctorId &&
        isActive(item) &&
        item.startsAt === startsAt,
    );
    return slot !== undefined && !slot.simulatedTaken && !taken;
  };

  return {
    async list() {
      return ok(
        [...appointments].sort((a, b) => compareLocal(a.startsAt, b.startsAt)),
      );
    },

    async get(id) {
      const found = appointments.find(item => item.id === id);
      return found ? ok(found) : notFound();
    },

    async listDoctors(specialtyId) {
      return ok(
        specialtyId
          ? DOCTORS.filter(doctor => doctor.specialtyId === specialtyId)
          : DOCTORS,
      );
    },

    async getAvailability(doctorId, dateKey) {
      const now = clock.now();
      return ok(
        generateDaySlots(doctorId, dateKey).map(slot => ({
          startsAt: slot.startsAt,
          available:
            compareLocal(slot.startsAt, now) > 0 &&
            isSlotFree(doctorId, slot.startsAt),
        })),
      );
    },

    async book(request) {
      const doctor = findDemoDoctor(request.doctorId);
      if (!doctor) {
        return err(createAppError('validation', 'Unknown doctor'));
      }
      const validation = validateBookingSelection({
        doctorId: request.doctorId,
        startsAt: request.startsAt,
        now: clock.now(),
        existing: appointments,
      });
      if (!validation.ok || !isSlotFree(request.doctorId, request.startsAt)) {
        return err(
          createAppError('validation', 'Selected slot is not available'),
        );
      }
      const created = buildAppointment({
        id: `apt-new-${sequence++}`,
        doctorId: request.doctorId,
        specialtyId: request.specialtyId,
        startsAt: request.startsAt,
        status: 'confirmed',
        kind: request.kind,
        consultationType: request.consultationType,
        followUpOfVisitId: request.followUpOfVisitId,
      });
      appointments = [...appointments, created];
      notify();
      return ok(created);
    },

    async reschedule(id, startsAt) {
      const current = appointments.find(item => item.id === id);
      if (!current) {
        return notFound();
      }
      const now = clock.now();
      const validation = validateBookingSelection({
        doctorId: current.doctorId,
        startsAt,
        now,
        existing: appointments,
        ignoreAppointmentId: id,
      });
      if (
        getChangeBlockReason(current, now) !== null ||
        !validation.ok ||
        !isSlotFree(current.doctorId, startsAt, id)
      ) {
        return err(
          createAppError('validation', 'Appointment cannot be rescheduled'),
        );
      }
      return replace({ ...current, startsAt });
    },

    async cancel(id) {
      const current = appointments.find(item => item.id === id);
      if (!current) {
        return notFound();
      }
      if (getChangeBlockReason(current, clock.now()) !== null) {
        return err(
          createAppError('validation', 'Appointment cannot be cancelled'),
        );
      }
      return replace({ ...current, status: 'cancelled' });
    },

    async checkIn(id) {
      const current = appointments.find(item => item.id === id);
      if (!current) {
        return notFound();
      }
      if (!canCheckIn(current, clock.now())) {
        return err(createAppError('validation', 'Check-in is not available'));
      }
      return replace({ ...current, status: 'checked_in' });
    },

    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
