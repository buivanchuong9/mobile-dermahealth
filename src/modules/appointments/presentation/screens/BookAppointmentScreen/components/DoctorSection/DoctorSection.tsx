import { Skeleton } from '@design-system/feedback';
import { Typography } from '@design-system/primitives';
import { translate } from '@shared/localization';
import { DoctorSelector } from '../../../../components/DoctorSelector';
import { BookingSection } from '../BookingSection';
import type { DoctorSectionProps } from './DoctorSection.types';

export function DoctorSection({
  doctors,
  selectedDoctorId,
  onSelect,
  showMissingDoctorIssue,
  disabled,
}: DoctorSectionProps) {
  const title = translate('appointments.booking.doctorSection');
  return (
    <BookingSection title={title}>
      {doctors === null ? (
        <Skeleton height={64} />
      ) : (
        <DoctorSelector
          doctors={doctors}
          value={selectedDoctorId}
          onChange={onSelect}
          label={title}
          disabled={disabled}
        />
      )}
      {showMissingDoctorIssue ? (
        <Typography variant="caption" tone="error" accessibilityRole="alert">
          {translate('appointments.booking.issues.missing_doctor')}
        </Typography>
      ) : null}
    </BookingSection>
  );
}
