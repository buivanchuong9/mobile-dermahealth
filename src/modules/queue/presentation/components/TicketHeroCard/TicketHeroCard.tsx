import { Animated, View } from 'react-native';
import { StatusBadge } from '@design-system/data-display';
import { Icon, Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import { useStageFlash } from './TicketHeroCard.animations';
import { STAGE_PRESENTATION } from './TicketHeroCard.constants';
import { styles } from './TicketHeroCard.styles';
import type { TicketHeroCardProps } from './TicketHeroCard.types';

export function TicketHeroCard({ snapshot }: TicketHeroCardProps) {
  const theme = useTheme();
  const opacity = useStageFlash(snapshot.stage);
  const { tone, icon } = STAGE_PRESENTATION[snapshot.stage];

  return (
    <View
      accessible
      accessibilityLabel={`${translate('queue.yourTicket')} ${
        snapshot.ticket.number
      }. ${translate(`queue.stage.${snapshot.stage}`)}`}
      style={[
        styles.card,
        {
          padding: theme.spacing[5],
          gap: theme.spacing[3],
          borderRadius: theme.radius.xl,
          backgroundColor: theme.colors.brand.primaryDark,
        },
      ]}
      testID="queue-ticket"
    >
      <Typography variant="caption" tone="onBrand">
        {translate('queue.yourTicket')}
      </Typography>
      <Animated.Text
        style={[styles.number, { color: theme.colors.text.onBrand, opacity }]}
      >
        {snapshot.ticket.number}
      </Animated.Text>
      <StatusBadge
        label={translate(`queue.stage.${snapshot.stage}`)}
        tone={tone}
        icon={icon}
        testID="queue-stage"
      />
      <View style={{ gap: theme.spacing[1] }}>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon name="building-2" size={16} color={theme.colors.text.onBrand} />
          <Typography variant="caption" tone="onBrand">
            {snapshot.ticket.clinicName}
          </Typography>
        </View>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon name="door-open" size={16} color={theme.colors.text.onBrand} />
          <Typography variant="caption" tone="onBrand">
            {snapshot.ticket.department} · {snapshot.ticket.room}
          </Typography>
        </View>
        <View style={[styles.row, { gap: theme.spacing[2] }]}>
          <Icon name="clock" size={16} color={theme.colors.text.onBrand} />
          <Typography variant="caption" tone="onBrand">
            {translate('queue.lastUpdated', {
              time: formatTime(snapshot.lastUpdatedAt),
            })}
          </Typography>
        </View>
      </View>
    </View>
  );
}
