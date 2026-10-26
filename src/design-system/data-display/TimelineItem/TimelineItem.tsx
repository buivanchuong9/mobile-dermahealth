import { View } from 'react-native';
import { Typography } from '../../primitives';
import { useTheme } from '../../theme';
import { TimelineRail } from './components/TimelineRail';
import { styles } from './TimelineItem.styles';
import type { TimelineItemProps } from './TimelineItem.types';

export function TimelineItem({
  status,
  statusLabel,
  title,
  description,
  meta,
  isLast = false,
  children,
  testID,
}: TimelineItemProps) {
  const theme = useTheme();
  const contentBottomPadding = isLast ? 0 : theme.spacing[5];

  return (
    <View
      accessible
      accessibilityLabel={[title, statusLabel, description, meta]
        .filter(Boolean)
        .join('. ')}
      style={[styles.row, { gap: theme.spacing[3] }]}
      testID={testID}
    >
      <TimelineRail status={status} isLast={isLast} />
      <View
        style={[
          styles.content,
          { paddingBottom: contentBottomPadding, gap: theme.spacing[1] },
        ]}
      >
        <Typography
          variant="bodyStrong"
          tone={status === 'upcoming' ? 'secondary' : 'primary'}
        >
          {title}
        </Typography>
        <Typography
          variant="caption"
          tone={status === 'blocked' ? 'primary' : 'secondary'}
        >
          {statusLabel}
        </Typography>
        {description ? <Typography>{description}</Typography> : null}
        {meta ? (
          <Typography variant="caption" tone="secondary">
            {meta}
          </Typography>
        ) : null}
        {children}
      </View>
    </View>
  );
}
