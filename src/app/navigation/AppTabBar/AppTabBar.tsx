import { StyleSheet, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MIN_TOUCH_TARGET } from '@utils/accessibility';
import { Icon, PressableScale, Typography } from '@components/primitives';
import { useTheme } from '@styles/theme';
import { translate } from '@i18n';
import type { MainTabParamList } from '../navigation.types';
import { TAB_ICON } from './AppTabBar.constants';

export function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={translate('navigation.tabBarLabel')}
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(insets.bottom, theme.spacing[2]),
          paddingTop: theme.spacing[2],
          backgroundColor: theme.colors.surface.primary,
          borderTopColor: theme.colors.border.default,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const name = route.name as keyof MainTabParamList;
        const focused = state.index === index;
        const label = translate(`navigation.tabs.${name}`);
        const color = focused
          ? theme.colors.brand.primary
          : theme.colors.text.secondary;
        return (
          <PressableScale
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={label}
            accessibilityState={{ selected: focused }}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={styles.tab}
            testID={`tab-${name}`}
          >
            <Icon
              name={TAB_ICON[name]}
              size={22}
              color={color}
              strokeWidth={focused ? 2.5 : 2}
            />
            <Typography
              variant="caption"
              tone={focused ? 'brand' : 'secondary'}
            >
              {label}
            </Typography>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth },
  tab: {
    flex: 1,
    minHeight: MIN_TOUCH_TARGET + 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
});
