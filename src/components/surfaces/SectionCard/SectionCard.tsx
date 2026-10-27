import { View } from 'react-native';
import { Typography } from '../../primitives';
import { useTheme } from '../../../styles/theme';
import { Card } from '../Card';
import type { SectionCardProps } from './SectionCard.types';

/** A card with a heading; the body is supplied by the caller. */
export function SectionCard({
  title,
  subtitle,
  children,
  testID,
}: SectionCardProps) {
  const theme = useTheme();
  return (
    <Card testID={testID}>
      <View style={{ gap: theme.spacing[1] }}>
        <Typography variant="subtitle" accessibilityRole="header">
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="caption" tone="secondary">
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {children}
    </Card>
  );
}
