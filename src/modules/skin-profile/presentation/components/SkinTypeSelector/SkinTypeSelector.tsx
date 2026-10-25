import { View } from 'react-native';
import { SelectableCard } from '@design-system/inputs';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { SKIN_TYPES } from '../../../domain/value-objects/SkinType';
import type { SkinType } from '../../../domain/value-objects/SkinType';

export type SkinTypeSelectorProps = {
  readonly value: SkinType | null;
  readonly onChange: (value: SkinType) => void;
  readonly errorMessage?: string;
  readonly disabled?: boolean;
};

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
