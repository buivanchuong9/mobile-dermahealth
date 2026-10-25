import { Pressable, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { Icon, Typography } from '../../primitives';
import type { IconName } from '../../primitives';
import { useTheme } from '../../theme';

export type ListItemProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly icon?: IconName;
  /** Replaces the icon (for example an Avatar). */
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly onPress?: () => void;
  readonly accessibilityLabel?: string;
  readonly testID?: string;
};

export function ListItem({
  title,
  subtitle,
  icon,
  leading,
  trailing,
  onPress,
  accessibilityLabel,
  testID,
}: ListItemProps) {
  const theme = useTheme();
  const content = (
    <>
      {leading ??
        (icon ? (
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: theme.colors.feedback.info.background },
            ]}
          >
            <Icon
              name={icon}
              size={20}
              color={theme.colors.feedback.info.foreground}
            />
          </View>
        ) : null)}
      <View style={styles.text}>
        <Typography variant="bodyStrong">{title}</Typography>
        {subtitle ? (
          <Typography variant="caption" tone="secondary">
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {trailing}
      {onPress && !trailing ? (
        <Icon name="chevron-right" color={theme.colors.text.secondary} />
      ) : null}
    </>
  );

  const rowStyle = [
    styles.row,
    { gap: theme.spacing[3], paddingVertical: theme.spacing[2] },
  ];

  return onPress ? (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ?? (subtitle ? `${title}. ${subtitle}` : title)
      }
      onPress={onPress}
      style={({ pressed }) => [rowStyle, pressed && styles.pressed]}
      testID={testID}
    >
      {content}
    </Pressable>
  ) : (
    <View style={rowStyle} testID={testID}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  pressed: { opacity: 0.7 },
});
