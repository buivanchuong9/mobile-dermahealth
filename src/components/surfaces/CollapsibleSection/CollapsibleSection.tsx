import { useState } from 'react';
import { View } from 'react-native';
import { translate } from '@i18n';
import { Icon, PressableScale, Typography } from '../../primitives';
import { useLayoutTransition } from '../../motion';
import { useTheme } from '../../../styles/theme';
import type { CollapsibleSectionProps } from './CollapsibleSection.types';
import { styles } from './CollapsibleSection.styles';

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  testID,
}: CollapsibleSectionProps) {
  const theme = useTheme();
  const animateToggle = useLayoutTransition();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = () => {
    animateToggle();
    setExpanded(current => !current);
  };

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: theme.radius.lg,
          borderColor: theme.colors.border.default,
          backgroundColor: theme.colors.surface.primary,
        },
      ]}
    >
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={translate(
          expanded ? 'common.collapse' : 'common.expand',
        )}
        accessibilityState={{ expanded }}
        onPress={toggle}
        style={[
          styles.header,
          { padding: theme.spacing[4], gap: theme.spacing[3] },
        ]}
        testID={testID}
      >
        <View style={styles.title}>
          <Typography variant="bodyStrong">{title}</Typography>
        </View>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          color={theme.colors.text.secondary}
        />
      </PressableScale>
      {expanded ? (
        <View
          style={{
            paddingHorizontal: theme.spacing[4],
            paddingBottom: theme.spacing[4],
            gap: theme.spacing[2],
          }}
        >
          {children}
        </View>
      ) : null}
    </View>
  );
}
