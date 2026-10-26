import { View } from 'react-native';
import { Icon } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import type { SlideIllustrationProps } from './SlideIllustration.types';
import { styles } from './SlideIllustration.styles';

/** Decorative native illustration: a large icon with two small satellites. */
export function SlideIllustration({
  icon,
  secondaryIcons,
}: SlideIllustrationProps) {
  const theme = useTheme();
  const { feedback, brand, surface, border } = theme.colors;
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={styles.stage}
    >
      <View
        style={[styles.main, { backgroundColor: feedback.info.background }]}
      >
        <Icon name={icon} size={72} color={brand.primary} strokeWidth={1.75} />
      </View>
      {secondaryIcons.map((name, index) => (
        <View
          key={name}
          style={[
            styles.satellite,
            index === 0 ? styles.topRight : styles.bottomLeft,
            { backgroundColor: surface.primary, borderColor: border.default },
          ]}
        >
          <Icon name={name} size={24} color={feedback.info.foreground} />
        </View>
      ))}
    </View>
  );
}
