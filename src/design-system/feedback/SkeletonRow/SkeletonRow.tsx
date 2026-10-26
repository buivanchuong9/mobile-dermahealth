import { View } from 'react-native';
import { Card } from '../../surfaces';
import { useTheme } from '../../theme';
import { Skeleton } from '../Skeleton';
import type { SkeletonRowProps } from './SkeletonRow.types';
import { styles } from './SkeletonRow.styles';

/** List-row placeholder: leading shape, text lines and an optional pill. */
export function SkeletonRow({
  leading = 'circle',
  lines = 2,
  trailing = false,
  card = true,
}: SkeletonRowProps) {
  const theme = useTheme();
  const row = (
    <View style={[styles.row, { gap: theme.spacing[3] }]}>
      {leading === 'none' ? null : (
        <Skeleton
          circle={leading === 'circle'}
          width={48}
          height={48}
          radius={theme.radius.md}
        />
      )}
      <View style={[styles.body, { gap: theme.spacing[2] }]}>
        <Skeleton width="55%" height={16} />
        {Array.from({ length: Math.max(lines - 1, 0) }, (_, index) => (
          <Skeleton
            key={index}
            width={index === lines - 2 ? '80%' : '100%'}
            height={12}
          />
        ))}
      </View>
      {trailing ? (
        <Skeleton width={56} height={22} radius={theme.radius.pill} />
      ) : null}
    </View>
  );
  return card ? <Card>{row}</Card> : row;
}
