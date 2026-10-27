import type { LocalDateTime } from '@utils/localDateTime';
import type {
  ConsultationType,
  Doctor,
} from '../../../../model/appointments/Appointment';

export type BookingSummaryProps = {
  readonly doctor: Doctor | null;
  readonly startsAt: LocalDateTime | null;
  readonly consultationType: ConsultationType;
};
