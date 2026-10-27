import type { SpecialtyId } from '../../../../model/appointments/Appointment';

export type SpecialtySelectorProps = {
  readonly value: SpecialtyId;
  readonly onChange: (value: SpecialtyId) => void;
  readonly disabled?: boolean;
};
