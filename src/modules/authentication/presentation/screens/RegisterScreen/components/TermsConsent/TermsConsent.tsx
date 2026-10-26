import { View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { TermsConsentProps } from './TermsConsent.types';

/** Required acknowledgement that this build is a simulation. */
export function TermsConsent({
  accepted,
  showError,
  disabled,
  onToggle,
}: TermsConsentProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[1] }}>
      <SelectableCard
        role="checkbox"
        label={translate('auth.register.terms')}
        selected={accepted}
        disabled={disabled}
        onPress={onToggle}
        testID="register-terms"
      />
      {showError ? (
        <Typography variant="caption" tone="error" accessibilityRole="alert">
          {translate('auth.issues.terms_required')}
        </Typography>
      ) : null}
    </View>
  );
}
