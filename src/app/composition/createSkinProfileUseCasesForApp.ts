import { consoleLogSink, createLogger } from '@core/logging';
import {
  createSkinProfileRepository,
  createSkinProfileUseCases,
} from '@modules/skin-profile';
import type { SkinProfileUseCases } from '@modules/skin-profile';
import { createLocalKeyValueStorage } from '@platform/storage';

/** Wires the Skin Profile module to device storage (the only place that does). */
export function createSkinProfileUseCasesForApp(): SkinProfileUseCases {
  const logger = createLogger({ sink: consoleLogSink, minLevel: 'warn' });
  const repository = createSkinProfileRepository({
    storage: createLocalKeyValueStorage(),
    logger,
  });
  return createSkinProfileUseCases({ repository });
}
