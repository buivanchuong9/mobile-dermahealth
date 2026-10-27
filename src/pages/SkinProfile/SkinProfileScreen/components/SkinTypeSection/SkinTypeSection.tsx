import { View } from 'react-native';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { SkinTypeSelector } from '../../../partials/SkinTypeSelector';
import type { SkinTypeSectionProps } from './SkinTypeSection.types';

export function SkinTypeSection({
  value,
  onChange,
  showRequiredError,
  disabled,
}: SkinTypeSectionProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[2] }}>
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('skinProfile.skinType.title')}
      </Typography>
      <SkinTypeSelector
        value={value}
        onChange={onChange}
        disabled={disabled}
        errorMessage={
          showRequiredError
            ? translate('skinProfile.messages.skinTypeRequired')
            : undefined
        }
      />
    </View>
  );
}
