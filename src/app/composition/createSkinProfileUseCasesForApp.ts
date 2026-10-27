import type { LogLevel } from '@model/common';
import { consoleLogSink, createLogger } from '@utils/logging';
import {
  createSkinProfileRepository,
  createSkinProfileUseCases,
} from '@pages/SkinProfile';
import type { SkinProfileUseCases } from '@pages/SkinProfile';
import { createLocalKeyValueStorage } from '@services/storage';

/** Wires the Skin Profile module to device storage (the only place that does). */
export function createSkinProfileUseCasesForApp(
  logLevel: LogLevel,
): SkinProfileUseCases {
  const logger = createLogger({ sink: consoleLogSink, minLevel: logLevel });
  const repository = createSkinProfileRepository({
    storage: createLocalKeyValueStorage(),
    logger,
  });
  return createSkinProfileUseCases({ repository });
}
