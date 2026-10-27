import { View } from 'react-native';
import { SelectableCard } from '@components/inputs';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { SKIN_TYPES } from '../../../../model/skinProfile/SkinType';
import type { SkinTypeSelectorProps } from './SkinTypeSelector.types';

export function SkinTypeSelector({
  value,
  onChange,
  errorMessage,
  disabled = false,
}: SkinTypeSelectorProps) {
  const theme = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={translate('skinProfile.skinType.title')}
      style={{ gap: theme.spacing[2] }}
    >
      {SKIN_TYPES.map(skinType => (
        <SelectableCard
          key={skinType}
          role="radio"
          label={translate(`skinProfile.skinType.options.${skinType}.label`)}
          description={translate(
            `skinProfile.skinType.options.${skinType}.description`,
          )}
          selected={value === skinType}
          disabled={disabled}
          onPress={() => onChange(skinType)}
          testID={`skin-type-${skinType}`}
        />
      ))}
      {errorMessage ? (
        <Typography
          variant="caption"
          tone="error"
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {errorMessage}
        </Typography>
      ) : null}
    </View>
  );
}
