import type { ConsultationType } from '../../../domain/entities/Appointment';

export type ConsultationTypeSelectorProps = {
  readonly value: ConsultationType;
  readonly onChange: (value: ConsultationType) => void;
  readonly disabled?: boolean;
};
