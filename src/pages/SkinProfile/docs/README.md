# Skin Profile

Lets the user declare their own skin type and general concerns. It is
self-reported information, **not a diagnosis**, and produces no advice.

| Layer          | Contents                                                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `domain`       | `SkinProfile` entity, `SkinType`/`SkinConcern` closed lists, validation rules (`skinProfileRules`), `SkinProfileRepository` interface. No framework imports. |
| `application`  | `createSkinProfileUseCases`: `load`, `save`, `remove`, returning `Result<_, AppError>`.                                                                      |
| `data`         | Repository over `KeyValueStorage`, one versioned JSON document (`schemaVersion: 1`).                                                                         |
| `presentation` | `SkinProfileScreen`, `SkinTypeSelector`, `SkinConcernCard`, `useSkinProfile`.                                                                                |

Public API: `src/pages/SkinProfile/index.ts` only.

## Storage behavior (see docs/security/data-storage-policy.md)

- Stored: `skinType`, `concerns`, `updatedAt`, `schemaVersion`. Nothing else.
- Missing data = empty state. Corrupt or newer-version data = read error; it is
  never overwritten, saving is refused until the user explicitly deletes it.
- Raw JSON parse errors are never kept; logs carry only error codes.

## Not implemented (out of scope)

Photos, AI analysis, treatment suggestions, backend sync, notes, allergies.
