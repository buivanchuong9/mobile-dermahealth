import type { AppError, Result } from '@model/common';
import type { LocalDateKey, LocalDateTime } from '@utils/localDateTime';
import type {
  Appointment,
  BookingRequest,
  Doctor,
  SpecialtyId,
  TimeSlot,
} from './Appointment';

export interface AppointmentRepository {
  list(): Promise<Result<readonly Appointment[], AppError>>;
  get(id: string): Promise<Result<Appointment, AppError>>;
  listDoctors(
    specialtyId?: SpecialtyId,
  ): Promise<Result<readonly Doctor[], AppError>>;
  getAvailability(
    doctorId: string,
    dateKey: LocalDateKey,
  ): Promise<Result<readonly TimeSlot[], AppError>>;
  book(request: BookingRequest): Promise<Result<Appointment, AppError>>;
  reschedule(
    id: string,
    startsAt: LocalDateTime,
  ): Promise<Result<Appointment, AppError>>;
  cancel(id: string): Promise<Result<Appointment, AppError>>;
  checkIn(id: string): Promise<Result<Appointment, AppError>>;
  /** Notifies after every change; returns an unsubscribe function. */
  subscribe(listener: () => void): () => void;
}
