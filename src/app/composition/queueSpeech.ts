import { translate } from '@i18n';
import type { AlertKind } from '@model/common';

export type QueueSpeechInfo = {
  readonly ticketNumber: string;
  readonly clinicName: string;
  readonly department: string;
  readonly room: string;
  readonly doctorName: string;
};

/** "A-024" is read letter by letter and digit by digit: "A, 0 2 4". */
const spellTicket = (number: string) =>
  number.replace('-', ', ').replace(/\d/g, digit => ` ${digit}`);

/** Sentence read aloud so patients who cannot read the ticket still get it. */
export function buildQueueSpeech(kind: AlertKind, info: QueueSpeechInfo) {
  return translate(
    kind === 'turn_called' ? 'queue.speech.called' : 'queue.speech.upcoming',
    {
      ticket: spellTicket(info.ticketNumber),
      clinic: info.clinicName,
      department: info.department,
      room: info.room,
      doctor: info.doctorName,
    },
  );
}
