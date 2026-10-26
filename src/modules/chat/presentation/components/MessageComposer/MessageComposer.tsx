import { TextInput, View } from 'react-native';
import { Icon, PressableScale } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { MessageComposerProps } from './MessageComposer.types';
import { styles } from './MessageComposer.styles';

export function MessageComposer({
  value,
  onChangeText,
  onSend,
}: MessageComposerProps) {
  const theme = useTheme();
  const canSend = value.trim() !== '';
  return (
    <View style={[styles.row, { gap: theme.spacing[2] }]}>
      <TextInput
        accessibilityLabel={translate('chat.composer.label')}
        placeholder={translate('chat.composer.placeholder')}
        placeholderTextColor={theme.colors.text.secondary}
        value={value}
        onChangeText={onChangeText}
        multiline
        style={[
          theme.typography.body,
          styles.input,
          {
            color: theme.colors.text.primary,
            borderColor: theme.colors.border.default,
            borderRadius: theme.radius.lg,
            paddingHorizontal: theme.spacing[3],
          },
        ]}
        testID="chat-input"
      />
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={translate('chat.composer.send')}
        accessibilityState={{ disabled: !canSend }}
        disabled={!canSend}
        onPress={onSend}
        style={[
          styles.send,
          {
            backgroundColor: canSend
              ? theme.colors.brand.primary
              : theme.colors.state.disabledBackground,
          },
        ]}
        testID="chat-send"
      >
        <Icon
          name="send"
          size={20}
          color={
            canSend ? theme.colors.text.onBrand : theme.colors.text.disabled
          }
        />
      </PressableScale>
    </View>
  );
}
