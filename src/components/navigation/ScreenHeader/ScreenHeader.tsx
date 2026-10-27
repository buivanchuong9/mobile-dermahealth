import { View } from 'react-native';
import { translate } from '@i18n';
import { Icon, PressableScale, Typography } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import type { ScreenHeaderProps } from './ScreenHeader.types';
import { styles } from './ScreenHeader.styles';

export function ScreenHeader({
  title,
  subtitle,
  onBack,
  right,
}: ScreenHeaderProps) {
  const theme = useTheme();
  return (
    <View style={[styles.row, { gap: theme.spacing[2] }]}>
      {onBack ? (
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={translate('common.back')}
          onPress={onBack}
          style={[
            styles.back,
            {
              borderRadius: theme.radius.pill,
              backgroundColor: theme.colors.surface.primary,
              borderColor: theme.colors.border.default,
            },
          ]}
          testID="header-back"
        >
          <Icon name="arrow-left" size={22} />
        </PressableScale>
      ) : null}
      <View style={styles.titles}>
        <Typography
          variant="title"
          accessibilityRole="header"
          numberOfLines={2}
        >
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="caption" tone="secondary">
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {right}
    </View>
  );
}
