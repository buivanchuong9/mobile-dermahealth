import type { LocalDateTime } from '@utils/localDateTime';

export const SPECIALTY_IDS = [
  'general',
  'acne',
  'aesthetic',
  'allergy',
] as const;
export type SpecialtyId = (typeof SPECIALTY_IDS)[number];

export type ConsultationType = 'in_person' | 'video';
export type AppointmentKind = 'new' | 'follow_up';
export type AppointmentStatus =
  | 'confirmed'
  | 'checked_in'
  | 'completed'
  | 'cancelled';

export type Doctor = {
  readonly id: string;
  readonly name: string;
  readonly title: string;
  readonly specialtyId: SpecialtyId;
};

export type Appointment = {
  readonly id: string;
  readonly kind: AppointmentKind;
  readonly consultationType: ConsultationType;
  readonly specialtyId: SpecialtyId;
  readonly doctorId: string;
  readonly doctorName: string;
  readonly clinicName: string;
  readonly clinicAddress: string;
  readonly department: string;
  /** Room or counter; empty for video consultations. */
  readonly room: string;
  readonly startsAt: LocalDateTime;
  readonly status: AppointmentStatus;
  readonly preparation: readonly string[];
  /** Set when this appointment follows up an earlier visit. */
  readonly followUpOfVisitId?: string;
};

export type TimeSlot = {
  readonly startsAt: LocalDateTime;
  readonly available: boolean;
};

export type BookingRequest = {
  readonly doctorId: string;
  readonly specialtyId: SpecialtyId;
  readonly consultationType: ConsultationType;
  readonly startsAt: LocalDateTime;
  readonly kind: AppointmentKind;
  readonly followUpOfVisitId?: string;
};
