# Keeping statuses and deadlines current

This is the procedure for a person or an AI agent refreshing the real records in `src/data/realOpportunities.ts`. The app has no scraper, backend or scheduled job: every update is a manual (or agent-assisted) source check followed by a code change that passes the tests.

## 1. See what needs checking

```sh
npm run status:report
```

It reads the local data and prints every real record with a priority:

| Priority     | Typical reason                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `URGENT`     | The deadline has passed but the stored status is not `Closed`. The app already shows it as Closed.  |
| `Check soon` | Deadline within 14 days, status `Unknown`, an `Upcoming` call not checked for 7 days, stale checks. |
| `Routine`    | `Needs review` records, unresolved `unclear` evidence, `Upcoming` calls checked recently.           |
| `OK`         | Nothing pending.                                                                                    |

Options: `--json` prints machine-readable output for an agent; `--date 2027-01-05` previews the report for another day. The report never edits data. Its logic is in `src/lib/statusReview.ts` and is covered by tests.

Suggested rhythm: weekly during application season (October–March), monthly otherwise, and daily for any call in its final two weeks.

## 2. Check the official sources

For each flagged record, open the URLs the report lists. Use only the provider's own pages (institution, programme or official network site such as amgenscholars.com). Aggregator and scholarship-listing sites are leads, never evidence.

Look for, in this order:

1. **Cycle**: which year the page describes. If it now describes a new cycle, create a new record with a new `id` and `slug` (for example `epfl-srp-2028`). Do not overwrite the old cycle's facts into the new one.
2. **Status**: exact wording such as “applications are open”, an opening date that has passed, a live application form, or “closed”. A future deadline alone does not prove a call is open.
3. **Deadline**: the date, plus time and time zone only if the source states them. Use `deadlineAt` only for a stated exact cut-off.
4. **Anything else that changed**: dates, stipend, eligibility, documents.

If a page fails to load or has moved, say so in a `reviewNote` and set `verificationStatus: 'Needs review'`. Do not guess a replacement URL.

## 3. Edit the record

- Update the value, then its evidence entry with the **actual date you checked** and the URL you read, for example `checked(EPFL_URL, '2026-12-01', 'Wording or caveat')`.
- Add a matching entry to `sources` with the same URL and date. `defineRealOpportunity` rejects evidence that does not match a listed source and date.
- Only change the evidence dates of fields you actually rechecked. Other fields keep their older dates.
- Use `notStated` when you looked and the source does not say, `unclear` when sources conflict (explain both readings in the note), and `notChecked()` when you did not look.
- When a call closes, set `applicationStatus: 'Closed'` and keep the record until the next cycle is published. Then add the next cycle as a new record and remove the closed one.
- Helpers live in `src/lib/evidenceHelpers.ts`; URL constants sit at the top of the data file.

## 4. Verify and log

```sh
npm test
npm run build
npm run format:check
npm run status:report
```

Add a dated line to `docs/source-review.md` saying which records and fields you rechecked. Then open the changed detail pages in the browser and confirm the deadline, status and source links.

## Notes for an automated agent

A future agent can follow the steps above directly: run `npm run status:report -- --json`, visit the listed sources, edit the records, run the checks, and leave the changes for a human to review before publishing. Running it on a schedule (for example a weekly cloud routine) is a separate decision that has not been set up. It must never invent a status, a date or a time zone, and must report pages it could not read.
