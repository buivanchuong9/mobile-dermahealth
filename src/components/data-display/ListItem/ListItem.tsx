import { View } from 'react-native';
import { Icon, PressableScale, Typography } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import type { ListItemProps } from './ListItem.types';
import { styles } from './ListItem.styles';

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
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel ?? (subtitle ? `${title}. ${subtitle}` : title)
      }
      onPress={onPress}
      style={rowStyle}
      testID={testID}
    >
      {content}
    </PressableScale>
  ) : (
    <View style={rowStyle} testID={testID}>
      {content}
    </View>
  );
}
