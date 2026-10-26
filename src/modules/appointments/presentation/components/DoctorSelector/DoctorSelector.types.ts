import type { Doctor } from '../../../domain/entities/Appointment';

export type DoctorSelectorProps = {
  readonly doctors: readonly Doctor[];
  readonly value: string | null;
  readonly onChange: (doctorId: string) => void;
  readonly label: string;
  readonly disabled?: boolean;
};
