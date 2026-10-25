import { StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import { useTheme } from '../../theme';

export type CardProps = {
  readonly children: ReactNode;
  readonly testID?: string;
};

/** Bordered white surface used to group related content. */
export function Card({ children, testID }: CardProps) {
  const theme = useTheme();
  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          padding: theme.spacing[4],
          gap: theme.spacing[3],
          borderRadius: theme.radius.lg,
          borderColor: theme.colors.border.default,
          backgroundColor: theme.colors.surface.primary,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({ card: { borderWidth: 1 } });
