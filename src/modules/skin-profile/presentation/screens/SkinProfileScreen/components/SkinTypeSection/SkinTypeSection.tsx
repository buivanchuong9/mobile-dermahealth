import { View } from 'react-native';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { SkinTypeSelector } from '../../../../components/SkinTypeSelector';
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
