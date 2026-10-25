import { StyleSheet, View } from 'react-native';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type { ChatMessage } from '../../../domain/entities/Chat';

export function MessageBubble({ message }: { readonly message: ChatMessage }) {
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

  return (
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
}

const styles = StyleSheet.create({
  wrapper: { maxWidth: '85%' },
  mine: { alignSelf: 'flex-end' },
  theirs: { alignSelf: 'flex-start' },
  bubble: { borderWidth: 1 },
});
