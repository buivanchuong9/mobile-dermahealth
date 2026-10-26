import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, ListItem } from '@design-system/data-display';
import { ScreenHeader } from '@design-system/navigation';
import { ConfirmDialog } from '@design-system/overlays';
import { Button, Typography } from '@design-system/primitives';
import { Card, ScreenContainer } from '@design-system/surfaces';
import { StatusBadge } from '@design-system/data-display';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { ProfileScreenProps } from './ProfileScreen.types';

export function ProfileScreen(props: ProfileScreenProps) {
  const theme = useTheme();
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);

  const items = [
    {
      key: 'skinProfile',
      icon: 'user-round',
      onPress: props.onOpenSkinProfile,
    },
    {
      key: 'notifications',
      icon: 'bell',
      onPress: props.onOpenNotificationPreferences,
    },
    {
      key: 'assessmentHistory',
      icon: 'history',
      onPress: props.onOpenAssessmentHistory,
    },
    { key: 'guide', icon: 'book-open', onPress: props.onOpenGuide },
    { key: 'privacy', icon: 'shield-check', onPress: props.onOpenPrivacy },
    {
      key: 'accessibility',
      icon: 'accessibility',
      onPress: props.onOpenAccessibility,
    },
  ] as const;

  return (
    <ScreenContainer
      bottomInset={false}
      header={<ScreenHeader title={translate('settings.profile.title')} />}
    >
      <Card testID="profile-card">
        <View style={[styles.row, { gap: theme.spacing[3] }]}>
          <Avatar name={props.fullName} size={56} />
          <View style={styles.text}>
            <Typography variant="subtitle">{props.fullName}</Typography>
            <Typography variant="caption" tone="secondary">
              {props.email}
            </Typography>
          </View>
        </View>
        <StatusBadge
          label={translate('settings.profile.simulatedAccount')}
          tone="neutral"
          icon="info"
        />
      </Card>

      <Card>
        {items.map(item => (
          <ListItem
            key={item.key}
            icon={item.icon}
            title={translate(`settings.profile.menu.${item.key}`)}
            subtitle={translate(`settings.profile.menu.${item.key}Hint`)}
            onPress={item.onPress}
            testID={`profile-${item.key}`}
          />
        ))}
      </Card>

      <Button
        label={translate('settings.profile.signOut')}
        variant="secondary"
        onPress={() => setConfirmingSignOut(true)}
        fullWidth
        testID="profile-sign-out"
      />
      <Typography variant="caption" tone="secondary" align="center">
        {translate('settings.profile.version')}
      </Typography>

      <ConfirmDialog
        visible={confirmingSignOut}
        title={translate('settings.profile.signOutDialog.title')}
        message={translate('settings.profile.signOutDialog.message')}
        confirmLabel={translate('settings.profile.signOutDialog.confirm')}
        destructive
        onConfirm={() => {
          setConfirmingSignOut(false);
          props.onSignOut();
        }}
        onCancel={() => setConfirmingSignOut(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  text: { flex: 1 },
});
