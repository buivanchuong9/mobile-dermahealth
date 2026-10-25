import { ScrollView } from 'react-native';
import { Typography } from '@design-system/primitives';
import { SectionCard } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import type { SkinProfileUseCases } from '@modules/skin-profile';
import { HomeHeader } from '../../components/HomeHeader';
import { SkinProfileSummaryCard } from '../../components/SkinProfileSummaryCard';

export type HomeScreenProps = {
  readonly skinProfileUseCases: SkinProfileUseCases;
  readonly onOpenSkinProfile: () => void;
};

export function HomeScreen({
  skinProfileUseCases,
  onOpenSkinProfile,
}: HomeScreenProps) {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background.secondary }}
      contentContainerStyle={{
        padding: theme.spacing[5],
        gap: theme.spacing[4],
      }}
    >
      <HomeHeader />
      <Typography tone="secondary">{translate('app.tagline')}</Typography>

      <SkinProfileSummaryCard
        useCases={skinProfileUseCases}
        onOpen={onOpenSkinProfile}
      />

      <SectionCard
        title={translate('home.appointments.title')}
        testID="home-appointments"
      >
        <Typography tone="secondary">
          {translate('home.appointments.empty')}
        </Typography>
      </SectionCard>

      <SectionCard title={translate('home.advice.title')} testID="home-advice">
        <Typography tone="secondary">
          {translate('home.advice.empty')}
        </Typography>
      </SectionCard>
    </ScrollView>
  );
}
