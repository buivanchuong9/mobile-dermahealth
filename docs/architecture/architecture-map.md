# Architecture map

Companion to `code-organization.md` (the rules). This file shows what exists.

## Layers
```text
src/
├── app/            composition, providers, navigation (routes adapt modules to screens)
├── core/           contracts, logging, demo clock, fictional demo cast (no React)
├── design-system/  tokens, theme, primitives and business-agnostic building blocks
├── modules/        12 feature modules (below)
├── platform/       storage (AsyncStorage) and alerts (vibration) adapters
└── shared/         localization (vi), hooks (useAsyncQuery), utilities (local date/time)
```
Verified by a script over 652 source files: no runtime import cycles, no deep
imports into another module, no layer violations (core/shared/design-system/
platform/module rules, modules never import `app` or `platform`).

## app
```text
app/
├── App/                          root component
├── composition/                  createAppServices (wires every simulated repository)
├── providers/                    AppServicesProvider/, AppSessionProvider/ (context + hooks/)
└── navigation/
    ├── RootNavigator/  MainTabs/  AppTabBar/  BackBar/
    ├── hooks/                    useRootNavigation, useAppActions
    ├── navigation.types.ts       RootStackParamList, MainTabParamList
    └── routes/<module>/XRoute.tsx   25 one-component route adapters + routes/index.ts
```

## design-system (31 components)
| Folder | Components |
|---|---|
| `primitives/` | `Button` (+ platform press feedback), `Typography`, `Icon` |
| `inputs/` | `TextField` (+ `PasswordVisibilityToggle`, `FieldMessage`), `SelectableCard` (+ `SelectionIndicator`), `SwitchRow` |
| `surfaces/` | `Card`, `SectionCard`, `ScreenContainer`, `CollapsibleSection` |
| `navigation/` | `ScreenHeader`, `SegmentedTabs` |
| `data-display/` | `StatusBadge`, `Avatar`, `Chip`, `ListItem`, `TimelineItem` (+ `TimelineRail`) |
| `feedback/` | `Banner`, `SimulationBanner`, `EmptyState`, `Skeleton`, `SkeletonCard`, `ProgressBar`, `SuccessMark` |
| `overlays/` | `ConfirmDialog` |
| `motion/` | `FadeInView`, `useReducedMotion` |
| `theme/` | `ThemeProvider` (+ `useTheme`), `lightTheme`, `contrastPairs` |
| `tokens/`, `accessibility/` | colors, typography, spacing, radius, elevation, motion; contrast helpers |

Animations live in `*.animations.ts` next to their component (`FadeInView`,
`Skeleton`, `ProgressBar`, `SuccessMark`, `CollapsibleSection`, `PageDots`,
`TicketHeroCard`).

## Feature modules
| Module | Public API (`index.ts`) | Main components |
|---|---|---|
| `onboarding` | `OnboardingScreen`, `GuideScreen` | `OnboardingSlidePage`, `OnboardingActions`, `PageDots`, `SlideIllustration` |
| `authentication` | `WelcomeScreen`, `SignInScreen`, `RegisterScreen`, `ForgotPasswordScreen`, `createMockAuthService`, `AuthService` | `AuthScreenLayout`, `RegistrationFields`, `TermsConsent` |
| `home` | `HomeScreen`, `HomeActions` | `WelcomeHeader`, `NextStepCard`, `AppointmentSummary`, `QueueStatusCard`, `QuickActions`, `ReminderList`, `RecentVisits`, `FirstTimeTip`, `SkinProfileSummaryCard` |
| `appointments` | list/booking/detail/confirmation screens, `createMockAppointmentRepository`, `AppointmentCard`, rules (`canCheckIn`, `pickNextAppointment`...) | `BookingSection`, `DoctorSection`, `TimeSection`, `TimeSlotGrid` (+ `SlotGroup`, `SlotButton`), `AppointmentInfoCard`, `AppointmentActions`, `CancelAppointmentDialog` |
| `queue` | `QueueScreen`, `createMockQueueRepository`, queue types | `TicketHeroCard`, `QueueStats` (+ `QueueStat`), `GuidanceCard`, `SimulationPanel`, `AlertSettings` |
| `journey` | `CareJourneyScreen`, `buildCareJourney`, `routeForNextAction` | `NextActionCard`, `JourneyStepList` |
| `skin-assessment` | `SkinAssessmentFlowScreen`, `AssessmentHistoryScreen`, mock service and history | `IntroStep`, `CaptureStep`, `QuestionStep` (+ 4 question components), `AnalyzingStep`, `ResultStep` |
| `medical-records` | `RecordsScreen`, `RecordDetailScreen`, `createMockRecordRepository` | `RecordTimelineItem`, `RecordFilterChips`, `RecordSourceBadge`, `DetailSection`, `VisitRecordDetails`... |
| `chat` | `ConversationListScreen`, `ChatScreen`, `createMockChatRepository` | `ConversationRow`, `MessageBubble`, `MessageComposer`, `QuickReplies` |
| `notifications` | `NotificationCenterScreen`, `NotificationPreferencesScreen`, `createMockNotificationRepository` | `NotificationItem`, `NotificationGroup` |
| `settings` | `ProfileScreen`, `PrivacyScreen`, `AccessibilitySettingsScreen` | (screens only) |
| `skin-profile` | `SkinProfileScreen`, use cases, repository, types | `SkinTypeSelector`, `SkinConcernCard`, `SkinTypeSection`, `SkinConcernSection`, `SkinProfileActions` |

Module data layout: `data/mock/*.mock.ts` (datasets), `data/repositories/`
(implementations), `data/services/` (non-repository services), interfaces in
`domain/`.

## Architectural exceptions and rationale
1. **No `shared/components`.** Business-agnostic composites (`SectionCard`,
   `EmptyState`, `ListItem`...) live in `design-system`, the structure approved
   in Phase 2. A second UI location would duplicate it. Revisit if a component
   must be shared by features but is not design-system material.
2. **`shared/hooks/useAsyncQuery` imports React**, unlike the rest of `shared`.
   The older `skin-profile/tests/architecture.test.js` still forbids React in
   `shared` and is therefore stale (not edited, not run, per instructions).
3. **Module-level hooks** (`presentation/hooks/`) stay where several files of the
   module use them or where the hook is the screen's whole state; hooks used by a
   single component are co-located (`AnalyzingStep/hooks`, `SkinProfileSummaryCard/hooks`).
4. **Small style/constant sets stay inline** (fewer than 3 style entries, one
   trivial constant) to avoid files with no real responsibility.
5. **Single cohesive stores are not split**: `createMockAppointmentRepository`
   (186 lines), `useAssessmentFlow` (186), `useSkinProfile` (126) are one state
   machine each.
6. **Data-only files exceed 100 lines by nature**: `iconMap.ts` (icon registry),
   `contrastPairs.ts`, localization dictionaries.
7. **Generic names accepted by convention**: i18n namespace `common`,
   folder `shared/utilities` (its only file is `localDateTime.ts`).
8. **Platform split at the leaf**: `Button` is shared; only
   `Button.feedback.ts` / `Button.feedback.android.ts` differ.
9. `home` and `journey` read other modules only through their public APIs;
   navigation knowledge stays in `app/navigation/routes`.
