import { Pressable, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import { translate } from '@shared/localization';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { Icon, Typography } from '../../primitives';
import { useTheme } from '../../theme';

export type ScreenHeaderProps = {
  readonly title: string;
  readonly subtitle?: string;
  /** Shows a back button when provided. */
  readonly onBack?: () => void;
  readonly right?: ReactNode;
};

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: ScreenHeaderProps) {
  const theme = useTheme();
  return (
    <View style={[styles.row, { gap: theme.spacing[2] }]}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={translate('common.back')}
          onPress={onBack}
          style={[
            styles.back,
            {
              borderRadius: theme.radius.pill,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.default,
            },
          ]}
          testID="header-back"
        >
          <Icon name="arrow-left" size={22} />
        </Pressable>
      ) : null}
      <View style={styles.titles}>
        <Typography
          variant="title"
          accessibilityRole="header"
          numberOfLines={2}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="caption" tone="secondary">
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  back: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  titles: { flex: 1 },
});
