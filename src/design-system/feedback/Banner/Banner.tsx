import { Pressable, StyleSheet, View } from 'react-native';
import { translate } from '@shared/localization';
import { Icon, Typography } from '../../primitives';
import { useTheme } from '../../theme';
import type { BannerProps } from './Banner.types';
import { DEFAULT_ICON } from './Banner.constants';

export function Banner({
  message,
  title,
  tone = 'info',
  icon,
  onDismiss,
  testID,
}: BannerProps) {
  const theme = useTheme();
  const palette = theme.colors.feedback[tone];
  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.row,
        {
          gap: theme.spacing[3],
          padding: theme.spacing[3],
          borderRadius: theme.radius.md,
          backgroundColor: palette.background,
        },
      ]}
      testID={testID}
    >
      <Icon
        name={icon ?? DEFAULT_ICON[tone]}
        size={20}
        color={palette.foreground}
      />
      <View style={styles.text}>
        {title ? <Typography variant="bodyStrong">{title}</Typography> : null}
        <Typography variant="caption">{message}</Typography>
      </View>
      {onDismiss ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={translate('common.close')}
          hitSlop={12}
          onPress={onDismiss}
        >
          <Icon name="x" size={18} color={palette.foreground} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  text: { flex: 1 },
});
