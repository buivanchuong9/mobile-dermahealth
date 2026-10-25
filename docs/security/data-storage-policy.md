# Data storage and privacy policy

Status: applies from Phase 3.3. Scope: data handled by the mobile app today
(Skin Profile). Any new data class needs an entry here **before** code is
written for it.

## Principles
1. Collect the minimum. A field not listed below is not stored.
2. Nothing leaves the device. There is no backend, network call, analytics,
   crash reporting or tracking in this app; do not add any without an updated
   policy and explicit approval.
3. Self-reported information is not a diagnosis. The UI and the code never
   present it as one and never derive treatment advice from it.
4. When this policy does not clearly allow storing a field, the field is **not
   stored** until a decision is recorded here.

## Data classes

| Class | Examples | Allowed in AsyncStorage | Notes |
|---|---|---|---|
| A. Non-sensitive app data | UI preferences, locale | Yes | |
| B. Low-sensitivity self-reported skincare preferences | Skin type and general skin concerns chosen from a fixed list | **Yes, only the fields listed below** | Unencrypted; see limits |
| C. Sensitive health or personal data | Skin photos, diagnoses, medical conditions, allergies, medications, symptom descriptions, free-text notes, date of birth, name, contact details | **No** | Not collected until a secure-storage decision exists |
| D. Credentials | Passwords, tokens, API keys | **No** (use secure storage, e.g. Keychain/Keystore, when authentication is built) | Never in source code |

## Skin Profile: stored fields (class B)

| Field | Type | Stored? | Reason |
|---|---|---|---|
| `skinType` | one of `normal`, `dry`, `oily`, `combination`, `sensitive`, `unsure` | Yes | Closed list of everyday skincare terms |
| `concerns` | subset of a fixed list: `acne`, `dryness`, `oiliness`, `sensitivity`, `dark_spots`, `fine_lines`, `large_pores`, `dullness` | Yes | Closed list, no free text, no medical condition names |
| `updatedAt` | ISO 8601 timestamp | Yes | Shows the user when they last saved |
| `schemaVersion` | integer | Yes | Detect incompatible data |

Explicitly **not collected or stored**: photos, free-text notes, named medical
conditions (for example eczema, rosacea, psoriasis), allergies, medications,
age/birth date, gender, name, location. If a future need arises, the field
must be added to this table with a storage decision first.

A profile exists only if the user pressed Save. The app never creates default
or placeholder profiles and never stores an answer the user did not give.

## Logging, analytics and error messages
- Skin Profile values are never written to logs, analytics or error messages.
  Error messages are fixed English developer strings; user-facing messages are
  chosen from the error `code`.
- Raw exceptions from JSON parsing are not kept as `cause` (they can quote the
  data). Storage errors from the platform may be kept as `cause` because they
  carry no profile content.
- The shared logger redacts known sensitive keys and patterns, but redaction is
  a safety net, not permission to log profile data.

## Reading, writing and failure behavior
- Missing data means "no profile yet" (an empty state), not an error.
- Corrupted JSON, an invalid structure, or a `schemaVersion` newer than the app
  supports is a read error. The app does **not** guess, migrate silently or
  overwrite it.
- Saving is refused while unreadable or newer-version data exists. The user can
  explicitly delete the stored profile to start again (with a confirmation).
- Write failures are reported to the user, and nothing is retried silently.

## Deletion and user control
- The user can delete the stored Skin Profile from the Skin Profile screen.
  Deletion removes the stored key entirely.
- Uninstalling the app removes AsyncStorage data on both platforms.
- Saving and deleting are always user-initiated.

## Limits of device-only storage (known and accepted for class B)
- AsyncStorage is **not encrypted**. Anyone with access to the unlocked device,
  a device backup, a rooted/jailbroken device or forensic tools may read it.
- OS backups (iCloud/iTunes, Android Auto Backup) may include app storage
  unless excluded; backup exclusion has **not** been configured yet.
- Data is not synchronized and is lost if the app data is cleared or the device
  is lost. There is no recovery.
- Because of these limits, class C and D data must never use AsyncStorage.

## Simulated demo data (UI phase)
The app contains fictional appointments, queue tickets, medical records, chat
messages, notifications and assessment results so the interface can be
reviewed. Rules for this data:
- It lives only in memory and is recreated from fixed seeds at every launch;
  nothing is written to AsyncStorage or any other store.
- It is fictional (invented people, clinic, medications) and every screen that
  shows it carries a "simulated data" notice. It must never be presented as a
  real record.
- Real health data (class C) is still **not** collected: the skin assessment
  keeps no photos, and the photo step does not access the camera or library.
- The simulated sign-in compares credentials in memory and discards them; real
  passwords must never be logged, stored or sent. Replacing it with real
  authentication requires secure storage for tokens (class D) first.
- Switching any repository to a real backend requires updating this policy
  (data classes, retention, consent) before code is written.
