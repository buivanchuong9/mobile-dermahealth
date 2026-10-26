import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { translate } from '@shared/localization';
import { Button, Typography } from '../../primitives';
import { useTheme } from '../../theme';
import type { ConfirmDialogProps } from './ConfirmDialog.types';

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = translate('common.back'),
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const theme = useTheme();
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        accessibilityViewIsModal
        style={[
          styles.scrim,
          {
            backgroundColor: theme.colors.overlay.scrim,
            padding: theme.spacing[5],
          },
        ]}
      >
        <Pressable
          accessibilityElementsHidden
          importantForAccessibility="no"
          onPress={onCancel}
          style={StyleSheet.absoluteFill}
        />
        <View
          accessibilityRole="alert"
          style={{
            padding: theme.spacing[5],
            gap: theme.spacing[4],
            borderRadius: theme.radius.xl,
            backgroundColor: theme.colors.surface.primary,
          }}
        >
          <View style={{ gap: theme.spacing[2] }}>
            <Typography variant="subtitle" accessibilityRole="header">
              {title}
            </Typography>
            <Typography tone="secondary">{message}</Typography>
          </View>
          <View style={{ gap: theme.spacing[2] }}>
            <Button
              label={confirmLabel}
              variant={destructive ? 'danger' : 'primary'}
              loading={loading}
              onPress={onConfirm}
              fullWidth
              testID="dialog-confirm"
            />
            <Button
              label={cancelLabel}
              variant="ghost"
              disabled={loading}
              onPress={onCancel}
              fullWidth
              testID="dialog-cancel"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, justifyContent: 'center' },
});
