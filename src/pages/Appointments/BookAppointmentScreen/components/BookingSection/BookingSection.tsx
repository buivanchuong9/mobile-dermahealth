import { View } from 'react-native';
import { Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
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
