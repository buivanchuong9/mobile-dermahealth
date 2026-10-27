import { StatusBadge } from '@components/data-display';
import { useReducedMotion } from '@components/motion';
import { ScreenHeader } from '@components/navigation';
import { Typography } from '@components/primitives';
import { ScreenContainer, SectionCard } from '@components/surfaces';
import { translate } from '@i18n';
import type { AccessibilitySettingsScreenProps } from './AccessibilitySettingsScreen.types';

export function AccessibilitySettingsScreen({
  onBack,
}: AccessibilitySettingsScreenProps) {
  const reducedMotion = useReducedMotion();
  return (
    <ScreenContainer
      header={
        <ScreenHeader
          title={translate('settings.accessibility.title')}
          onBack={onBack}
        />
      }
    >
      <Typography tone="secondary">
        {translate('settings.accessibility.intro')}
      </Typography>
      <SectionCard
        title={translate('settings.accessibility.motion.title')}
        testID="a11y-motion"
      >
        <StatusBadge
          label={translate(
            reducedMotion
              ? 'settings.accessibility.motion.statusOn'
              : 'settings.accessibility.motion.statusOff',
          )}
          tone="neutral"
        />
        <Typography tone="secondary">
          {translate(
            reducedMotion
              ? 'settings.accessibility.motion.on'
              : 'settings.accessibility.motion.off',
          )}
        </Typography>
        <Typography variant="caption" tone="secondary">
          {translate('settings.accessibility.motion.howTo')}
        </Typography>
      </SectionCard>
      <SectionCard title={translate('settings.accessibility.text.title')}>
        <Typography tone="secondary">
          {translate('settings.accessibility.text.body')}
        </Typography>
      </SectionCard>
      <SectionCard title={translate('settings.accessibility.touch.title')}>
        <Typography tone="secondary">
          {translate('settings.accessibility.touch.body')}
        </Typography>
      </SectionCard>
    </ScreenContainer>
  );
}
