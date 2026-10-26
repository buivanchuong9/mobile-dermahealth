import { View } from 'react-native';
import { translate } from '@shared/localization';
import { useTheme } from '../../theme';
import type { SkeletonGroupProps } from './SkeletonGroup.types';

/**
 * Wraps placeholder shapes so a screen reader hears one "loading" message
 * instead of every block; the shapes themselves are hidden from it.
 */
export function SkeletonGroup({
  children,
  label,
  gap,
  style,
  testID,
}: SkeletonGroupProps) {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? translate('common.loadingContent')}
      accessibilityState={{ busy: true }}
      style={[{ gap: gap ?? theme.spacing[3] }, style]}
      testID={testID}
    >
      {children}
    </View>
  );
}
