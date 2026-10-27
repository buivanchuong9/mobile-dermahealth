import { useState } from 'react';
import { View } from 'react-native';
import { Banner } from '@components/feedback';
import { Button } from '@components/primitives';
import { translate } from '@i18n';
import type { FirstTimeTipProps } from './FirstTimeTip.types';

/** Dismissible hint; dismissal lasts for the session only. */
export function FirstTimeTip({ onOpenGuide }: FirstTimeTipProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) {
    return null;
  }
  return (
    <View>
      <Banner
        tone="info"
        icon="lightbulb"
        title={translate('home.tip.title')}
        message={translate('home.tip.body')}
        onDismiss={() => setDismissed(true)}
        testID="home-tip"
      />
      <Button
        label={translate('home.tip.action')}
        variant="ghost"
        size="sm"
        onPress={onOpenGuide}
        testID="home-tip-guide"
      />
    </View>
  );
}
