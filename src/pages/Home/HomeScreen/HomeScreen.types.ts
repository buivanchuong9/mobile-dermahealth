import type { Clock } from '@model/common';
import type { SkinProfileUseCases } from '@pages/SkinProfile';
import type { DashboardRepositories } from '../hooks/useDashboardData';
import type { HomeActions } from '../types';

export type HomeScreenProps = {
  readonly userName: string;
  readonly clock: Clock;
  readonly repositories: DashboardRepositories;
  readonly skinProfileUseCases: SkinProfileUseCases;
  readonly actions: HomeActions;
};
