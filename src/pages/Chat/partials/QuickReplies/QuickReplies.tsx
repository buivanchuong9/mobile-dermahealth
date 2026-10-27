import { ScrollView, StyleSheet } from 'react-native';
import { MIN_TOUCH_TARGET } from '@utils/accessibility';
import { PressableScale, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { QuickRepliesProps } from './QuickReplies.types';
import { REPLIES } from './QuickReplies.constants';

export function QuickReplies({
  onSelect,
  disabled = false,
}: QuickRepliesProps) {
  const theme = useTheme();
  const chipOpacity = disabled ? 0.5 : 1;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityLabel={translate('chat.quickRepliesLabel')}
      contentContainerStyle={{ gap: theme.spacing[2] }}
    >
      {REPLIES.map(reply => {
        const text = translate(`chat.quickReplies.${reply}`);
        return (
          <PressableScale
            key={reply}
            accessibilityRole="button"
            accessibilityLabel={text}
            disabled={disabled}
            onPress={() => onSelect(text)}
            style={[
              styles.chip,
              {
                borderRadius: theme.radius.pill,
                borderColor: theme.colors.brand.primary,
                paddingHorizontal: theme.spacing[3],
                opacity: chipOpacity,
              },
            ]}
            testID={`quick-reply-${reply}`}
          >
            <Typography variant="caption" tone="brand">
              {text}
            </Typography>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: MIN_TOUCH_TARGET - 4,
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
