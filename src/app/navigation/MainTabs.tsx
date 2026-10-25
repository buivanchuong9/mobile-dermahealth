import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AppTabBar } from './AppTabBar';
import {
  AppointmentsTab,
  HomeTab,
  JourneyTab,
  ProfileTab,
  RecordsTab,
} from './screens/tabScreens';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const renderTabBar = (props: BottomTabBarProps) => <AppTabBar {...props} />;

export function MainTabs() {
  return (
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Appointments" component={AppointmentsTab} />
      <Tab.Screen name="Journey" component={JourneyTab} />
      <Tab.Screen name="Records" component={RecordsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}
