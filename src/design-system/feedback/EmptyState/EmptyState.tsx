import { StyleSheet, View } from 'react-native';
import { Button, Icon, Typography } from '../../primitives';
import { useTheme } from '../../theme';
import type { EmptyStateProps } from './EmptyState.types';

/** Used for empty lists, unavailable features and recoverable errors. */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  testID,
}: EmptyStateProps) {
  const theme = useTheme();
  return (
    <View
      accessible
      accessibilityLabel={description ? `${title}. ${description}` : title}
      style={[
        styles.container,
        { gap: theme.spacing[3], padding: theme.spacing[5] },
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: theme.colors.feedback.info.background },
        ]}
      >
        <Icon
          name={icon}
          size={28}
          color={theme.colors.feedback.info.foreground}
        />
      </View>
      <Typography variant="subtitle" align="center">
        {title}
      </Typography>
      {description ? (
        <Typography tone="secondary" align="center">
          {description}
        </Typography>
      ) : null}
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
