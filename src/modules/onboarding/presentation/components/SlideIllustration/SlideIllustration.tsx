import { StyleSheet, View } from 'react-native';
import { Icon } from '@design-system/primitives';
import type { IconName } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';

export type SlideIllustrationProps = {
  readonly icon: IconName;
  readonly secondaryIcons: readonly [IconName, IconName];
};

const MAIN_SIZE = 168;
const SATELLITE_SIZE = 56;

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

const styles = StyleSheet.create({
  stage: {
    width: MAIN_SIZE + SATELLITE_SIZE,
    height: MAIN_SIZE + SATELLITE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    width: MAIN_SIZE,
    height: MAIN_SIZE,
    borderRadius: MAIN_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  satellite: {
    position: 'absolute',
    width: SATELLITE_SIZE,
    height: SATELLITE_SIZE,
    borderRadius: SATELLITE_SIZE / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: { top: 8, right: 0 },
  bottomLeft: { bottom: 8, left: 0 },
});
