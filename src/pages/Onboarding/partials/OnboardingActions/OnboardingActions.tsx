import { StyleSheet, View } from 'react-native';
import { Button } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { OnboardingActionsProps } from './OnboardingActions.types';

export function OnboardingActions({
  canGoBack,
  isLast,
  onBack,
  onNext,
  onFinish,
}: OnboardingActionsProps) {
  const theme = useTheme();
  return (
    <View style={[styles.row, { gap: theme.spacing[2] }]}>
      <View style={styles.action}>
        <Button
          label={translate('onboarding.back')}
          variant="secondary"
          onPress={onBack}
          disabled={!canGoBack}
          fullWidth
          testID="onboarding-back"
        />
      </View>
      <View style={styles.action}>
        <Button
          label={translate(isLast ? 'onboarding.start' : 'onboarding.next')}
          onPress={isLast ? onFinish : onNext}
          fullWidth
          testID="onboarding-next"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  action: { flex: 1 },
});
