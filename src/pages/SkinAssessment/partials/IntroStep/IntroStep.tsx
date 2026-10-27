import { View } from 'react-native';
import { Banner } from '@components/feedback';
import { SelectableCard } from '@components/inputs';
import { Button, Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { IntroStepProps } from './IntroStep.types';

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
