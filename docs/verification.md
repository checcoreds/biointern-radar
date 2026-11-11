# Verification — 28 October 2026

## Review, stylesheet consolidation and security hardening — 11 November 2026

- **Design.** Sticky header with pill navigation (the redundant header button was removed), a larger hero with three computed catalogue facts, card-style “How it works” steps, a styled opportunity-types disclosure, a real footer, labelled sort options, filter selects that no longer cut off their own text, custom checkboxes, a label/value summary on phones and a “days left” chip on the detail summary. Institution badges now prefer real acronyms (ETH, LMU, CRG).
- **Code.** Three overlapping stylesheets (about 3,500 lines, most selectors defined several times) became one token file and one component file (about 1,900 lines, each selector defined once); built CSS fell from 69 KB to about 50 KB. Every colour is one `light-dark()` token. The superseded `refinements.css` was deleted at the user's request.
- **Fixes.** The Saved badge counted records that no longer exist; page background no longer repaints on scroll; “Show results” no longer double-offsets under the header; the browser toolbar colour follows a chosen theme; the footer stays at the bottom of short pages.
- **Security.** Content security policy tightened to `default-src 'none'` with no `'unsafe-inline'` and no `data:`; added HSTS, COOP/CORP, `form-action`, a wider permissions policy and long-lived caching for hashed assets. `npm run preview` now serves these headers. CI also checks formatting and audits shipped packages.
- **139 tests passed** (29 new: badges, catalogue facts, security headers, token rules, Saved badge, overview/footer); TypeScript, build and formatting passed; `npm audit` found 0 vulnerabilities.
- Browser, development server: home, catalogue, detail, empty Saved and 404 in light and dark at 1440 and 1024/1100px; home and filtered catalogue at 768px; home, catalogue, mobile menu, filter panel and two details at 390px; home at 320px with no horizontal overflow. Interactively: filter → detail → Back restored the filter and a 900px scroll position; save/unsave, checklist ticks, reload persistence and reset; “Show results” focus. No console errors.
- Browser, production build with the real headers (`npm run preview`): catalogue rendered 15 cards with tinted badges under the strict policy, the theme toggle switched both ways, and there were no policy violations or console errors.
- Computed contrast for the new colour pairings was 4.6:1 or higher in both themes.
- Not tested: physical phones, Safari and Firefox, screen readers, the reduced-motion setting in a real browser (CSS-gated), a browser old enough to need the Lightning CSS fallback (the same fallback output is what modern Chrome rendered in the production check), and the headers on Cloudflare itself (not deployed).

## Blue light/dark themes — 10 November 2026

- Replaced the green palette with blue light and dark themes and a header sun/moon toggle. Converted about 200 hard-coded colours in the base CSS, the radar and the animations to shared theme tokens. Required documents now show as a list.
- **110 tests passed** (including theme toggle persistence and blocked storage); build and formatting passed.
- Browser: home, catalogue and detail pages in both themes at desktop width, and the catalogue header with the toggle at 320px. No overflow and no console errors. A computed text-contrast sweep of home, catalogue, two details and Saved in both themes found no failures; the only flags were gradient buttons the script cannot measure (white on #2f6df0 is about 4.9:1). Not tested: the device-follow mode on a real dark-mode phone, or screen readers.

## Minimal cards, green theme and motion — 10 November 2026

- Cards now show status, title, institution, country, deadline and funding; eligibility moved to a “Key restrictions” highlight on the detail page. Removed about 19 KB of CSS for the old cards and other unused selectors.
- New deep-green palette, rounder shapes and `motion.css` animations: page entry, card cascade/hover, bookmark pop, filter chips, detail sections and the card-to-detail View Transition.
- **108 tests passed**; build and formatting passed.
- Browser: catalogue, home and detail at 1440px, plus the card-to-detail morph on Pasteur. All 15 detail pages at 320px with Back to the catalogue. The mobile filter panel and Show results focus. Home, catalogue, Saved and 404 at 768px. No horizontal overflow and no console errors. Not checked: physical devices, screen readers, the reduced-motion setting in a real browser (CSS-gated), and Safari/Firefox View Transition support (they fall back to plain navigation).

## Europe-only data refresh and cleanup — 10 November 2026

- Removed the non-European OIST and NUS records. Rechecked statuses/deadlines against official pages, rewrote VBC, ETH, LMU and Karolinska for their 2027 cycles, and added Institut Pasteur, Cambridge, Biozentrum Basel, MPIIB Berlin, CRG and Champalimaud. 15 real records. See [source review](source-review.md).
- Added `npm run status:report` (read-only status review) and [status update guide](status-updates.md). Added “N days left” hints for open calls closing within 14 days, and featured the soonest open calls on the overview. Added an `Autumn` period for the September–November MPIIB internship.
- Deleted the retired Three.js radar files, its harness and the `three`/`@types/three` packages.
- **108 tests passed**; TypeScript/Vite build and formatting checks passed.
- In the in-app browser: home featured cards, the catalogue (15 cards, country and period filters) and all 15 detail pages at 390px. Each had 6 source disclosures and a 6-step checklist, with no horizontal overflow. Also checked the catalogue at 320px and that an old removed URL shows “Opportunity not found”. No console errors. Not rechecked this pass: 768/1440px layouts, save/checklist persistence and history restoration (code unchanged; covered by tests).

## Graphite theme and five-field radar — 29 October 2026

- Applied the requested graphite/black shaded palette throughout home, catalogue, details, Saved and recovery pages. Added cool cyan and soft violet accents, restrained hero/radar glow and subtle surface depth. Native system typography and practical information sizes remain intact. `night-theme.css` isolates the palette; no dependencies or external assets were added.
- Removed the radar's coloured tile, field-name icons and lower three-name strip. One bold linked name crossfades per full five-second revolution through Genomics, Neuroscience, Molecular biology, Biotechnology and Bioinformatics. The current destination holds while focused. Manual next-field selection pauses the sweep and announces the selected field; reduced-motion users can reach all five without animation.
- **99 tests passed** across four files, including new focus-stability and manual-selection regressions. TypeScript/Vite build and formatting checks passed. Existing filters/history, device persistence, source integrity, expandable topics and all 17 detail regressions passed. The build still creates no graphics chunk or WebGL canvas.
- Inspected home at **320, 390, 768 and 1440px**, with no horizontal overflow. The scene remains transparent and reserves its existing height. Inspected desktop/mobile screenshots and all 17 real/demo details at 320px. Checked expanded filters, demo notices, selected controls, empty Saved and both error routes. A computed text-colour/background audit found no remaining failures in those views after correcting the error-page eyebrow label; gradient checks use CSS endpoints and are not a full accessibility certification.
- Interactively followed all five field links and confirmed correct query/results: Genomics 1, Neuroscience 3, Molecular biology 5, Biotechnology 2, Bioinformatics 3. Counts refer to the existing real collection. Checked browser Back, keyboard-held link destination, manual field selection, Open + Funded, saved/checklist reload persistence and restored the verification save/task changes.
- No browser errors or warnings were found. Captured desktop and mobile previews. Narrow-screen checks used browser viewport emulation; reduced motion and audio cleanup are covered by automated tests. No physical touchscreen, screen reader, or acoustic measurement was tested in this pass. Facts and recorded research dates were not changed; the work stays local for review.

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

## Showpiece layer (11 November 2026)

Added at the user's request: a WebGL helix-and-radar hero, pointer light and tilt on cards, scroll-driven reveals, a reading-progress bar, a drifting background, counting hero numbers and site-wide opt-in sound effects.

- **157 tests passed**, including new ones for the sound store (silent until enabled, remembered choice, blocked audio, no audio outside a gesture), pointer light (mouse only; not touch, coarse pointers or reduced motion), scene layout at five stage sizes, colour parsing and the count-up always settling on the real number. TypeScript/Vite build and formatting passed.
- Checked the overview in light and dark at 1440px and a 500px single-column layout with WebGL on, and at 1100px with WebGL off (the flat CSS radar appears). Checked the catalogue in dark at 1440px.
- Checked the production build under the strict content security policy: the 3D scene drew, pointer light and tilt applied on hover, and the console showed no policy violations or errors. No horizontal overflow on the overview, catalogue or a detail page at 320px.
- **Not checked:** how the sounds actually sound (only that the right audio calls are made), frame rate on real phones, Safari and Firefox (Firefox lacks scroll-driven animation and should show the timed entrances instead), screen readers, and reduced motion in a real browser.
- `src/components/radar/radarAudio.ts` is no longer imported (replaced by `src/lib/sound.ts`); it is left in place pending the user's approval to delete it.

## Data limits

The collection is manually maintained, **not a live feed** and **not 11 currently open vacancies**. It includes dated programme calls, a closed 2026 archive and two generic hosting routes with no advertised vacancy confirmed. The separate demo collection has no factual application links.

VBC's unnamed cycle year, ETH's conflicting deadline time zone and NUS's conflicting opening dates remain visibly flagged. Other missing fields retain their exact evidence state. See [source review](source-review.md) for official links and caveats. No claim of complete verification is made for unchecked fields.

The app is available locally; Cloudflare Pages has not been deployed.
