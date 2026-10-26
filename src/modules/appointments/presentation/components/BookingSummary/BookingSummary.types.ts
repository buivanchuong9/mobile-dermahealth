import type { LocalDateTime } from '@shared/utilities/localDateTime';
import type {
  ConsultationType,
  Doctor,
} from '../../../domain/entities/Appointment';

export type BookingSummaryProps = {
  readonly doctor: Doctor | null;
  readonly startsAt: LocalDateTime | null;
  readonly consultationType: ConsultationType;
};
