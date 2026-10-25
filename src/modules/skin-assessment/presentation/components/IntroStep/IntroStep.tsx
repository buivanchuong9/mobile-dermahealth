import { View } from 'react-native';
import { Banner } from '@design-system/feedback';
import { SelectableCard } from '@design-system/inputs';
import { Button, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';

export type IntroStepProps = {
  readonly consent: boolean;
  readonly consentMissing: boolean;
  readonly onToggleConsent: (value: boolean) => void;
  readonly onStart: () => void;
};

export function IntroStep({
  consent,
  consentMissing,
  onToggleConsent,
  onStart,
}: IntroStepProps) {
  const theme = useTheme();
  return (
    <>
      <Typography>{translate('assessment.intro.body')}</Typography>
      <Banner
        tone="warning"
        message={translate('assessment.result.disclaimer')}
      />
      <Card>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate('assessment.intro.limitsTitle')}
        </Typography>
        <View style={{ gap: theme.spacing[2] }}>
          <Typography>• {translate('assessment.intro.limit1')}</Typography>
          <Typography>• {translate('assessment.intro.limit2')}</Typography>
          <Typography>• {translate('assessment.intro.limit3')}</Typography>
        </View>
      </Card>
      <View style={{ gap: theme.spacing[1] }}>
        <SelectableCard
          role="checkbox"
          label={translate('assessment.intro.consent')}
          selected={consent}
          onPress={() => onToggleConsent(!consent)}
          testID="assessment-consent"
        />
        {consentMissing ? (
          <Typography variant="caption" tone="error" accessibilityRole="alert">
            {translate('assessment.intro.consentRequired')}
          </Typography>
        ) : null}
      </View>
      <Button
        label={translate('assessment.intro.start')}
        onPress={onStart}
        fullWidth
        size="lg"
        testID="assessment-start"
      />
    </>
  );
}
