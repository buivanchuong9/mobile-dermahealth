# Platform resolution

Default implementation is shared. A `.ios.*` / `.android.*` file is added only
when behavior or experience genuinely differs, and only for the smallest unit
that differs, so the rest stays shared.

## Button
Only press feedback differs, so `Button.tsx` is shared and the difference is
isolated in a tiny module with the same signature:

| File | Used on | Behavior |
|---|---|---|
| `Button.feedback.ts` | iOS (default) | dims to 70% opacity while pressed |
| `Button.feedback.android.ts` | Android | Material ripple tinted with the label color |
| `Button.types.ts` | both | shared contract (`ButtonPressFeedback`) |

Rules: the two files must not import each other; both satisfy the same type;
TypeScript only sees the default file, so keep signatures identical.
A new override must add a row to `scripts/verify-platform-resolution.js`.
