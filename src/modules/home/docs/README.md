# Home

Presentation-only module. Layout is derived from the Stitch "Trang Chủ Sức
Khỏe" screen, restyled with the Dermahealth tokens (white/blue).

## What is real

- **Skin profile card**: reads the saved profile through the public API of
  `@modules/skin-profile` (loading, empty, filled, read-error states).
- **Appointments / doctor advice**: honest empty states; those features do not
  exist yet.

## Deliberately not built (policy: docs/security/data-storage-policy.md)

Medication reminders, vital signs, lab results, patient identity and an
emergency hotline from the Stitch design. They are class C health data (or
unverified content) with no storage decision, no backend and no source of
truth. Do not add them with sample data.
