import { View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import type { StatusTone } from '@design-system/data-display';
import { Banner } from '@design-system/feedback';
import { Button, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type {
  AssessmentResult,
  FitLevel,
  Urgency,
} from '../../../domain/entities/Assessment';

const URGENCY_TONE: Record<Urgency, StatusTone> = {
  routine: 'info',
  soon: 'warning',
  prompt: 'danger',
};

const FIT_TONE: Record<FitLevel, StatusTone> = {
  low: 'neutral',
  moderate: 'info',
  high: 'warning',
};

export type ResultStepProps = {
  readonly result: AssessmentResult;
  readonly onBookAppointment: (
    specialtyId: AssessmentResult['suggestedSpecialtyId'],
  ) => void;
  readonly onViewHistory: () => void;
  readonly onStartOver: () => void;
};

export function ResultStep({
  result,
  onBookAppointment,
  onViewHistory,
  onStartOver,
}: ResultStepProps) {
  const theme = useTheme();
  return (
    <>
      <Banner
        tone="warning"
        message={translate('assessment.result.banner')}
        testID="assessment-result-banner"
      />
      <Banner
        tone={URGENCY_TONE[result.urgency]}
        icon="stethoscope"
        title={translate(`assessment.result.urgency.${result.urgency}.title`)}
        message={translate(`assessment.result.urgency.${result.urgency}.body`)}
        testID="assessment-urgency"
      />

      <Typography variant="subtitle" accessibilityRole="header">
        {translate('assessment.result.findingsTitle')}
      </Typography>
      {result.findings.map(finding => (
        <Card key={finding.id} testID={`finding-${finding.id}`}>
          <View style={{ gap: theme.spacing[2] }}>
            <Typography variant="bodyStrong">
              {translate(`assessment.result.findings.${finding.id}.title`)}
            </Typography>
            <StatusBadge
              label={translate(`assessment.result.fit.${finding.fit}`)}
              tone={FIT_TONE[finding.fit]}
              icon="info"
            />
            <Typography variant="caption" tone="secondary">
              {translate(
                `assessment.result.findings.${finding.id}.explanation`,
              )}
            </Typography>
          </View>
        </Card>
      ))}

      <Card>
        <Typography variant="bodyStrong">
          {translate('assessment.result.uncertaintyTitle')}
        </Typography>
        <Typography variant="caption" tone="secondary">
          {translate('assessment.result.uncertainty')}
        </Typography>
      </Card>

      <View style={{ gap: theme.spacing[2] }}>
        <Button
          label={translate('assessment.result.bookAppointment', {
            specialty: translate(
              `appointments.specialty.${result.suggestedSpecialtyId}`,
            ),
          })}
          onPress={() => onBookAppointment(result.suggestedSpecialtyId)}
          fullWidth
          size="lg"
          testID="assessment-book"
        />
        <Button
          label={translate('assessment.result.viewHistory')}
          variant="secondary"
          onPress={onViewHistory}
          fullWidth
          testID="assessment-view-history"
        />
        <Button
          label={translate('assessment.result.startOver')}
          variant="ghost"
          onPress={onStartOver}
          fullWidth
          testID="assessment-start-over"
        />
      </View>
      <Typography variant="caption" tone="secondary">
        {translate('assessment.result.disclaimer')}
      </Typography>
    </>
  );
}
