import { Text, View } from 'react-native';
import { useTheme } from '../../../styles/theme';
import type { ChipProps } from './Chip.types';

/** Small read-only label for a value (not interactive). */
export function Chip({ label, testID }: ChipProps) {
  const theme = useTheme();
  return (
    <View
      testID={testID}
      style={{
        paddingHorizontal: theme.spacing[3],
        paddingVertical: theme.spacing[1],
        borderRadius: theme.radius.pill,
        backgroundColor: theme.colors.brand.primaryLight,
      }}
    >
      <Text
        style={[
          theme.typography.caption,
          { color: theme.colors.text.onBrandLight },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
