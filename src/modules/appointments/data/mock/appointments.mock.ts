import { DEMO_CLINIC, findDemoDoctor } from '@core/demo';
import {
  addMinutes,
  toDateKey,
  addDays,
} from '@shared/utilities/localDateTime';
import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type {
  Appointment,
  AppointmentKind,
  AppointmentStatus,
  ConsultationType,
  SpecialtyId,
} from '../../domain/entities/Appointment';

export const STANDARD_PREPARATION: readonly string[] = [
  'Đến trước giờ hẹn khoảng 15 phút để làm thủ tục.',
  'Mang theo giấy tờ tùy thân và các đơn thuốc hoặc kết quả khám gần nhất, nếu có.',
  'Liên hệ phòng khám sớm nếu cần đổi giờ hẹn.',
];

export const VIDEO_PREPARATION: readonly string[] = [
  'Kiểm tra kết nối mạng và chọn nơi đủ sáng, yên tĩnh.',
  'Chuẩn bị sẵn các đơn thuốc hoặc kết quả khám gần nhất, nếu có.',
];

type SeedInput = {
  readonly id: string;
  readonly doctorId: string;
  readonly specialtyId: SpecialtyId;
  readonly startsAt: LocalDateTime;
  readonly status: AppointmentStatus;
  readonly kind?: AppointmentKind;
  readonly consultationType?: ConsultationType;
  readonly followUpOfVisitId?: string;
};

export function buildAppointment(input: SeedInput): Appointment {
  const doctor = findDemoDoctor(input.doctorId);
  const consultationType = input.consultationType ?? 'in_person';
  return {
    id: input.id,
    kind: input.kind ?? 'new',
    consultationType,
    specialtyId: input.specialtyId,
    doctorId: input.doctorId,
    doctorName: doctor?.name ?? 'Bác sĩ',
    clinicName: DEMO_CLINIC.name,
    clinicAddress: DEMO_CLINIC.address,
    department: DEMO_CLINIC.department,
    room: consultationType === 'in_person' ? 'Phòng 302, tầng 3, khu B' : '',
    startsAt: input.startsAt,
    status: input.status,
    preparation:
      consultationType === 'in_person'
        ? STANDARD_PREPARATION
        : VIDEO_PREPARATION,
    ...(input.followUpOfVisitId
      ? { followUpOfVisitId: input.followUpOfVisitId }
      : {}),
  };
}

/** Appointments relative to the demo "today" (a Monday). */
export function createSeedAppointments(now: LocalDateTime): Appointment[] {
  const today = toDateKey(now);
  const day = (offset: number, time: string): LocalDateTime =>
    `${addDays(today, offset)}T${time}`;

  return [
    buildAppointment({
      id: 'apt-today',
      doctorId: 'doctor-lan',
      specialtyId: 'general',
      startsAt: day(0, '09:30'),
      status: 'confirmed',
    }),
    buildAppointment({
      id: 'apt-acne-review',
      doctorId: 'doctor-minh',
      specialtyId: 'acne',
      startsAt: day(3, '14:00'),
      status: 'confirmed',
    }),
    buildAppointment({
      id: 'apt-follow-up',
      doctorId: 'doctor-lan',
      specialtyId: 'general',
      startsAt: day(21, '10:00'),
      status: 'confirmed',
      kind: 'follow_up',
      followUpOfVisitId: 'visit-2026-09-12',
    }),
    buildAppointment({
      id: 'apt-past-1',
      doctorId: 'doctor-lan',
      specialtyId: 'general',
      startsAt: day(-44, '09:00'),
      status: 'completed',
    }),
    buildAppointment({
      id: 'apt-past-2',
      doctorId: 'doctor-minh',
      specialtyId: 'acne',
      startsAt: day(-115, '15:30'),
      status: 'completed',
    }),
    buildAppointment({
      id: 'apt-past-cancelled',
      doctorId: 'doctor-hoa',
      specialtyId: 'allergy',
      startsAt: addMinutes(day(-70, '11:00'), 0),
      status: 'cancelled',
    }),
  ];
}
