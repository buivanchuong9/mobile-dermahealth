import { View } from 'react-native';
import { Icon, PressableScale, Typography } from '@components/primitives';
import { Card } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { formatDate } from '@utils/localDateTime';
import {
  getRecordSummary,
  getRecordTitle,
} from '../../../../utils/medicalRecords/recordRules';
import { RecordSourceBadge } from '../RecordSourceBadge';
import type { RecordTimelineItemProps } from './RecordTimelineItem.types';
import { styles } from './RecordTimelineItem.styles';

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
      <PressableScale
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
      </PressableScale>
    </View>
  );
}
