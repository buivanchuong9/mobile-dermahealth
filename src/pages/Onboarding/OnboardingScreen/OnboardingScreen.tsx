import { Animated, View } from 'react-native';
import { Button, Typography } from '@components/primitives';
import { ScreenContainer } from '@components/surfaces';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { OnboardingActions } from '../partials/OnboardingActions';
import { OnboardingSlidePage } from '../partials/OnboardingSlidePage';
import { PageDots } from '../partials/PageDots';
import { ONBOARDING_SLIDES } from '../onboardingSlides';
import { useOnboardingPager } from './hooks/useOnboardingPager';
import { styles } from './OnboardingScreen.styles';
import type { OnboardingScreenProps } from './OnboardingScreen.types';

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const theme = useTheme();
  const pager = useOnboardingPager();

  return (
    <ScreenContainer
      background="primary"
      scroll={false}
      header={
        <View style={styles.topRow}>
          <Button
            label={translate('onboarding.skip')}
            variant="ghost"
            size="sm"
            onPress={onFinish}
            testID="onboarding-skip"
          />
        </View>
      }
    >
      <Animated.FlatList
        ref={pager.listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={slide => slide.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={pager.handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={pager.handleMomentumEnd}
        style={[styles.list, { marginHorizontal: -theme.spacing[5] }]}
        renderItem={({ item }) => (
          <OnboardingSlidePage slide={item} width={pager.width} />
        )}
      />
      <Typography variant="caption" tone="secondary" align="center">
        {translate('onboarding.simulatedNote')}
      </Typography>
      <View
        accessible
        accessibilityLabel={translate('onboarding.progress', {
          current: pager.index + 1,
          total: ONBOARDING_SLIDES.length,
        })}
        accessibilityLiveRegion="polite"
      >
        <PageDots
          count={ONBOARDING_SLIDES.length}
          scrollX={pager.scrollX}
          pageWidth={pager.width}
        />
      </View>
      <OnboardingActions
        canGoBack={pager.index > 0}
        isLast={pager.isLast}
        onBack={() => pager.goTo(pager.index - 1)}
        onNext={() => pager.goTo(pager.index + 1)}
        onFinish={onFinish}
      />
    </ScreenContainer>
  );
}
