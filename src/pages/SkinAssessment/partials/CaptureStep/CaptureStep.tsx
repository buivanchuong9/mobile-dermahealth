import { StyleSheet, View } from 'react-native';
import { Banner } from '@components/feedback';
import { Button, Icon, Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { CaptureStepProps } from './CaptureStep.types';

export function CaptureStep({
  samplePhoto,
  onChooseSample,
  onRemoveSample,
  onContinue,
}: CaptureStepProps) {
  const theme = useTheme();
  return (
    <>
      <Banner tone="info" message={translate('assessment.capture.intro')} />
      <Card>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate('assessment.capture.tipsTitle')}
        </Typography>
        <View style={{ gap: theme.spacing[2] }}>
          <Typography>• {translate('assessment.capture.tip1')}</Typography>
          <Typography>• {translate('assessment.capture.tip2')}</Typography>
          <Typography>• {translate('assessment.capture.tip3')}</Typography>
        </View>
      </Card>

      {samplePhoto ? (
        <Card testID="assessment-sample">
          <View
            accessible
            accessibilityLabel={`${translate(
              'assessment.capture.sample',
            )}. ${translate('assessment.capture.sampleNote')}`}
            style={[
              styles.placeholder,
              {
                borderRadius: theme.radius.md,
                backgroundColor: theme.colors.feedback.neutral.background,
                borderColor: theme.colors.border.default,
              },
            ]}
          >
            <Icon name="image" size={40} color={theme.colors.text.secondary} />
            <Typography variant="bodyStrong">
              {translate('assessment.capture.sample')}
            </Typography>
          </View>
          <Typography variant="caption" tone="secondary">
            {translate('assessment.capture.sampleNote')}
          </Typography>
          <Button
            label={translate('assessment.capture.removeSample')}
            variant="ghost"
            size="sm"
            onPress={onRemoveSample}
          />
        </Card>
      ) : (
        <View style={{ gap: theme.spacing[2] }}>
          <Button
            label={translate('assessment.capture.takePhoto')}
            variant="secondary"
            onPress={onChooseSample}
            fullWidth
            testID="assessment-take-photo"
          />
          <Button
            label={translate('assessment.capture.pickPhoto')}
            variant="secondary"
            onPress={onChooseSample}
            fullWidth
            testID="assessment-pick-photo"
          />
        </View>
      )}

      <Button
        label={translate(
          samplePhoto
            ? 'assessment.capture.continue'
            : 'assessment.capture.skip',
        )}
        onPress={onContinue}
        fullWidth
        size="lg"
        testID="assessment-capture-continue"
      />
    </>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
});
