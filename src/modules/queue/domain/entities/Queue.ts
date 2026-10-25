import type { LocalDateTime } from '@shared/utilities/localDateTime';

export type QueueStage =
  | 'waiting'
  | 'upcoming'
  | 'called'
  | 'in_consultation'
  | 'completed';

export type QueueGuidance =
  | 'wait'
  | 'prepare'
  | 'go_to_room'
  | 'in_consultation'
  | 'done';

export type QueueTicket = {
  readonly number: string;
  readonly appointmentId: string;
  readonly clinicName: string;
  readonly department: string;
  readonly room: string;
  readonly issuedAt: LocalDateTime;
};

export type QueueSnapshot = {
  readonly ticket: QueueTicket;
  readonly stage: QueueStage;
  readonly currentlyCalledNumber: string;
  readonly aheadCount: number;
  readonly estimatedWaitMinutes: number;
  readonly lastUpdatedAt: LocalDateTime;
  readonly guidance: QueueGuidance;
};

export type QueueEvent = {
  readonly kind: 'upcoming_turn' | 'turn_called';
  readonly ticketNumber: string;
  readonly room: string;
};

export type IssueTicketRequest = {
  readonly appointmentId: string;
  readonly clinicName: string;
  readonly department: string;
  readonly room: string;
};

export type QueueAlertSettings = {
  readonly notifications: boolean;
  readonly sound: boolean;
};
