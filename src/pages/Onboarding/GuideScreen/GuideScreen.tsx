import { ScreenHeader } from '@components/navigation';
import { Typography } from '@components/primitives';
import { CollapsibleSection, ScreenContainer } from '@components/surfaces';
import { translate } from '@i18n';
import type { GuideScreenProps } from './GuideScreen.types';
import { SECTIONS } from './GuideScreen.constants';

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
