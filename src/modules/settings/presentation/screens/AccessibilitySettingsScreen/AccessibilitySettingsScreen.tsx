import { StatusBadge } from '@design-system/data-display';
import { useReducedMotion } from '@design-system/motion';
import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { ScreenContainer, SectionCard } from '@design-system/surfaces';
import { translate } from '@shared/localization';

export type AccessibilitySettingsScreenProps = { readonly onBack: () => void };

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
