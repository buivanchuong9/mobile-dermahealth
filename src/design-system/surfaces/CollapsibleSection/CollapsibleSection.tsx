import { useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, View } from 'react-native';
import type { ReactNode } from 'react';
import { translate } from '@shared/localization';
import { MIN_TOUCH_TARGET } from '../../accessibility';
import { useReducedMotion } from '../../motion';
import { Icon, Typography } from '../../primitives';
import { useTheme } from '../../theme';

export type CollapsibleSectionProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly defaultExpanded?: boolean;
  readonly testID?: string;
};

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  testID,
}: CollapsibleSectionProps) {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggle = () => {
    if (!reducedMotion) {
      LayoutAnimation.configureNext({
        duration: theme.motion.duration.normal,
        update: { type: LayoutAnimation.Types.easeInEaseOut },
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
    }
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
      <Pressable
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
      </Pressable>
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

const styles = StyleSheet.create({
  card: { borderWidth: 1, overflow: 'hidden' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH_TARGET,
  },
  title: { flex: 1 },
});
