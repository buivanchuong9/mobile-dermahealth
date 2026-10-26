import { View } from 'react-native';
import { Icon } from '../../../../primitives';
import { useTheme } from '../../../../theme';
import { STATUS_ICON } from './TimelineRail.constants';
import { styles } from './TimelineRail.styles';
import type { TimelineRailProps } from './TimelineRail.types';

/** Status dot (icon, so state is not color-only) and the connecting line. */
export function TimelineRail({ status, isLast }: TimelineRailProps) {
  const theme = useTheme();
  const { feedback, text, border, brand } = theme.colors;
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
  );
}
