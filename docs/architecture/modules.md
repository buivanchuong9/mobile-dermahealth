# Features

A feature is one name spread over `pages/<Feature>`, `model/<feature>`,
`services/<feature>`, `utils/<feature>` and `mocks/<feature>`. Its screens and
factories are exposed through `pages/<Feature>/index.ts`; other features and
the app import only from `@pages/<Feature>`.

| Feature | Responsibility | Data source |
|---|---|---|
| `onboarding` | Intro slides, in-app guide | static |
| `authentication` | Welcome, sign-in, register, forgot password | simulated `AuthService` |
| `home` | Dashboard: next step, appointment, queue, shortcuts, reminders | composes other modules' repositories |
| `appointments` | List, booking, reschedule, cancel, detail, check-in | simulated `AppointmentRepository` |
| `queue` | Ticket, ahead count, ETA, simulated turn calling, alert settings | simulated `QueueRepository` |
| `journey` | Care journey steps and next action (pure rules + screen) | derived from appointments + queue |
| `skin-assessment` | Consent, photo entry points, questionnaire, simulated result, history | rule-based `SkinAssessmentService` |
| `medical-records` | Timeline, search/filter, detail with source labels | simulated `RecordRepository` |
| `chat` | Conversations and simulated replies | simulated `ChatRepository` |
| `notifications` | Notification center and preferences (preview only) | simulated `NotificationRepository` |
| `settings` | Profile, privacy, accessibility, sign-out | static + session |
| `skin-profile` | Self-reported skin type/concerns (**real** local storage) | `KeyValueStorage` (AsyncStorage) |

Dependency notes: `journey` and `home` read other features only through their
public APIs; `appointments`, `queue`, `records`, `chat`, `notifications` do not
import each other.
