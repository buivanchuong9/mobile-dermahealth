import { View } from 'react-native';
import { Button, Typography } from '@design-system/primitives';
import { Card } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { NextActionCardProps } from './NextActionCard.types';

export function NextActionCard({ action, onPress }: NextActionCardProps) {
  const theme = useTheme();
  return (
    <Card testID="journey-next-action">
      <View style={{ gap: theme.spacing[1] }}>
        <Typography variant="caption" tone="brand">
          {translate('journey.nextAction.title')}
        </Typography>
        <Typography variant="subtitle" accessibilityRole="header">
          {translate(`journey.nextAction.${action}.title`)}
        </Typography>
        <Typography tone="secondary">
          {translate(`journey.nextAction.${action}.body`)}
        </Typography>
      </View>
      <Button
        label={translate(`journey.nextAction.${action}.action`)}
        onPress={onPress}
        fullWidth
        testID="journey-next-action-button"
      />
    </Card>
  );
}
