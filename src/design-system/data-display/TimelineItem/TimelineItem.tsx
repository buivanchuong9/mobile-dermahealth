import { StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import { Icon, Typography } from '../../primitives';
import type { IconName } from '../../primitives';
import { useTheme } from '../../theme';

export type TimelineStatus = 'completed' | 'current' | 'upcoming' | 'blocked';

export type TimelineItemProps = {
  readonly status: TimelineStatus;
  /** Spoken and shown next to the title so state is not color-only. */
  readonly statusLabel: string;
  readonly title: string;
  readonly description?: string;
  readonly meta?: string;
  readonly isLast?: boolean;
  readonly children?: ReactNode;
  readonly testID?: string;
};

const DOT_SIZE = 28;

const STATUS_ICON: Record<TimelineStatus, IconName> = {
  completed: 'check',
  current: 'clock',
  upcoming: 'circle',
  blocked: 'lock',
};

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
  const { feedback, text, border, brand } = theme.colors;
  const contentBottomPadding = isLast ? 0 : theme.spacing[5];
  const dot = {
    completed: { background: feedback.success.foreground, icon: text.onBrand },
    current: { background: brand.primary, icon: text.onBrand },
    upcoming: { background: feedback.neutral.background, icon: text.secondary },
    blocked: {
      background: feedback.warning.background,
      icon: feedback.warning.foreground,
    },
  }[status];

  return (
    <View
      accessible
      accessibilityLabel={[title, statusLabel, description, meta]
        .filter(Boolean)
        .join('. ')}
      style={[styles.row, { gap: theme.spacing[3] }]}
      testID={testID}
    >
      <View style={styles.rail}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: dot.background,
              borderColor:
                status === 'upcoming' ? border.default : dot.background,
            },
          ]}
        >
          <Icon
            name={STATUS_ICON[status]}
            size={14}
            color={dot.icon}
            strokeWidth={2.5}
          />
        </View>
        {isLast ? null : (
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  status === 'completed'
                    ? feedback.success.foreground
                    : border.default,
              },
            ]}
          />
        )}
      </View>
      <View
        style={[
          styles.content,
          {
            paddingBottom: contentBottomPadding,
            gap: theme.spacing[1],
          },
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

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rail: { width: DOT_SIZE, alignItems: 'center' },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: { width: 2, flex: 1, marginTop: 4 },
  content: { flex: 1 },
});
