import { useRef } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { ComponentRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Banner, EmptyState } from '@design-system/feedback';
import { ChatMessagesSkeleton } from '../../components/ChatMessagesSkeleton';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { MessageBubble } from '../../components/MessageBubble';
import { MessageComposer } from '../../components/MessageComposer';
import { QuickReplies } from '../../components/QuickReplies';
import { useChat } from '../../hooks/useChat';
import type { ChatScreenProps } from './ChatScreen.types';

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

  // Messages present at first load do not animate; later ones do.
  const initialIds = useRef<ReadonlySet<string> | null>(null);
  if (initialIds.current === null && chat.messages.status === 'ready') {
    initialIds.current = new Set(messages.map(message => message.id));
  }
  // Follow new messages only while the reader is already at the bottom, so a
  // reply never pulls them away from older messages they are reading.
  const nearBottom = useRef(true);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    nearBottom.current =
      contentSize.height - (contentOffset.y + layoutMeasurement.height) <
      NEAR_BOTTOM_THRESHOLD;
  };
  const handleContentSizeChange = () => {
    const sentByMe = messages[messages.length - 1]?.sender === 'patient';
    if (nearBottom.current || sentByMe) {
      scrollRef.current?.scrollToEnd({ animated: initialIds.current !== null });
    }
  };

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
        onScroll={handleScroll}
        scrollEventThrottle={64}
        onContentSizeChange={handleContentSizeChange}
        keyboardShouldPersistTaps="handled"
      >
        {chat.messages.status === 'loading' ? <ChatMessagesSkeleton /> : null}
        {chat.messages.status === 'ready' && messages.length === 0 ? (
          <EmptyState
            icon="message-circle"
            title={translate('chat.empty.conversation.title')}
            description={translate('chat.empty.conversation.description')}
            testID="chat-empty"
          />
        ) : null}
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            animate={
              initialIds.current !== null && !initialIds.current.has(message.id)
            }
          />
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

const NEAR_BOTTOM_THRESHOLD = 80;

const styles = StyleSheet.create({ list: { flex: 1 } });
