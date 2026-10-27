import { StyleSheet, View } from 'react-native';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import { SKIN_CONCERNS } from '../../../../../model/skinProfile/SkinConcern';
import { SkinConcernCard } from '../../../partials/SkinConcernCard';
import type { SkinConcernSectionProps } from './SkinConcernSection.types';

export function SkinConcernSection({
  selected,
  onToggle,
  disabled,
}: SkinConcernSectionProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[2] }}>
      <Typography variant="subtitle" accessibilityRole="header">
        {translate('skinProfile.concerns.title')}
      </Typography>
      <Typography variant="caption" tone="secondary">
        {translate('skinProfile.concerns.optionalHint')}
      </Typography>
      <View style={[styles.grid, { gap: theme.spacing[2] }]}>
        {SKIN_CONCERNS.map(concern => (
          <View key={concern} style={styles.item}>
            <SkinConcernCard
              concern={concern}
              selected={selected.includes(concern)}
              onToggle={onToggle}
              disabled={disabled}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  item: { flexGrow: 1, flexBasis: '45%' },
});
