import { app } from './app';
import { appointments } from './appointments';
import { assessment } from './assessment';
import { auth } from './auth';
import { chat } from './chat';
import { common } from './common';
import { navigation } from './navigation';
import { notifications } from './notifications';
import { onboarding } from './onboarding';
import { journey } from './journey';
import { queue } from './queue';
import { home } from './home';
import { records } from './records';
import { settings } from './settings';
import { skinProfile } from './skinProfile';

export const vi = {
  app,
  appointments,
  assessment,
  auth,
  chat,
  common,
  navigation,
  notifications,
  onboarding,
  journey,
  queue,
  home,
  records,
  settings,
  skinProfile,
} as const;
