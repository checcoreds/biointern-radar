# Verification — 28 October 2026

## Card accessibility and evidence contract — 29 October 2026

- **97 tests passed** across four files. TypeScript/Vite build passed. Focused regressions cover expanding/collapsing topic tags with pointer, Enter and Space; visible DAAD/LMU eligibility restrictions; required explicit evidence; invalid/missing field and source dates; source/date mismatches; mixed field dates; and repeated source URLs without React key warnings. Existing search/history, saves, checklist, all 17 details, radar and accessibility regressions passed.
- Interactively checked catalogue reflow at **320, 390, 768 and 1440px**, including expanded tags. No document-level horizontal overflow. The topic button is **44px high**, exposes expansion state and keeps focus on collapse. At 390px the first expanded card is about **445px** high; the earlier compact-layout measurements below predate these eligibility highlights and the larger topic control.
- Checked combined **Open + Funded**, three matching real records, URL persistence after reload, detail navigation and catalogue return. Expanded a topic group in Saved. Saved DAAD, checked one preparation task, reloaded to confirm persistence, then unchecked/unsaved the test record to restore its initial state.
- Checked DAAD's expanded source notes: eligibility fields show **29 October**, GPA information retains **28 October**. Fixed a React duplicate-key warning caused by rechecking the same URL on another date. A fresh browser session through catalogue and DAAD detail had **no errors or warnings**.
- Captured desktop and mobile screenshots. Narrow-screen checks used browser viewport emulation, pointer and keyboard input; no physical touchscreen or screen-reader session was tested in this pass.
- Removed the shared-date/populated-value verification helper. Existing evidence was migrated explicitly, preserving previous dates and uncertainties; only DAAD eligibility was rechecked against its official source. No new opportunities were added and fictional fixtures remain separate. See [source review](source-review.md).
- The first local Git snapshot includes the working app, data, tests, documentation and hosting configuration. Dependencies, build output, local environment files and logs are ignored. Nothing was published.

## Project checks

- **86 tests passed** across four Vitest files, including the flat radar cycle/audio lifecycle, compact-menu keyboard handling, the empty Saved state, and summary/source disclosure coverage.
- **TypeScript and Vite production build passed.**
- **Prettier formatting check passed.**
- No paid services or public deployments were added. Legacy Three.js dependencies remain installed but are not shipped by the current flat-radar build.

## Interactive browser checks

Tested the actual local app and its compiled production build in the in-app browser.

- Opened every detail URL: **11 real records and six fictional demos**. Confirmed the correct title, six checklist controls, the student-question sections and source/demo presentation. The compiled-page sweep had no browser errors or warnings.
- Checked home, catalogue, a representative detailed programme, saved opportunities and both unknown-page/unknown-record routes at **320, 390, 768 and 1440 CSS pixels**. No document-level horizontal overflow was found. Inspected mobile, tablet and desktop screenshots.
- Measured rendered text contrast against solid background colours. Corrected the lab-enquiry notice; no remaining failures in the checked pages. This measurement and axe structure checks are not a full accessibility certification.
- Checked narrow-width reflow, full-width mobile filters, long option labels and practical information. The mobile **Show N results** button collapses filters, scrolls the result region into view and moves focus there.
- Selected **Open** then **Funded**, confirmed both URL criteria and matching records. The focused regression test also dispatches both changes inside one React batch and excludes closed fixture records.
- Checked browser Back/Forward and refresh with query parameters. Checked explicit catalogue return with filters and an exact captured scroll position. Browser Back also restored the catalogue after reloading a detail page.
- Fixed a direct-visit scroll collision caused by React Router's shared `default` key; a regression proves that an unrelated URL's position cannot leak into another page.
- Checked deadline ordering, missing dates last, hide-closed (11 real records down to nine), removable chips, empty-state Reset and error recovery.
- Saved a record, revisited it in Saved, refreshed, checked its saved state and checklist progress, then reset/unsaved the test record. Confirmed different opportunities have separate progress. Test data created during verification was cleaned up using the app's own controls.
- Checked keyboard activation of skip navigation and checklist checkboxes, and visible focus outlines. Native labelled controls remain in use; mobile visual sequence matches DOM order.
- Split storage parsing, context identity and its provider to keep live updates stable. A subsequent provider hot update produced no browser errors.

## Compact layout refinement

- At **390px**, the first catalogue card measures **332px** high and begins **360px** from the document top with filters and source disclosure collapsed. The review's previous measurements were approximately 628px and 944px respectively. At 320px it measures 358px high and begins 391px down.
- Cards now prioritise title, institution, deadline, funding and eligibility; country/period share a line and only two topic tags appear. Longer facts remain on details.
- White cards, a light neutral background, forest headings/buttons, mint selections and distinct text-labelled Open/Upcoming/Closed badges were inspected on mobile and desktop. Rendered catalogue text/background measurements found no contrast failures.
- Rechecked home, catalogue, programme detail, outreach detail, empty Saved and error-page layouts at **320, 390, 768 and 1440px** after refinement. No document-level horizontal overflow was found. All 17 real/demo details rendered their summaries and student-question sections; each real detail retained six expandable source disclosures.
- Confirmed that source disclosures expose the evidence state, check date, official URL and any notes; these are collapsed initially. Unknown and not-applicable values remain explicit in the summary and details.
- Rechecked Open + Funded, sorting, refresh, Show results focus, mobile menu/Escape, source notes, Saved controls appearing after saving, and saved/checklist progress across reload and explicit reset. Removed the test save using the app controls.
- This pass uses the local development server; earlier production-build checks are recorded above. The data was not researched again during this visual refinement.

## Overview simplification and typography

- Reduced rendered main-page copy from **330 to 173 words** with disclosures collapsed. Removed repeated slogans, radar subtitles, the promotional strip and the repeated closing call to action. Kept the linked radar fields, featured records and a concise three-step guide. Opportunity-type definitions remain in a keyboard-operable disclosure.
- Replaced the previous Inter/Avenir stack with the native Apple/system sans-serif stack. Hero headings use weight 800; other main headings 750 and card titles 700. Body weight increases modestly to 450. No font files, external font requests or dependencies were added; the exact font varies by platform.
- **78 tests passed**, including the existing home/radar navigation and axe checks. TypeScript/Vite build and formatting checks passed.
- Rechecked home, catalogue, programme and outreach details, Saved and the error page at **320, 390, 768 and 1440px**. No document-level horizontal overflow. Checked all **17 detail pages at 320px**, with all six question sections plus the preparation checklist present and no overflow. Browser errors/warnings: none.
- Activated a radar field link and verified the selected catalogue filter/results. Opened and closed the opportunity-type disclosure with Enter. Inspected the new desktop and mobile typography visually. This pass did not change or research internship facts.

## Earlier 3D radar milestone (superseded)

The isolated, lazy-loaded instrument preserves normal HTML field links and the lightweight fallback. Native pointer dragging, keyboard focus/activation, Meta-click new tabs, pause/reset, all field filters and repeated route remounts were checked. The final renderer uses 29 draw calls, a 30fps target and demand rendering for paused/static views. Fault-fixture checks cover delayed/rejected loading, actual WebGL context loss and retry, reduced motion and coarse-pointer input. Loading height stays 466px on desktop and 346px on mobile. See [radar engineering and measured limits](radar.md) for profiling, bundle size, fixture use and device-test limits.

## Flat animated radar replacement

Replaced the active 3D scene with the original flat CSS radar. Native animation-cycle events synchronize the five-second sweep, crossfading field name and optional quiet ping. Sound is opt-in; it stops when muted/offscreen/hidden or after navigation. The current production build contains no graphics chunk. See [current radar notes](radar.md).

## Data limits

The collection is manually maintained, **not a live feed** and **not 11 currently open vacancies**. It includes dated programme calls, a closed 2026 archive and two generic hosting routes with no advertised vacancy confirmed. The separate demo collection has no factual application links.

VBC's unnamed cycle year, ETH's conflicting deadline time zone and NUS's conflicting opening dates remain visibly flagged. Other missing fields retain their exact evidence state. See [source review](source-review.md) for official links and caveats. No claim of complete verification is made for unchecked fields.

The app is available locally; Cloudflare Pages has not been deployed.
