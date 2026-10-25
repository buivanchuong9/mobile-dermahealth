import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, StatusBadge } from '@design-system/data-display';
import { Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { formatTime } from '@shared/utilities/localDateTime';
import type { Conversation } from '../../../domain/entities/Chat';

export type ConversationRowProps = {
  readonly conversation: Conversation;
  readonly onPress: (conversationId: string) => void;
};

export function ConversationRow({
  conversation,
  onPress,
}: ConversationRowProps) {
  const theme = useTheme();
  const preview =
    conversation.lastMessagePreview ?? translate('chat.noMessagesYet');
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${conversation.doctorName}. ${
        conversation.doctorTitle
      }. ${preview}${
        conversation.unreadCount > 0
          ? `. ${translate('chat.unreadCount', {
              count: conversation.unreadCount,
            })}`
          : ''
      }`}
      onPress={() => onPress(conversation.id)}
      testID={`conversation-${conversation.id}`}
    >
      <Card>
        <View style={[styles.row, { gap: theme.spacing[3] }]}>
          <Avatar
            name={conversation.doctorName.replace(/^(BS\.|ThS\.BS)\s*/, '')}
          />
          <View style={styles.text}>
            <Typography variant="bodyStrong">
              {conversation.doctorName}
            </Typography>
            <Typography variant="caption" tone="secondary">
              {conversation.doctorTitle}
            </Typography>
            <Typography variant="caption" numberOfLines={1}>
              {preview}
            </Typography>
          </View>
          <View style={styles.meta}>
            {conversation.lastMessageAt ? (
              <Typography variant="caption" tone="secondary">
                {formatTime(conversation.lastMessageAt)}
              </Typography>
            ) : null}
            {conversation.unreadCount > 0 ? (
              <StatusBadge
                label={translate('chat.unreadCount', {
                  count: conversation.unreadCount,
                })}
                tone="info"
              />
            ) : null}
          </View>
        </View>
        <StatusBadge
          label={conversation.context}
          tone="neutral"
          icon="message-circle"
        />
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1 },
  meta: { alignItems: 'flex-end', gap: 4 },
});
