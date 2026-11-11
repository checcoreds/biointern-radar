---
name: refresh-statuses
description: Recheck the application status, deadlines and other time-sensitive facts of the real BioIntern Radar records against their official sources. Use when the user asks to update, refresh or recheck the catalogue, before any public share, and whenever a deadline is close.
---

# Refresh statuses

The full procedure is in `docs/status-updates.md`. Follow it; this skill is the short version and the order of work.

## 1. See what needs checking

```sh
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
npm run status:report -- --json
```

The report is read-only and must never change a status by itself. Work through `URGENT` first, then `Check soon`, then `Routine`. If the user asked for a full recheck, do every record.

## 2. Check each official source

Open the URLs the report lists. Provider pages only. For each record, look for, in this order:

1. **Cycle:** which year the page now describes. A new cycle becomes a new record; do not rewrite the old one into it.
2. **Status:** explicit wording, a passed opening date, a live form, or "closed". A future deadline alone proves nothing.
3. **Deadline:** date, plus time and time zone only if stated.
4. **Anything else that visibly changed:** dates, stipend, eligibility, documents.

If a page fails to load or has moved, record that in `reviewNote`, set `verificationStatus: 'Needs review'`, and tell the user. Do not guess a new URL.

## 3. Edit only what you rechecked

- Change the value, then its evidence entry with today's actual date and the URL you read, and add the matching `sources` entry.
- Fields you did not recheck keep their older dates. Never bump a date to look fresh.
- When a call has closed, set `applicationStatus: 'Closed'` and keep the record until the next cycle is published.
- Explain contradictions with `unclear` and a note rather than choosing the convenient reading.

## 4. Log and verify

- Add a dated line to the review log in `docs/source-review.md` naming the records and fields rechecked, and update the table's status column and heading date.
- Update the recheck date in the first bullet of "Information integrity" in `AGENTS.md`.

```sh
npm test
npm run build
npm run format:check
npm run status:report
```

Open each changed detail page in the browser and confirm status, deadline and source links.

## 5. Report

Give the user a short table: record, what changed, what stayed the same, and anything that could not be confirmed. Do not commit or publish; that is the `ship` skill.
