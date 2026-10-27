import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../styles/theme';
import type { AvatarProps } from './Avatar.types';

/** First letter of the first and last word: "Hoàng Minh" -> "HM". */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) {
    return '';
  }
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1]?.[0] ?? '' : '';
  return `${first}${last}`.toUpperCase();
}

export function Avatar({ name, size = 44 }: AvatarProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.feedback.info.background,
        },
      ]}
    >
      <Text
        style={[
          theme.typography.bodyStrong,
          {
            color: theme.colors.feedback.info.foreground,
            fontSize: size * 0.38,
          },
        ]}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
