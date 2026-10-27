import type { Doctor } from '../../../../model/appointments/Appointment';

export type DoctorSelectorProps = {
  readonly doctors: readonly Doctor[];
  readonly value: string | null;
  readonly onChange: (doctorId: string) => void;
  readonly label: string;
  readonly disabled?: boolean;
};
