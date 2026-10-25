import type { AppError, Result } from '@core/contracts';
import type { SkinProfile } from '../entities/SkinProfile';

export interface SkinProfileRepository {
  /** Resolves to `null` when the user has never saved a profile. */
  get(): Promise<Result<SkinProfile | null, AppError>>;
  save(profile: SkinProfile): Promise<Result<void, AppError>>;
  clear(): Promise<Result<void, AppError>>;
}
