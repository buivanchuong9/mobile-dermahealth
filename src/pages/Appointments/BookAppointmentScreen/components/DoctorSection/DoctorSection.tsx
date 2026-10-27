import { SkeletonGroup, SkeletonRow } from '@components/feedback';
import { Typography } from '@components/primitives';
import { translate } from '@i18n';
import { DoctorSelector } from '../../../partials/DoctorSelector';
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
        <SkeletonGroup>
          <SkeletonRow lines={2} />
          <SkeletonRow lines={2} />
        </SkeletonGroup>
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
