import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../../styles/theme';
import type { HeroPanelProps } from './HeroPanel.types';

/** Flat warm panel that frames an illustration. */
export function HeroPanel({ children, style }: HeroPanelProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.root,
        {
          borderRadius: theme.radius.xl,
          padding: theme.spacing[4],
          backgroundColor: theme.colors.feedback.neutral.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
});
