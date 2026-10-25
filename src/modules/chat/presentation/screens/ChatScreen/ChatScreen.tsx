import { useRef } from 'react';
import type { ComponentRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Banner, EmptyState, Skeleton } from '@design-system/feedback';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { ChatRepository } from '../../../domain/repositories/ChatRepository';
import { MessageBubble } from '../../components/MessageBubble';
import { MessageComposer } from '../../components/MessageComposer';
import { QuickReplies } from '../../components/QuickReplies';
import { useChat } from '../../hooks/useChat';

export type ChatScreenProps = {
  readonly repository: ChatRepository;
  readonly conversationId: string;
  readonly onBack: () => void;
};

export function ChatScreen({
  repository,
  conversationId,
  onBack,
}: ChatScreenProps) {
  const theme = useTheme();
  const chat = useChat(repository, conversationId);
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const conversation =
    chat.conversation.status === 'ready' ? chat.conversation.data : null;
  const replyPending = conversation?.replyPending ?? false;
  const messages = chat.messages.status === 'ready' ? chat.messages.data : [];

  const header = (
    <ScreenHeader
      title={conversation?.doctorName ?? translate('chat.title')}
      subtitle={conversation?.doctorTitle}
      onBack={onBack}
    />
  );

  const footer = (
    <View style={{ gap: theme.spacing[2] }}>
      <QuickReplies onSelect={chat.send} disabled={replyPending} />
      <MessageComposer
        value={chat.draft}
        onChangeText={chat.setDraft}
        onSend={() => chat.send(chat.draft)}
      />
    </View>
  );

  return (
    <ScreenContainer header={header} footer={footer} scroll={false}>
      <Banner tone="warning" message={translate('chat.simulatedBanner')} />
      {conversation ? (
        <Typography variant="caption" tone="secondary">
          {translate('chat.context', { context: conversation.context })}
        </Typography>
      ) : null}
      <ScrollView
        ref={scrollRef}
        style={styles.list}
        contentContainerStyle={{
          gap: theme.spacing[3],
          paddingVertical: theme.spacing[2],
        }}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
        keyboardShouldPersistTaps="handled"
      >
        {chat.messages.status === 'loading' ? <Skeleton height={64} /> : null}
        {chat.messages.status === 'ready' && messages.length === 0 ? (
          <EmptyState
            icon="message-circle"
            title={translate('chat.empty.conversation.title')}
            description={translate('chat.empty.conversation.description')}
            testID="chat-empty"
          />
        ) : null}
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {replyPending ? (
          <Typography
            variant="caption"
            tone="secondary"
            accessibilityRole="text"
            accessibilityLiveRegion="polite"
            testID="chat-typing"
          >
            {translate('chat.typing')}
          </Typography>
        ) : null}
      </ScrollView>
      {chat.sendFailed ? (
        <Typography variant="caption" tone="error" accessibilityRole="alert">
          {translate('common.loadFailedBody')}
        </Typography>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ list: { flex: 1 } });
