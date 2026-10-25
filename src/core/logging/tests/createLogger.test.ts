import type { LogEntry } from '../../contracts';
import { createLogger } from '../createLogger';

function setup(minLevel?: 'debug' | 'info' | 'warn' | 'error') {
  const entries: LogEntry[] = [];
  const logger = createLogger({
    sink: { write: entry => entries.push(entry) },
    minLevel,
  });
  return { entries, logger };
}

test('redacts message and context before reaching the sink', () => {
  const { entries, logger } = setup();
  logger.info('saved for a@b.com', { symptoms: ['acne'], step: 2 });
  expect(entries).toEqual([
    {
      level: 'info',
      message: 'saved for [REDACTED]',
      context: { symptoms: '[REDACTED]', step: 2 },
    },
  ]);
});

test('drops entries below the minimum level', () => {
  const { entries, logger } = setup('warn');
  logger.debug('d');
  logger.info('i');
  logger.warn('w');
  logger.error('e');
  expect(entries.map(entry => entry.level)).toEqual(['warn', 'error']);
});

test('omits context when none is given', () => {
  const { entries, logger } = setup();
  logger.info('plain');
  expect(entries[0]).toEqual({ level: 'info', message: 'plain' });
});
