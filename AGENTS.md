# BioIntern Radar conventions

Use only this project's instructions and the current user's requests. Do not read or use DotAIOS instructions, files, skills, or memory; the user explicitly opted out.

## Product and scope

English-first, mobile-first internship discovery for undergraduate life-sciences students. The catalogue is Europe-only for now. Structured, attributable facts are the core value. Explain changes in plain English and work in small, testable milestones.

React, TypeScript, Vite, Tailwind. Data remains local and JSON-compatible for later Supabase/PostgreSQL integration. No login, payments, scraping, scheduled jobs, email alerts, AI API calls, tracking or backend services without a new request. Never hardcode secrets. Ask before deleting files, adding paid services or deploying publicly. Explain external scripts before execution.

## Information integrity

- `src/data/realOpportunities.ts` is a manually researched official-source snapshot of European programmes and general lab-enquiry routes, not a promise of current vacancies. First checked 28 October 2026; statuses rechecked and records added 10 November 2026 (see the log in `docs/source-review.md`). Refresh statuses with `npm run status:report` and `docs/status-updates.md`; the report is read-only and must never change a status by itself.
- `src/data/opportunities.ts` contains six fictional fixtures, available only in the separate demo collection or saved records. Keep `isSample`, fictional institutions and no official application links.
- Preserve a record's named cycle. Closed historical records must not masquerade as next-year openings. A future deadline does not prove applications are open.
- Every real factual field has evidence: `source-checked`, `not-stated`, `not-checked`, `not-applicable`, or `unclear`, with the source URL, actual check date, and relevant notes. Source checks do not verify unrelated fields.
- Real records must use `defineRealOpportunity` with explicit evidence for every `factKeys` entry and matching dated sources. `src/lib/evidenceHelpers.ts` shortens entries but still requires the URL and actual date. Never restore automatic verification of populated values or a shared check-date default. `eligibilitySummary` is a sourced browsing highlight, not the complete requirements. Keep decisive university-country and study-year restrictions visible on cards. Extra topic tags use an expandable native button with `aria-expanded` and `aria-controls`, not a hover-only tooltip.
- Never infer “no requirement” from null or missing information. Unknown GPA, documents, funding and eligibility must remain explicit.
- Do not invent exact times from date-only deadlines. Explain official-source contradictions rather than silently selecting a convenient answer.
- Category wording is exactly `Structured programme`, `Advertised position`, or `Speculative lab outreach`. `No advertised vacancy` is a separate application-status value, distinct from `Unknown`.
- General preparation tasks are guidance, not the provider's official document list. Apply through the official source only.

## State and architecture

Routes: `/`, `/opportunities`, `/opportunities/:slug`, `/saved`, and a catch-all recovery page. Route components access data through `opportunityRepository` in `src/lib/opportunities.ts`.

Keep all catalogue filters, collection, sort and hide-closed settings in URL query parameters. `useCatalogueQuery` keeps a synchronous query draft so same-render rapid updates accumulate. Filter changes create browser-history entries; typing replaces the current entry. POP navigation must update controls and results from the URL.

Detail links originating in a catalogue capture the complete URL and scroll position in router history state. Explicit Back links restore this context; direct visits fall back to the general catalogue. Never trust an external return URL. Preserve modified-click/new-tab link behaviour.

`DeviceProvider` owns versioned, validated localStorage data under `biointern-radar:device:v1`. Saved IDs and checklist task IDs are separate for each stable opportunity ID. Task IDs must remain stable. Support explicit checklist reset, blocked/corrupt storage warnings and cross-tab updates. Keep user data on the device; no account or network writes.

## Design and accessibility

The current visual direction is graphite/black gradients with off-white text, icy cyan and soft violet accents, superseding the earlier forest/sage palette at the user's request. `night-theme.css` holds the palette and surface treatment; preserve the existing layout and native type. Use restrained glow/shading on the hero and radar, not body copy. Informational catalogue text is at least 12px; primary practical data is 14–16px. Labels and controls must remain readable, with 16px mobile inputs and select controls. Narrow-screen filters use a single column so long values fit.

Use the native Apple/system sans-serif stack without bundling or downloading SF Pro. Titles use strong weights (750–800), card titles 700 and body text a modest 450. Keep the overview concise: one introduction and primary action, the radar, featured records and brief application guidance. Avoid decorative slogans and repeated captions; keep factual caveats available in disclosures.

Use semantic heading levels, labelled native controls, visible keyboard focus, skip navigation, live result counts, reduced-motion support and practical touch targets. Mobile visual sequence must match DOM order. Field labels in the home radar are real keyboard-accessible links. Mobile Show results collapses filters, scrolls to and focuses the result region.

The active homepage radar is `SweepRadar.tsx`: a transparent CSS sweep with a five-second revolution, a gentle pulse and a bold, icon-free crossfading field name. No surrounding coloured tile or lower field strip. Cycle Genomics, Neuroscience, Molecular biology, Biotechnology and Bioinformatics. The current name is one real HTML link, held stable while focused. Next research field provides immediate manual access and pauses the sweep, including in reduced-motion mode. Keep sound opt-in and synthesised locally after a user gesture, once per completed turn. Pause visual motion and sound offscreen or when hidden; respect reduced motion. The retired 3D renderer and the `three` dependency were deleted on 10 November 2026; a new 3D design needs a new request.

## Verification

Use Node 24 (`nvm use`). Commands: `npm ci --ignore-scripts`, `npm run dev`, `npm test`, `npm run build`, `npm run format:check`, `npm run status:report`; use `npm run format` for formatting. Tests and TypeScript/build must pass before handoff. Add focused regressions for state races, history restoration and device persistence.

Check home, catalogue, every detail, saved records, empty states and unknown URLs. Interactively verify filters, fast consecutive changes, URL/history reloads, scroll restoration, save/unsave and per-record checklist reload/reset. Check 320, 390, 768 and 1440px plus reflow, contrast, focus and browser errors. Distinguish actual checks from limitations.

GitHub Actions builds/tests but does not deploy. Cloudflare Pages serves `dist/` and uses its SPA fallback when there is no root `404.html`. Preserve the security headers and ask before public deployment.
