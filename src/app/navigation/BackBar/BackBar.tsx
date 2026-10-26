import { StyleSheet, View } from 'react-native';
import { Button } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { BackBarProps } from './BackBar.types';

export function BackBar({ onPress }: BackBarProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.bar,
        {
          paddingHorizontal: theme.spacing[3],
          paddingTop: theme.spacing[2],
        },
      ]}
    >
      <Button
        label={`‹ ${translate('common.back')}`}
        accessibilityLabel={translate('common.back')}
        variant="ghost"
        size="sm"
        onPress={onPress}
        testID="back-button"
      />
    </View>
  );
}

const styles = StyleSheet.create({ bar: { alignItems: 'flex-start' } });
