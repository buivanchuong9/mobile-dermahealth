import { StyleSheet, View } from 'react-native';
import { Button } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
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
