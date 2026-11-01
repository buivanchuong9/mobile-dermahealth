import type { AlertPlayer, AppError, Result } from '@model/common';
import { createAccessTokenStore, createApiClient } from '@services/api';
import type { AccessTokenStore, ApiClient } from '@services/api';
import { createDemoClock } from '@utils/clock';
import type { DemoClock } from '@utils/clock';
import { buildQueueSpeech } from './queueSpeech';
import { createDeviceAlertPlayer } from '@services/alerts';
import { createMockAppointmentRepository } from '@pages/Appointments';
import type { Appointment, AppointmentRepository } from '@pages/Appointments';
import { createMockAuthService } from '@pages/Authentication';
import type { AuthService } from '@pages/Authentication';
import { createMockChatRepository } from '@pages/Chat';
import type { ChatRepository } from '@pages/Chat';
import { createMockRecordRepository } from '@pages/MedicalRecords';
import type { RecordRepository } from '@pages/MedicalRecords';
import { createMockNotificationRepository } from '@pages/Notifications';
import type { NotificationRepository } from '@pages/Notifications';
import { createMockQueueRepository } from '@pages/Queue';
import type { QueueRepository } from '@pages/Queue';
import {
  createMockAssessmentHistoryRepository,
  createMockSkinAssessmentService,
} from '@pages/SkinAssessment';
import type {
  AssessmentHistoryRepository,
  SkinAssessmentService,
} from '@pages/SkinAssessment';
import type { SkinProfileUseCases } from '@pages/SkinProfile';
import { translate } from '@i18n';
import { appConfig } from '../../configs/appConfig';
import type { AppConfig } from '../../configs/appConfig';
import { createSkinProfileUseCasesForApp } from './createSkinProfileUseCasesForApp';

export type AppServices = {
  /** Calls backend endpoints declared in `@services/api` (`urlsApi`). */
  readonly api: ApiClient;
  /** Where sign-in stores the access token so `api` can attach it. */
  readonly accessToken: AccessTokenStore;
  readonly clock: DemoClock;
  readonly auth: AuthService;
  readonly appointments: AppointmentRepository;
  readonly queue: QueueRepository;
  readonly notifications: NotificationRepository;
  readonly records: RecordRepository;
  readonly chat: ChatRepository;
  readonly assessmentService: SkinAssessmentService;
  readonly assessmentHistory: AssessmentHistoryRepository;
  readonly alertPlayer: AlertPlayer;
  readonly skinProfile: SkinProfileUseCases;
  /** Creates the simulated queue ticket for an appointment that was checked in. */
  readonly issueQueueTicket: (appointment: Appointment) => Promise<void>;
  /** Plays the "your turn" cue for the active ticket, or a sample one. */
  readonly testQueueAlert: () => Promise<boolean>;
  /** Checks in and creates the queue ticket in one step. */
  readonly checkIn: (
    appointmentId: string,
  ) => Promise<Result<Appointment, AppError>>;
};

export type CreateAppServicesOptions = {
  readonly config?: AppConfig;
  readonly alertPlayer?: AlertPlayer;
};

const SAMPLE_TICKET = {
  ticketNumber: 'A-024',
  clinicName: 'Phòng khám Da liễu Dermahealth',
  department: 'Khoa Da liễu',
  room: 'Phòng 302, tầng 3, khu B',
  doctorName: 'bác sĩ Nguyễn Văn A',
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
  const accessToken = createAccessTokenStore();
  const api = createApiClient({
    baseUrl: config.api.baseUrl,
    timeoutMs: config.api.timeoutMs,
    tokens: accessToken,
  });
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
    const speaks = preferences.value.alertSound;
    await alertPlayer.play(event.kind, {
      sound: speaks && event.kind === 'turn_called',
      vibration: preferences.value.alertVibration,
      speech: speaks ? buildQueueSpeech(event.kind, event) : undefined,
    });
  });

  const testQueueAlert = async () => {
    const current = await queue.getSnapshot();
    const ticket = current.ok ? current.value?.ticket : undefined;
    return alertPlayer.play('turn_called', {
      sound: true,
      vibration: false,
      speech: buildQueueSpeech('turn_called', {
        ticketNumber: ticket?.number ?? SAMPLE_TICKET.ticketNumber,
        clinicName: ticket?.clinicName ?? SAMPLE_TICKET.clinicName,
        department: ticket?.department ?? SAMPLE_TICKET.department,
        room: ticket?.room ?? SAMPLE_TICKET.room,
        doctorName: ticket?.doctorName ?? SAMPLE_TICKET.doctorName,
      }),
    });
  };

  const issueQueueTicket = async (appointment: Appointment) => {
    await queue.issueTicket({
      appointmentId: appointment.id,
      clinicName: appointment.clinicName,
      department: appointment.department,
      room: appointment.room,
      doctorName: appointment.doctorName,
    });
  };

  return {
    api,
    accessToken,
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
    alertPlayer,
    skinProfile: createSkinProfileUseCasesForApp(config.logLevel),
    issueQueueTicket,
    testQueueAlert,
    async checkIn(appointmentId) {
      const result = await appointments.checkIn(appointmentId);
      if (result.ok) {
        await issueQueueTicket(result.value);
      }
      return result;
    },
  };
}
