import type { Doctor } from '../../../../../model/appointments/Appointment';

export type DoctorSectionProps = {
  /** `null` while the list is loading. */
  readonly doctors: readonly Doctor[] | null;
  readonly selectedDoctorId: string | null;
  readonly onSelect: (doctorId: string) => void;
  readonly showMissingDoctorIssue: boolean;
  readonly disabled: boolean;
};
