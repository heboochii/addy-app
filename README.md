# Addy — Your Abu Dhabi Buddy

A mobile-first hackathon MVP for discovering, settling into, and planning life or business in Abu Dhabi.

## Run and build

This project has no npm dependencies. With Node.js available, run:

    node scripts/build-worker.mjs

The output is a Cloudflare Workers-compatible ESM module in `dist/server/index.js`. It embeds the web app and compressed assets. The current deployment is on ChatGPT Sites; the Site access policy and authenticated-user headers protect the AI routes.

The static UI source is under `web/`. The API implementation is `server/api.mjs`. Do not put a production key in source or browser storage. Configure `OPENAI_API_KEY` as a hosted server secret. Optional server variables: `OPENAI_TEXT_MODEL` and `OPENAI_VOICE_MODEL`.

If porting to another host, replace the platform authentication boundary with proper server-side authentication. Do not remove the identity checks and publish the API unauthenticated.

## Implemented

- Original illustrated heritage introduction and sourced leadership stories.
- Voice/text onboarding with structured, editable preferences.
- OpenAI Responses-backed conversation, current-source web research and plan generation.
- Recorded hold-to-talk voice with explicit microphone consent, muted idle tracks, client silence/short-recording gates, transcription review, contextual text logic and one spoken response. Separate cinematic onboarding and everyday assistant screens.
- Content-based cold start plus per-user ridge-regression preference learning from explicit save/dislike signals. Diversity reranking; undo recomputes from current signals.
- Curated and source-backed new discovery cards; photo previews only where an approved source supplies them.
- Shared-device group preference aggregation, four-option votes, meeting/budget/area/transport constraints and exportable plans.
- Source-backed café setup guidance, distinguishing verified requirements from questions needing official confirmation.
- English, Arabic RTL and French interface/content; a separate walkthrough.

## Verification as of 2 October 2026

Passed: syntax/build checks; route rendering in all three languages; ranking signal/exclusion checks; malformed persisted-state handling; cancelled microphone-start logic; strict API schema/mock tests; live text response; live natural-language preference extraction and contextual follow-up; live web research returning official citations and plan steps; live Realtime credential creation (legacy); live fixed synthetic TTS-to-transcription roundtrip; recorded-turn, cancellation, silence and unsupported-recorder mocks; cinematic transition lifecycle tests.

Not yet verified end-to-end: signed-in browser click-through on the deployed release, microphone audio capture/playback, device-specific responsive visual quality and full generated-content correctness. These require actual browser testing. A successful synthetic audio roundtrip does not establish real microphone accuracy.

## Important limits

This is a working hackathon MVP, not a production-readiness certification.

- Profiles, votes and plans are stored in the current browser. Group mode is a shared-device demo, not remote synchronized accounts or invitations.
- There are no actual bookings, payments, application submissions, calendar writes or live traffic integrations. UI actions distinguish plans from completed external actions.
- Ranking is a small online linear model, not a trained large-scale recommender or a proven superior algorithm. Feedback constants require evaluation with real users.
- Search freshness and structured output do not guarantee factual correctness. Users must confirm legal, regulatory, price, availability and dietary details with the provider or authority.
- Allergy-related suggestions are not safety guarantees; ingredients and cross-contact must be confirmed with the venue.
- Runtime request limiting is in-memory, not a durable production-wide quota. Configure project billing limits/alerts. The five-minute client voice timer is a convenience, not a hard provider billing boundary.
- The main API key remains server-side. The browser uses authenticated same-origin transcription and speech endpoints; it receives no provider key. The legacy Realtime token endpoint is unused by the current client.
- Some prototype photographs do not have confirmed commercial reuse rights. Obtain permission or replace them with licensed imagery before commercial launch. Attribution alone is not a licence.
- Plans generated in one language retain their creation text; ask Addy to revise or translate them when needed.

## Research foundations

- Content-based recommendation: https://developers.google.com/machine-learning/recommendation/content-based/basics
- Ridge-based recommendation / LinUCB paper: https://arxiv.org/abs/1003.0146 (this implementation is not labelled a contextual bandit)
- Diversity reranking: https://www.cs.cmu.edu/afs/.cs.cmu.edu/Web/People/jgc/publication/MMR_DiversityBased_Reranking_SIGIR_1998.pdf
- OpenAI structured outputs: https://developers.openai.com/api/docs/guides/structured-outputs
- OpenAI WebRTC: https://developers.openai.com/api/docs/guides/voice-webrtc
- Abu Dhabi business setup: https://www.added.gov.ae/en/set-up/establish-your-business
- ADAFSA food service design guide (2019): https://www.adafsa.gov.ae/CMS/Guidelines/Guideline%20No%20%286%29%20of%202019%20Food%20Service%20Design.pdf

## Three-minute demonstration

1. Start a personal journey. Give a rich description, such as coffee, art, board games, relaxed weekends and a moving timeline. Show that the next question responds to that description.
2. Ask for a current Abu Dhabi outing. Show a source-backed response, visual card and official source link. Avoid claiming unavailable traffic or booking integrations.
3. Save or skip a discovery. Explain that explicit signals update a separate ranking model and can be undone.
4. Open Together. Add two consenting demo participants on the same device, enter planning constraints, vote, and create/export the plan. Label this a shared-device group flow.
5. Switch to a business journey. Ask what to confirm before leasing for a café selling karak and sandwiches. Show the menu/activity/layout dependencies and official sources without claiming unverified universal licence rules.
6. Open the walkthrough and switch interface language to Arabic or French.

Before presentation, verify microphone permission and audible voice in the actual browser/device. Keep text mode available as the fallback.

## Current delivery boundary

The owner console at /admin.html stores opted-in account summaries and allowlisted activity in D1. It is locked unless ADDY_ADMIN_USER_IDS contains the signed-in per-Site stable user ID. Email does not grant owner access. Full profiles and plans remain device-local; only the consented summary is centralized. Partner dashboards, lead dispatch and sponsored-credit billing are not implemented. Reward previews use clearly fictional partners and are not redeemable.

The heritage welcome uses the original illustration as a responsive full-screen crop, softened behind text, then pans desert-to-city at full colour. Independent bird/gazelle animation is not implemented. Reduced motion and Skip/Escape are supported.

## Six-step intake and owner console

Individuals: full name, age/non-disclosure, gender/non-disclosure, move status plus date or current area, then two open-ended answers about tastes and household/practical needs. Businesses: founder, activity, stage/route/location, timing/budget, then operations and support needs. Four structured steps save locally without model calls; two open answers extract preferences. Desktop Space or mobile microphone hold records deliberately; onboarding recordings cap at 45 seconds. Transcripts stream after release.

Owner login uses existing Site sign-in plus server-side stable-ID allowlist ADDY_ADMIN_USER_IDS. Do not use the Site service token or email as owner identity. On first setup, the user opens /admin.html and confirms their displayed per-Site ID before an operator configures the allowlist. No owner is auto-enrolled.

D1 schema lives in db/schema.ts. Generate new migrations with npm run db:generate; never edit an applied migration. Account summary consent is explicit on review. Raw audio/transcripts, age/gender, budgets and medical details are excluded. Accounts show their name, authenticated email, type, business sector, canonical interests and recorded actions. Directory entries remain separate from partner/registered business accounts.

Tests passed: both six-step paths, required fields, migration of local state, request cancellation on Back, 35 owner API boundary checks, SQLite migration execution, consent payload checks and prepared-query/idempotency tests. Signed-in owner-browser use and real iPhone visual/mic performance still need actual device verification.
