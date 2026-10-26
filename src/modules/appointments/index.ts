export { createMockAppointmentRepository } from './data/repositories/createMockAppointmentRepository';
export type {
  Appointment,
  AppointmentKind,
  AppointmentStatus,
  BookingRequest,
  ConsultationType,
  Doctor,
  SpecialtyId,
} from './domain/entities/Appointment';
export type { AppointmentRepository } from './domain/repositories/AppointmentRepository';
export {
  belongsToTab,
  canCheckIn,
  isActive,
  pickNextAppointment,
} from './domain/rules/appointmentRules';
export { AppointmentCard } from './presentation/components/AppointmentCard';
export { formatAppointmentWhen } from './presentation/formatters';
export type { BookingMode } from './presentation/hooks/useBookingForm.types';
export { AppointmentDetailScreen } from './presentation/screens/AppointmentDetailScreen';
export { AppointmentListScreen } from './presentation/screens/AppointmentListScreen';
export { BookAppointmentScreen } from './presentation/screens/BookAppointmentScreen';
export { BookingConfirmationScreen } from './presentation/screens/BookingConfirmationScreen';
