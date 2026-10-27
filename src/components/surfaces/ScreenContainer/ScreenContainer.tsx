import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../../styles/theme';
import type { ScreenContainerProps } from './ScreenContainer.types';

export function ScreenContainer({
  children,
  header,
  footer,
  scroll = true,
  background = 'secondary',
  bottomInset = true,
  testID,
}: ScreenContainerProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const backgroundColor =
    background === 'secondary'
      ? theme.colors.background.secondary
      : theme.colors.background.primary;
  const padding = theme.spacing[5];
  const bottomPadding = bottomInset ? insets.bottom : 0;

  const body = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        paddingHorizontal: padding,
        paddingBottom: padding,
        gap: theme.spacing[4],
      }}
      style={styles.flex}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.flex,
        { paddingHorizontal: padding, gap: theme.spacing[4] },
      ]}
    >
      {children}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        styles.flex,
        {
          backgroundColor,
          paddingTop: insets.top + theme.spacing[2],
          paddingBottom: bottomPadding,
        },
      ]}
      testID={testID}
    >
      {header ? (
        <View
          style={{
            paddingHorizontal: padding,
            paddingBottom: theme.spacing[3],
          }}
        >
          {header}
        </View>
      ) : null}
      {body}
      {footer ? (
        <View
          style={{
            padding,
            paddingTop: theme.spacing[3],
            backgroundColor: theme.colors.surface.primary,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: theme.colors.border.default,
          }}
        >
          {footer}
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({ flex: { flex: 1 } });
