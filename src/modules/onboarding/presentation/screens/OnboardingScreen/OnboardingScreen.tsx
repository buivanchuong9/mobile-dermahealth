import { useRef, useState } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import type {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Button, Typography } from '@design-system/primitives';
import { ScreenContainer } from '@design-system/surfaces';
import { useTheme } from '@design-system/theme';
import { translate } from '@shared/localization';
import { ONBOARDING_SLIDES } from '../../onboardingSlides';
import type { OnboardingSlide } from '../../onboardingSlides';
import { PageDots } from '../../components/PageDots';
import { SlideIllustration } from '../../components/SlideIllustration';

export type OnboardingScreenProps = {
  /** Called when the user finishes or skips. */
  readonly onFinish: () => void;
};

const H_PADDING = 24;

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const last = index === ONBOARDING_SLIDES.length - 1;

  const goTo = (target: number) => {
    listRef.current?.scrollToOffset({ offset: target * width, animated: true });
    setIndex(target);
  };

  const handleMomentumEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    setIndex(Math.round(event.nativeEvent.contentOffset.x / width));
  };

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
        ref={listRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={slide => slide.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleMomentumEnd}
        style={[styles.list, { marginHorizontal: -theme.spacing[5] }]}
        renderItem={({ item }) => (
          <View
            accessible
            accessibilityLabel={`${translate(
              `onboarding.slides.${item.id}.title`,
            )}. ${translate(`onboarding.slides.${item.id}.body`)}`}
            style={[
              styles.slide,
              { width, paddingHorizontal: H_PADDING, gap: theme.spacing[5] },
            ]}
          >
            <SlideIllustration
              icon={item.icon}
              secondaryIcons={item.secondaryIcons}
            />
            <View style={{ gap: theme.spacing[2] }}>
              <Typography
                variant="title"
                align="center"
                accessibilityRole="header"
              >
                {translate(`onboarding.slides.${item.id}.title`)}
              </Typography>
              <Typography tone="secondary" align="center">
                {translate(`onboarding.slides.${item.id}.body`)}
              </Typography>
            </View>
          </View>
        )}
      />
      <Typography variant="caption" tone="secondary" align="center">
        {translate('onboarding.simulatedNote')}
      </Typography>
      <View
        accessible
        accessibilityLabel={translate('onboarding.progress', {
          current: index + 1,
          total: ONBOARDING_SLIDES.length,
        })}
        accessibilityLiveRegion="polite"
      >
        <PageDots
          count={ONBOARDING_SLIDES.length}
          scrollX={scrollX}
          pageWidth={width}
        />
      </View>
      <View style={[styles.actions, { gap: theme.spacing[2] }]}>
        <View style={styles.action}>
          <Button
            label={translate('onboarding.back')}
            variant="secondary"
            onPress={() => goTo(index - 1)}
            disabled={index === 0}
            fullWidth
            testID="onboarding-back"
          />
        </View>
        <View style={styles.action}>
          <Button
            label={translate(last ? 'onboarding.start' : 'onboarding.next')}
            onPress={last ? onFinish : () => goTo(index + 1)}
            fullWidth
            testID="onboarding-next"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topRow: { alignItems: 'flex-end' },
  list: { flex: 1 },
  slide: { alignItems: 'center', justifyContent: 'center' },
  actions: { flexDirection: 'row' },
  action: { flex: 1 },
});
