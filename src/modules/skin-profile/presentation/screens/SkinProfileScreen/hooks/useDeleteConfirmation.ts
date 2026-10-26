import { Alert } from 'react-native';
import { translate } from '@shared/localization';

/** Returns a function that asks for confirmation before deleting the profile. */
export function useDeleteConfirmation(onConfirm: () => void): () => void {
  return () =>
    Alert.alert(
      translate('skinProfile.messages.deleteConfirmTitle'),
      translate('skinProfile.messages.deleteConfirmMessage'),
      [
        { text: translate('common.cancel'), style: 'cancel' },
        {
          text: translate('skinProfile.actions.delete'),
          style: 'destructive',
          onPress: onConfirm,
        },
      ],
    );
}
