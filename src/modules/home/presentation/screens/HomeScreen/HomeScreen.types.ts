import type { Clock } from '@core/contracts';
import type { SkinProfileUseCases } from '@modules/skin-profile';
import type { DashboardRepositories } from '../../hooks/useDashboardData';
import type { HomeActions } from '../../types';

export type HomeScreenProps = {
  readonly userName: string;
  readonly clock: Clock;
  readonly repositories: DashboardRepositories;
  readonly skinProfileUseCases: SkinProfileUseCases;
  readonly actions: HomeActions;
};
