# BioIntern Radar

A mobile-friendly starting point for undergraduate life-sciences students comparing research internships and preparing applications.

The default catalogue contains **15 real, official-source records, all in Europe**. They were first researched on 28 October 2026; statuses and deadlines were rechecked and six records added on **10 November 2026**. They include open calls, upcoming calls and general lab-enquiry routes. **They are not 15 guaranteed vacancies.** Six fictional examples remain in a separate **Fictional demos only** collection.

To see which records need their statuses rechecked, run `npm run status:report` and follow [the status update guide](docs/status-updates.md).

## Preview on this Mac

Run these commands in the **same Terminal window**, one at a time:

```sh
cd "path/to/BioIntern Radar"
source "$HOME/.nvm/nvm.sh"
nvm use
npm run dev
```

Wait for Vite's `Local:` line, then open **http://127.0.0.1:5173/** without quotation marks. Keep Terminal running; **Control+C** stops it. Run `pwd` if npm reports `ENOENT`: it should show the project folder, not your home folder.

If a server is already running, use its link. If port 5173 is occupied by something else, run `npm run dev -- --port 5174` and open the printed URL.

Dependencies are already installed. On a fresh checkout, install them after `nvm use`:

```sh
npm ci --ignore-scripts
```

This downloads the exact packages recorded in `package-lock.json` without executing dependency installation scripts. Use Node **24**, selected by `.nvmrc`; Node 14 is too old. Other contributors need Node 24 installed. If nvm is unavailable on this Mac, its existing Node can be selected for that Terminal with:

```sh
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
```

## Try the student workflows

1. Open **Explore internships**. Compare location, degree level, deadline, duration, funding and application status on each card.
2. Combine **Application status → Open** and **Funding → Funded**, even quickly. Closed calls must not appear.
3. Search **genomics**, sort by deadline, or hide closed calls. Search/filter/sort settings are in the URL and survive refresh and browser Back/Forward.
4. Open a detail page, then use **Back to the catalogue**. It restores your search, filters and scroll. Direct detail visits fall back to the general catalogue. Modified clicks still open normal links in new tabs.
5. **Save** a record and revisit it through **Saved**. Open it again and tick preparation steps. Both saves and per-record progress persist across navigation and reloads in this browser.
6. Use **Reset this checklist** to clear that opportunity's progress. Unsave separately to remove it from your shortlist. Clearing browser data clears device-only progress; there is no account or cross-device sync.
7. On mobile, expand filters, make selections and choose **Show N results** to collapse the panel and focus the results.
8. Select **Fictional demos only** to inspect fixture scenarios, including advertised-position examples. They have conspicuous demo labels and no official application links.

Each detail answers: **what will I do, am I eligible, when does it happen, what does it cost, what must I prepare, and how do I apply?** A summary near the title shows deadline, duration, funding and the official-source link. Expand **Sources & notes** within a section for its field evidence and check dates. General checklists do not override provider requirements.

On mobile, the compact **Main menu** button opens navigation; Escape closes it. Catalogue cards are kept minimal: status, title, institution, country, deadline and funding. The whole card opens the detail page. Eligibility (with a **Key restrictions** highlight), research topics and source dates are on the detail page; always read it and the official source. An empty Saved page shows its message and Explore button immediately; search, filters and sorting appear once an opportunity is saved.

The overview keeps its radar links and a short three-step guide. Expand **Understand the three opportunity types** for category definitions. Typography uses the device's native system fonts, including Apple's system font on Apple devices; no downloaded font, key or external font service is required. Other devices use their system sans-serif fallback.

The interface has a **light theme** (white and soft blue) and a **dark theme** (deep navy). It follows the device's setting until you choose one with the sun/moon button in the header; the choice is remembered in this browser. Controls are rounded and pill-shaped. Pages rise in on navigation, cards cascade in and lift on hover, and in supporting browsers a clicked card morphs into the detail page heading. Saving, filter chips and checklist ticks have small animations. With a mouse, cards catch a soft light and lean slightly towards the pointer; in browsers with scroll-driven animation, content rises in as it enters the screen and a thin bar along the top shows reading progress. Colour drifts slowly behind every page and the overview's numbers count up to their real values. All motion is in `src/motion.css` and switches off when the device asks for reduced motion. Every colour is a token in `src/night-theme.css`, written once as `light-dark(light value, dark value)`; layout and components are in `src/styles.css`. The header stays visible while scrolling, and the footer repeats the main links and the date of the latest source check.

The research radar is a small 3D scene: a DNA helix rising from a radar disc, drawn with WebGL by the site's own code (no 3D library), turning with the pointer and with scrolling. Where WebGL is unavailable it falls back to a flat CSS radar. Every five-second revolution pulses the light and crossfades one bold field name: Genomics → Neuroscience → Molecular biology → Biotechnology → Bioinformatics. The name is a normal link to filtered results; focusing it holds the destination stable. **Next research field** (the small right arrow) selects immediately and pauses the sweep, so all five fields remain usable with reduced motion or without waiting. Use the speaker button (also in the footer) to turn on quiet sound effects for the whole site: a ping per radar turn and short cues for saving and checklist ticks. Sound is off by default, starts only after that click, is generated in the browser with no audio files, and the choice is remembered on this device. Pause and reduced-motion preferences stop the animation. See [radar notes](docs/radar.md).

## Honest information labels

| Label                    | Meaning                                                                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Official sources checked | Specific facts were checked against the linked pages on the recorded date. It does not mean every field is known or applications remain open. |
| Not stated by the source | The checked source does not provide that field. It does not mean there is no requirement.                                                     |
| Not yet checked          | This field has not been verified.                                                                                                             |
| Not applicable           | The field does not apply to this route; the evidence note explains why.                                                                       |
| Source unclear           | Checked sources are ambiguous or contradictory. Confirm with the organiser.                                                                   |
| No advertised vacancy    | A general lab-enquiry route, with no specific opening confirmed. This differs from an unknown application status.                             |
| Fictional demo           | A made-up UI fixture, not factual internship information.                                                                                     |

See [the source review](docs/source-review.md) for the complete collection, caveats and a watch list of programmes not yet added. In particular, ETH pages disagree about a deadline time zone and Karolinska's own Amgen page was unavailable, so those fields stay explicitly unresolved.

Application statuses are manual snapshots. The app can conservatively close an elapsed published deadline when rendering; it never infers an open call merely because a deadline is in the future. Open calls closing within 14 days show a “N days left” hint on their card, and the overview features the open calls with the soonest deadlines. No automatic research or scheduled verification is running.

## Run project checks

```sh
npm test
npm run build
npm run format:check
npm run status:report
```

- **Tests** cover rapid combined changes, URL/history controls, catalogue scroll return, all record pages, save/unsave and per-record checklist persistence, corrupt/blocked storage, evidence, sorting, deadlines and accessibility structure.
- **Build** checks TypeScript, then writes optimised static files to `dist/`.
- **Formatting check** reports inconsistent source formatting without changing files. `npm run format` formats them.
- **Status report** lists which real records need their official sources rechecked (deadline passed, closing soon, stale or unclear). It is read-only and offline. Add `-- --json` for machine-readable output.
- `npm run test:watch` repeats tests while editing; press `q` to exit.
- `npm run preview` serves an existing build at **http://127.0.0.1:4173/** with the same security headers as `public/_headers`, so the content security policy can be checked locally. It does not deploy anything.

The axe tests use jsdom and cannot check rendered contrast or reflow. Browser verification must also cover the requested widths, keyboard focus, long filter labels, scroll restoration and actual reload behaviour.

## Project map

```text
src/
  App.tsx                       Layout, routes, title and scroll restoration
  main.tsx                      React and BrowserRouter entry point
  styles.css                    Tailwind import, layout and every component (mobile-first)
  types/opportunity.ts          JSON-compatible records and evidence contracts
  data/realOpportunities.ts      Manually researched official-source snapshot
  data/opportunities.ts          Six separate fictional fixtures
  lib/opportunities.ts          Repository, filtering, sorting, status, dates and catalogue facts
  lib/monogram.ts               Decorative institution badge text and tint
  lib/evidence.ts               Honest field labels and evidence lookup
  lib/defineRealOpportunity.ts   Required explicit evidence and date validation
  lib/evidenceHelpers.ts        Shorthand for explicit evidence entries
  lib/statusReview.ts           Which records need a status recheck
  lib/viewTransition.ts         Card-to-detail morph with a plain fallback
  lib/theme.ts                  Light/dark choice and device-preference fallback
  lib/useCatalogueQuery.ts       Safe accumulating URL changes
  lib/catalogueNavigation.ts     Validated catalogue-return context
  lib/device.tsx                Shared state provider for saves/checklists
  lib/deviceStorage.ts          Storage schema validation
  lib/deviceContext.ts          Stable shared React context
  lib/useDevice.ts              Hook for accessing device state
  components/                   Shared cards, notices and checklist
  components/radar/             3D helix radar (WebGL), CSS fallback and field links
  pages/                        Home, catalogue/saved, detail pages
  night-theme.css               Design tokens: both palettes, radii, shadows and easing
  motion.css                    Page, card and detail animations (reduced-motion safe)
  test/                         Behavioural, data and accessibility regressions
docs/source-review.md            Source audit, review log and unresolved facts
docs/status-updates.md           How to refresh statuses and deadlines
scripts/status-report.mjs        Prints the status review (npm run status:report)
public/_headers                 Security headers for Cloudflare
wrangler.jsonc                  Cloudflare deployment settings (static files only)
vite.config.ts                   Build, tests, and preview with the production security headers
.github/workflows/ci.yml         Format, test, build and dependency-audit checks; no deployment
AGENTS.md                        Project conventions
```

A **component** is a reusable interface piece. A **route** maps a URL to a page. A **type** describes the data shape. The **repository adapter** keeps the interface separate from the data source. A future Supabase adapter can replace local access without changing the meaning of fields or evidence states; that milestone also needs loading/error handling, validation and database access policies.

Filters: `search`, `field`, `country`, `degree`, `status`, `funding`, `period`, `category`, `collection`, `sort`, `hideClosed`. Unknown dates sort last in both directions. Search matches all entered words across titles, institutions, countries, locations, categories and topics. Reset returns to the default collection for the current page.

## Adding and reviewing real data

Use official institution/programme pages only. Preserve the named cycle, record the actual date checked, and attach a source to each confirmed factual field. Use `null` for missing values and evidence to explain why. Never fill gaps from general expectations, old cycles or third-party summaries. Do not turn generic hosting guidance into a confirmed vacancy. Document conflicting sources instead of silently reconciling them.

Wrap each real record with `defineRealOpportunity` from `src/lib/defineRealOpportunity.ts`. It requires an explicit evidence entry for **every** key in `factKeys`, plus dated source entries. There is no default verification date and filling in a value never marks it as checked. For example, after actually checking a funding page:

```ts
sources: [{ title: 'Official funding page', url: fundingUrl, checkedAt: actualCheckDate }],
evidence: {
  // Supply all other factKeys explicitly too.
  funding: { state: 'source-checked', sourceUrl: fundingUrl, checkedAt: actualCheckDate },
  gpaRequirement: { state: 'not-checked', sourceUrl: null, checkedAt: null },
},
```

Use `not-stated` only after looking for the information in the named source; it needs a source and actual check date too. `not-applicable` also requires an explanation. The validator rejects absent/invalid dates, missing evidence, checked facts without values, and evidence that does not match a listed source/date. An explicit `not-checked` value stays unchecked. `lastVerifiedDate` is calculated from the latest field check as a summary; individual dates remain visible under **Sources & notes**. This validates the record structure, not the truth of a claim: a person still needs to read the source.

Use stable IDs that distinguish annual cycles so device progress does not move into a different call. Keep task IDs stable across wording edits. Data is JSON-compatible for PostgreSQL/Supabase: nullable fields, arrays for topics/degrees/documents, constrained categories/statuses and a field-evidence object.

All current user state remains in localStorage under `biointern-radar:device:v1`. No personal application documents are collected. Storage is validated, changes sync between tabs, and the UI warns when persistence is unavailable.

## GitHub and hosting preparation

A local Git baseline is committed on `main`. No remote or public deployment is configured. A commit is a recoverable snapshot of tracked files; it does not publish the app. Inspect the baseline with `git log -1 --oneline` and any later edits with `git status`. To save a later milestone:

```sh
git add .
git commit -m "Describe the next milestone"
```

Cloudflare builds and serves the site from the GitHub repository (Workers static assets, configured in `wrangler.jsonc`; deploy command `npx wrangler deploy`). Every push to `main` redeploys it. Build settings:

| Setting          | Value                          |
| ---------------- | ------------------------------ |
| Framework        | React / Vite                   |
| Build command    | `npm run build`                |
| Output directory | `dist`                         |
| Root             | Repository root                |
| Node             | `24.16.0` (read from `.nvmrc`) |
| Secrets          | None                           |

Pages provides SPA routing when no root `404.html` exists, so detail URLs can load directly. Verify direct links after any eventual deployment. `public/_headers` is applied by Pages in production and by `npm run preview` locally (not by `npm run dev`). The policy allows scripts, styles, images and fonts from this site only, with no inline code, so do not add inline `<script>`/`<style>` tags or third-party embeds without updating it. No paid services or public deployment have been added.

References: [Vite](https://vite.dev/guide/), [Tailwind](https://tailwindcss.com/docs/installation/using-vite), [Pages routing](https://developers.cloudflare.com/pages/configuration/serving-pages/#single-page-application-spa-rendering).
