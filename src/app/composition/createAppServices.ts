import type { AlertPlayer, AppError, Result } from '@core/contracts';
import { createDemoClock } from '@core/clock';
import type { DemoClock } from '@core/clock';
import { createDeviceAlertPlayer } from '@platform/alerts';
import { createMockAppointmentRepository } from '@modules/appointments';
import type { Appointment, AppointmentRepository } from '@modules/appointments';
import { createMockAuthService } from '@modules/authentication';
import type { AuthService } from '@modules/authentication';
import { createMockChatRepository } from '@modules/chat';
import type { ChatRepository } from '@modules/chat';
import { createMockRecordRepository } from '@modules/medical-records';
import type { RecordRepository } from '@modules/medical-records';
import { createMockNotificationRepository } from '@modules/notifications';
import type { NotificationRepository } from '@modules/notifications';
import { createMockQueueRepository } from '@modules/queue';
import type { QueueRepository } from '@modules/queue';
import {
  createMockAssessmentHistoryRepository,
  createMockSkinAssessmentService,
} from '@modules/skin-assessment';
import type {
  AssessmentHistoryRepository,
  SkinAssessmentService,
} from '@modules/skin-assessment';
import type { SkinProfileUseCases } from '@modules/skin-profile';
import { translate } from '@shared/localization';
import { appConfig } from '../configuration';
import type { AppConfig } from '../configuration';
import { createSkinProfileUseCasesForApp } from './createSkinProfileUseCasesForApp';

export type AppServices = {
  readonly clock: DemoClock;
  readonly auth: AuthService;
  readonly appointments: AppointmentRepository;
  readonly queue: QueueRepository;
  readonly notifications: NotificationRepository;
  readonly records: RecordRepository;
  readonly chat: ChatRepository;
  readonly assessmentService: SkinAssessmentService;
  readonly assessmentHistory: AssessmentHistoryRepository;
  readonly skinProfile: SkinProfileUseCases;
  /** Creates the simulated queue ticket for an appointment that was checked in. */
  readonly issueQueueTicket: (appointment: Appointment) => Promise<void>;
  /** Checks in and creates the queue ticket in one step. */
  readonly checkIn: (
    appointmentId: string,
  ) => Promise<Result<Appointment, AppError>>;
};

export type CreateAppServicesOptions = {
  readonly config?: AppConfig;
  readonly alertPlayer?: AlertPlayer;
};

/**
 * Wires every simulated repository together. This is the only place where
 * modules are connected to each other and to platform adapters.
 */
export function createAppServices({
  config = appConfig,
  alertPlayer = createDeviceAlertPlayer(),
}: CreateAppServicesOptions = {}): AppServices {
  const clock = createDemoClock();
  const appointments = createMockAppointmentRepository(clock);
  const queue = createMockQueueRepository(clock);
  const notifications = createMockNotificationRepository(clock);

  // Simulated queue events become in-app notifications and a device cue,
  // depending on the user's (preview) preferences.
  queue.onEvent(async event => {
    const preferences = await notifications.getPreferences();
    if (!preferences.ok) {
      return;
    }
    if (preferences.value.queueUpdates) {
      const params = { ticket: event.ticketNumber, room: event.room };
      await notifications.add(
        event.kind === 'upcoming_turn'
          ? {
              kind: 'queue_update',
              title: translate('notifications.queue.upcomingTitle'),
              body: translate('notifications.queue.upcomingBody', params),
            }
          : {
              kind: 'queue_update',
              title: translate('notifications.queue.calledTitle'),
              body: translate('notifications.queue.calledBody', params),
            },
      );
    }
    if (preferences.value.alertVibration) {
      await alertPlayer.play(event.kind);
    }
  });

  const issueQueueTicket = async (appointment: Appointment) => {
    await queue.issueTicket({
      appointmentId: appointment.id,
      clinicName: appointment.clinicName,
      department: appointment.department,
      room: appointment.room,
    });
  };

  return {
    clock,
    auth: createMockAuthService({
      demoAccount: config.demoAccount,
      latencyMs: config.simulation.latencyMs,
    }),
    appointments,
    queue,
    notifications,
    records: createMockRecordRepository(clock),
    chat: createMockChatRepository(clock),
    assessmentService: createMockSkinAssessmentService(clock, {
      durationMs: config.simulation.assessmentDurationMs,
    }),
    assessmentHistory: createMockAssessmentHistoryRepository(clock),
    skinProfile: createSkinProfileUseCasesForApp(config.logLevel),
    issueQueueTicket,
    async checkIn(appointmentId) {
      const result = await appointments.checkIn(appointmentId);
      if (result.ok) {
        await issueQueueTicket(result.value);
      }
      return result;
    },
  };
}
