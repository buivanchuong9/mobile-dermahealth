import { Animated, View } from 'react-native';
import { FadeInView } from '@components/motion';
import { Button, Icon, Typography } from '@components/primitives';
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
          <View style={styles.brand} accessibilityLabel="DermaHealth">
            <View style={styles.brandMark}>
              <Icon name="heart" color="#FFFFFF" size={17} />
            </View>
            <Typography variant="bodyStrong">DermaHealth</Typography>
          </View>
          <Button
            label={translate('onboarding.skip')}
            variant="ghost"
            size="md"
            onPress={onFinish}
            testID="onboarding-skip"
          />
        </View>
      }
    >
      <Animated.FlatList
        ref={pager.listRef}
        data={ONBOARDING_SLIDES}
        extraData={pager.index}
        keyExtractor={slide => slide.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={pager.handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={pager.handleMomentumEnd}
        style={[styles.list, { marginHorizontal: -theme.spacing[5] }]}
        getItemLayout={(_, index) => ({
          length: pager.width,
          offset: pager.width * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <OnboardingSlidePage
            slide={item}
            index={index}
            active={index === pager.index}
            scrollX={pager.scrollX}
            width={pager.width}
          />
        )}
      />
      <FadeInView variant="fade" style={styles.bottom}>
        <View style={styles.progressRow}>
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
              activeIndex={pager.index}
            />
          </View>
          <Typography variant="caption" tone="secondary">
            {String(pager.index + 1).padStart(2, '0')} /{' '}
            {String(ONBOARDING_SLIDES.length).padStart(2, '0')}
          </Typography>
        </View>
        <OnboardingActions
          canGoBack={pager.index > 0}
          isLast={pager.isLast}
          onBack={() => pager.goTo(pager.index - 1)}
          onNext={() => pager.goTo(pager.index + 1)}
          onFinish={onFinish}
        />
        <Typography variant="caption" tone="secondary" align="center">
          {translate('onboarding.simulatedNote')}
        </Typography>
      </FadeInView>
    </ScreenContainer>
  );
}
