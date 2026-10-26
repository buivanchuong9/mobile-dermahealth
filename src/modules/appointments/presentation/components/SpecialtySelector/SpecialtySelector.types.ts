import type { SpecialtyId } from '../../../domain/entities/Appointment';

export type SpecialtySelectorProps = {
  readonly value: SpecialtyId;
  readonly onChange: (value: SpecialtyId) => void;
  readonly disabled?: boolean;
};
