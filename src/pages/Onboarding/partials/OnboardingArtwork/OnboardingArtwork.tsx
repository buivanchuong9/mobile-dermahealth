import { StyleSheet, View } from 'react-native';
import { Icon } from '@components/primitives';
import type { IconName } from '@components/primitives';
import type { OnboardingSlideId } from '../../onboardingSlides';

const ICONS: Record<OnboardingSlideId, IconName> = {
  booking: 'calendar-days',
  queue: 'ticket',
  records: 'file-text',
  assessment: 'heart',
};

export function OnboardingArtwork({
  id,
  height,
}: {
  readonly id: OnboardingSlideId;
  readonly height: number;
}) {
  return (
    <View
      style={[styles.stage, { height }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.symbol}>
        <Icon name={ICONS[id]} size={72} strokeWidth={1.35} color="#2563EB" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  stage: { alignItems: 'center', justifyContent: 'center' },
  symbol: {
    width: 152,
    height: 152,
    borderRadius: 76,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
