import { Pressable, StyleSheet, View } from 'react-native';
import { Icon, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatDate } from '@shared/utilities/localDateTime';
import type { RecordEntry } from '../../../domain/entities/RecordEntry';
import {
  getRecordSummary,
  getRecordTitle,
} from '../../../domain/rules/recordRules';
import { RecordSourceBadge } from '../RecordSourceBadge';

const DOT = 14;

export type RecordTimelineItemProps = {
  readonly entry: RecordEntry;
  readonly isLast: boolean;
  readonly onPress: (id: string) => void;
};

export function RecordTimelineItem({
  entry,
  isLast,
  onPress,
}: RecordTimelineItemProps) {
  const theme = useTheme();
  const summary = getRecordSummary(entry);
  const cardBottomPadding = isLast ? 0 : theme.spacing[3];
  return (
    <View style={[styles.row, { gap: theme.spacing[3] }]}>
      <View style={styles.rail}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                entry.source === 'clinician_confirmed'
                  ? theme.colors.feedback.success.foreground
                  : theme.colors.text.secondary,
            },
          ]}
        />
        {isLast ? null : (
          <View
            style={[
              styles.line,
              { backgroundColor: theme.colors.border.default },
            ]}
          />
        )}
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${translate(
          `records.kind.${entry.kind}`,
        )}. ${getRecordTitle(entry)}. ${formatDate(entry.date)}. ${translate(
          `records.source.${entry.source}`,
        )}`}
        onPress={() => onPress(entry.id)}
        style={[styles.card, { paddingBottom: cardBottomPadding }]}
        testID={`record-${entry.id}`}
      >
        <Card>
          <Typography variant="caption" tone="secondary">
            {formatDate(entry.date)} · {translate(`records.kind.${entry.kind}`)}
          </Typography>
          <Typography variant="bodyStrong">{getRecordTitle(entry)}</Typography>
          {summary ? (
            <Typography variant="caption" tone="secondary" numberOfLines={2}>
              {summary}
            </Typography>
          ) : null}
          <View style={[styles.footer, { gap: theme.spacing[2] }]}>
            <RecordSourceBadge source={entry.source} />
            <View style={styles.spacer} />
            <Icon name="chevron-right" color={theme.colors.text.secondary} />
          </View>
        </Card>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rail: { width: DOT, alignItems: 'center', paddingTop: 6 },
  dot: { width: DOT, height: DOT, borderRadius: DOT / 2 },
  line: { width: 2, flex: 1, marginTop: 4 },
  card: { flex: 1 },
  footer: { flexDirection: 'row', alignItems: 'center' },
  spacer: { flex: 1 },
});
