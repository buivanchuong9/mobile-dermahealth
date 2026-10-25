import { View } from 'react-native';
import type { ReactNode } from 'react';
import { Typography } from '../../primitives';
import { useTheme } from '../../theme';
import { Card } from '../Card';

export type SectionCardProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly children: ReactNode;
  readonly testID?: string;
};

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
