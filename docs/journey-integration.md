# Journey frontend integration

Added 2 October 2026. Frontend only; not an admin, dispatch service or government integration.

## Ownership and entry

`web/journey-model.js`, `web/journey.js`, `web/journey.css` own the additive `#journey` feature. The shared shell adds one navigation item and one discovery invitation. Existing discovery, voice, review, together and outing-plan state remain unchanged. Do not put journey data in `s.plan` or `s.done`.

`window.AddyJourney.mount(element, {lang})` and `unmount()` are the host adapter. No other host state is modified. English, Arabic and French are included. Local storage key `addy-journey-v1` is independently versioned; completion/doc readiness/help intent are separate. The UI clearly states device/browser-only saving and reports storage errors. Cross-device synchronization is not implemented. The journey has its own explicit clear-data control, separate from profile reset.

## Frontend capabilities

28 sourced task templates cover housing tenure/jurisdiction, relocation, settled needs and business situation. Unknown eligibility remains conditional. Plan essentials are preparation steps for the chosen plan, not a claim that every step is a universal legal requirement. Source research date is 2026-10-02, not a promise of continual verification. Refresh official conditions before relying on fees, identity documents or eligibility. No current prices, appointments or provider endorsements are fabricated.

Users can record done/not yet/in progress/not needed, check document readiness (no uploads), save a target date (no scheduled notification), select du/e& for official direct guidance and save an unsent help draft with preferred contact window in Abu Dhabi time. No personal contact details are collected and no request is dispatched. A user-reported done state is not an authority approval.

## Pending Bilal admin adapter

Reuse the platform's existing business and lead records. Do not introduce a parallel admin or directory. Final IDs, endpoint, auth and taxonomy need Bilal's actual implementation.

Proposed mapping: journeyId + stable requirementId (task.id) + section (task.section) + context revision + user-approved summary + request action + preferred contact window/timezone + consent receipt + idempotency key. Map proposed section/requirement strings to existing canonical admin IDs. An explicit review/submit UI is required before network dispatch. Return durable request ID/status/version; only then label received. Assignment/contact/appointment/resolution must come from actual events, not clicking a frontend button.

Eligibility: guidance can serve businesses arriving from anywhere; lead recipients must be onboarded businesses with verified Abu Dhabi operating presence and appropriate service scope. Enforce eligibility on the server as well as UI. No nationality restriction is implied. Commercial benefits must not influence regulatory necessity. Direct official-source links are not platform partner recommendations.

Admin intake permission is separate from disclosure to a provider. Before a business receives or can access personal information, show the exact business and fields and obtain purpose-specific user approval. No blanket marketing, child records, health details, identity documents or business secrets in generic leads. Preserve cancellation, duplicate prevention, failure reporting and receipt reconciliation. A draft is never a submission.

## Future services, not implemented

Durable authenticated accounts, admin case APIs, provider recipient verification, notifications/background reminders, document storage, live application status and transaction/booking services require separate implementation and testing. No production claims for those capabilities.

## Verification

Run `node tests/journey.test.cjs`, `node --check web/journey.js`, `node --check web/app.js`, and `node scripts/build-worker.mjs`. Source syntax and pure model tests pass; a separate jsdom harness tested flows, focus restoration, storage denial, local help drafts, language rerender and host-route compatibility. Browser visual/device/microphone tests are separate; never equate DOM tests with real browser verification. The local browser preview was inaccessible from the current execution network.

Before publishing shared changes, refresh/reconcile remote source without force pushing and rebuild from the reconciled commit. Shared-file changes are limited to app route/nav/invitation, index includes and asset revision inputs. Preserve Bilal's newer changes. Rollback only through a deliberate version selection that does not discard colleagues' work.
