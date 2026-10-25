import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MIN_TOUCH_TARGET } from '@design-system/accessibility';
import { Icon } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';

export type MessageComposerProps = {
  readonly value: string;
  readonly onChangeText: (value: string) => void;
  readonly onSend: () => void;
};

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
      <Pressable
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  input: {
    flex: 1,
    maxHeight: 120,
    minHeight: MIN_TOUCH_TARGET,
    borderWidth: 1.5,
    paddingVertical: 10,
  },
  send: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    borderRadius: MIN_TOUCH_TARGET / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
