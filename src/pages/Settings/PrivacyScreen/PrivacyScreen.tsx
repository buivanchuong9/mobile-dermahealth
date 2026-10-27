import { ScreenHeader } from '@components/navigation';
import { Typography } from '@components/primitives';
import { ScreenContainer, SectionCard } from '@components/surfaces';
import { translate } from '@i18n';
import type { PrivacyScreenProps } from './PrivacyScreen.types';
import { SECTIONS } from './PrivacyScreen.constants';

export function PrivacyScreen({ onBack }: PrivacyScreenProps) {
  return (
    <ScreenContainer
      header={
        <ScreenHeader
          title={translate('settings.privacy.title')}
          onBack={onBack}
        />
      }
    >
      <Typography tone="secondary">
        {translate('settings.privacy.intro')}
      </Typography>
      {SECTIONS.map(section => (
        <SectionCard
          key={section}
          title={translate(`settings.privacy.sections.${section}.title`)}
          testID={`privacy-${section}`}
        >
          <Typography tone="secondary">
            {translate(`settings.privacy.sections.${section}.body`)}
          </Typography>
        </SectionCard>
      ))}
    </ScreenContainer>
  );
}
