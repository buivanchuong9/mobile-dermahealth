import type { ConsultationType } from '../../../../model/appointments/Appointment';

export type ConsultationTypeSelectorProps = {
  readonly value: ConsultationType;
  readonly onChange: (value: ConsultationType) => void;
  readonly disabled?: boolean;
};
