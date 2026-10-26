import { View } from 'react-native';
import { Typography } from '@design-system/primitives';
import { useTheme } from '@design-system/theme';
import type { BookingSectionProps } from './BookingSection.types';

/** A titled group of related booking inputs. */
export function BookingSection({ title, children }: BookingSectionProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing[2] }}>
      <Typography variant="subtitle" accessibilityRole="header">
        {title}
      </Typography>
      {children}
    </View>
  );
}
