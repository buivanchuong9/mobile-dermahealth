import { ScreenHeader } from '@design-system/navigation';
import { Typography } from '@design-system/primitives';
import { CollapsibleSection, ScreenContainer } from '@design-system/surfaces';
import { translate } from '@shared/localization';

export type GuideScreenProps = { readonly onBack: () => void };

const SECTIONS = [
  'booking',
  'queue',
  'records',
  'assessment',
  'simulated',
] as const;

export function GuideScreen({ onBack }: GuideScreenProps) {
  return (
    <ScreenContainer
      header={
        <ScreenHeader
          title={translate('onboarding.guide.title')}
          subtitle={translate('onboarding.guide.subtitle')}
          onBack={onBack}
        />
      }
    >
      {SECTIONS.map((section, index) => (
        <CollapsibleSection
          key={section}
          title={translate(`onboarding.guide.${section}.title`)}
          defaultExpanded={index === 0}
          testID={`guide-${section}`}
        >
          <Typography tone="secondary">
            {translate(`onboarding.guide.${section}.steps`)}
          </Typography>
        </CollapsibleSection>
      ))}
    </ScreenContainer>
  );
}
