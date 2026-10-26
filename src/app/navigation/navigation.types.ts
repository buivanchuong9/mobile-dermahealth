import type { NavigatorScreenParams } from '@react-navigation/native';
import type { BookingMode } from '@modules/appointments';

export type MainTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Journey: undefined;
  Records: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  BookAppointment: { readonly mode?: BookingMode } | undefined;
  BookingConfirmation: {
    readonly appointmentId: string;
    readonly rescheduled: boolean;
  };
  AppointmentDetail: { readonly appointmentId: string };
  Queue: undefined;
  SkinAssessment: undefined;
  AssessmentHistory: undefined;
  RecordDetail: { readonly recordId: string };
  ConversationList: undefined;
  Chat: { readonly conversationId: string };
  Notifications: undefined;
  NotificationPreferences: undefined;
  SkinProfile: undefined;
  Guide: undefined;
  Privacy: undefined;
  AccessibilitySettings: undefined;
};
