import { createAppError, err, ok } from '@core/contracts';
import type { AppError, Result } from '@core/contracts';
import type {
  SkinProfile,
  SkinProfileDraft,
} from '../../domain/entities/SkinProfile';
import type { SkinProfileRepository } from '../../domain/repositories/SkinProfileRepository';
import { createSkinProfile } from '../../domain/rules/skinProfileRules';

export interface SkinProfileUseCases {
  load(): Promise<Result<SkinProfile | null, AppError>>;
  save(draft: SkinProfileDraft): Promise<Result<SkinProfile, AppError>>;
  remove(): Promise<Result<void, AppError>>;
}

export type SkinProfileUseCaseDependencies = {
  readonly repository: SkinProfileRepository;
  readonly now?: () => Date;
};

export function createSkinProfileUseCases({
  repository,
  now = () => new Date(),
}: SkinProfileUseCaseDependencies): SkinProfileUseCases {
  return {
    load: () => repository.get(),

    async save(draft) {
      const created = createSkinProfile(draft, now());
      if (!created.ok) {
        // Issue details stay out of the message; the UI validates field by
        // field with the same domain rules before calling this use case.
        return err(createAppError('validation', 'Skin profile is invalid'));
      }
      const saved = await repository.save(created.value);
      return saved.ok ? ok(created.value) : saved;
    },

    remove: () => repository.clear(),
  };
}
