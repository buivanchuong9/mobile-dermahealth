import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useReducedMotion } from '@design-system/motion';
import { useTheme } from '@design-system/theme';
import { useAppSession } from '../providers/AppSessionProvider';
import { MainTabs } from './MainTabs';
import {
  ForgotPasswordRoute,
  OnboardingRoute,
  RegisterRoute,
  SignInRoute,
  WelcomeRoute,
} from './screens/authScreens';
import {
  AppointmentDetailRoute,
  BookAppointmentRoute,
  BookingConfirmationRoute,
  QueueRoute,
} from './screens/appointmentScreens';
import {
  AssessmentHistoryRoute,
  ChatRoute,
  ConversationListRoute,
  RecordDetailRoute,
  SkinAssessmentRoute,
} from './screens/careScreens';
import {
  AccessibilitySettingsRoute,
  GuideRoute,
  NotificationPreferencesRoute,
  NotificationsRoute,
  PrivacyRoute,
  SkinProfileRoute,
} from './screens/settingsScreens';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useTheme();
  const reducedMotion = useReducedMotion();
  const { onboardingCompleted, session } = useAppSession();

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background.secondary,
      card: theme.colors.surface.primary,
      text: theme.colors.text.primary,
      primary: theme.colors.brand.primary,
      border: theme.colors.border.default,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: reducedMotion ? 'none' : 'slide_from_right',
        }}
      >
        {!onboardingCompleted ? (
          <Stack.Screen name="Onboarding" component={OnboardingRoute} />
        ) : session === null ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeRoute} />
            <Stack.Screen name="SignIn" component={SignInRoute} />
            <Stack.Screen name="Register" component={RegisterRoute} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordRoute}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="BookAppointment"
              component={BookAppointmentRoute}
            />
            <Stack.Screen
              name="BookingConfirmation"
              component={BookingConfirmationRoute}
            />
            <Stack.Screen
              name="AppointmentDetail"
              component={AppointmentDetailRoute}
            />
            <Stack.Screen name="Queue" component={QueueRoute} />
            <Stack.Screen
              name="SkinAssessment"
              component={SkinAssessmentRoute}
            />
            <Stack.Screen
              name="AssessmentHistory"
              component={AssessmentHistoryRoute}
            />
            <Stack.Screen name="RecordDetail" component={RecordDetailRoute} />
            <Stack.Screen
              name="ConversationList"
              component={ConversationListRoute}
            />
            <Stack.Screen name="Chat" component={ChatRoute} />
            <Stack.Screen name="Notifications" component={NotificationsRoute} />
            <Stack.Screen
              name="NotificationPreferences"
              component={NotificationPreferencesRoute}
            />
            <Stack.Screen name="SkinProfile" component={SkinProfileRoute} />
            <Stack.Screen name="Guide" component={GuideRoute} />
            <Stack.Screen name="Privacy" component={PrivacyRoute} />
            <Stack.Screen
              name="AccessibilitySettings"
              component={AccessibilitySettingsRoute}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
