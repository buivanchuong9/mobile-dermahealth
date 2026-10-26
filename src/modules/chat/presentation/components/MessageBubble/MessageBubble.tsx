import { View } from 'react-native';
import { FadeInView } from '@design-system/motion';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import { styles } from './MessageBubble.styles';
import type { MessageBubbleProps } from './MessageBubble.types';

export function MessageBubble({
  message,
  animate = false,
}: MessageBubbleProps) {
  const theme = useTheme();
  const mine = message.sender === 'patient';
  const background = mine
    ? theme.colors.brand.primary
    : theme.colors.surface.primary;
  const border = mine
    ? theme.colors.brand.primary
    : theme.colors.border.default;
  const time = formatTime(message.sentAt);
  const meta = mine
    ? `${time} · ${translate(`chat.status.${message.status}`)}`
    : `${translate('chat.sender.doctor_simulated')} · ${time}`;

  const bubble = (
    <View
      accessible
      accessibilityLabel={`${translate(`chat.sender.${message.sender}`)}: ${
        message.text
      }. ${meta}`}
      style={[mine ? styles.mine : styles.theirs, styles.wrapper]}
      testID={`message-${message.id}`}
    >
      <View
        style={[
          styles.bubble,
          {
            padding: theme.spacing[3],
            gap: theme.spacing[1],
            borderRadius: theme.radius.lg,
            backgroundColor: background,
            borderColor: border,
          },
        ]}
      >
        <Typography tone={mine ? 'onBrand' : 'primary'}>
          {message.text}
        </Typography>
        <Typography variant="caption" tone={mine ? 'onBrand' : 'secondary'}>
          {meta}
        </Typography>
      </View>
    </View>
  );

  return animate ? (
    <FadeInView variant="rise" duration="fast">
      {bubble}
    </FadeInView>
  ) : (
    bubble
  );
}
