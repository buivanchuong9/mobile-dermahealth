# Simulated services and future API integration

Every module that shows clinic data depends on a **repository or service
interface** in `model/<feature>/`; the UI never imports mock datasets.

| Interface | Simulated by | Swap point |
|---|---|---|
| `AppointmentRepository` | `createMockAppointmentRepository(clock)` | `createAppServices.ts` |
| `QueueRepository` | `createMockQueueRepository(clock)` | `createAppServices.ts` |
| `NotificationRepository` | `createMockNotificationRepository(clock)` | `createAppServices.ts` |
| `RecordRepository` | `createMockRecordRepository(clock)` | `createAppServices.ts` |
| `ChatRepository` | `createMockChatRepository(clock)` | `createAppServices.ts` |
| `AuthService` | `createMockAuthService()` | `createAppServices.ts` |
| `SkinAssessmentService` | `createMockSkinAssessmentService(clock)` | `createAppServices.ts` |
| `AlertPlayer` | `createDeviceAlertPlayer()` (vibration only) | `services/alerts` |

To integrate a real backend: implement the interface (HTTP adapter returning
`Result<_, AppError>`), construct it in `createAppServices.ts`, and update
`docs/security/data-storage-policy.md` first. Screens and hooks do not change.

## How simulation stays deterministic
- `createDemoClock()` starts at a fixed Monday morning and only moves when the
  queue simulation advances, so every launch is identical.
- Dates are local wall-clock strings (`YYYY-MM-DDTHH:mm`, see
  `utils/localDateTime`), independent of the device timezone.
- Availability, queue progress and assessment results are pure functions.

## Known simulated behavior
Queue turn calling, chat replies, notifications, sign-in, assessment results
and "photo" selection are simulated and labeled as such in the UI.
