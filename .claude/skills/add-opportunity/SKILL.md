---
name: add-opportunity
description: Research a life-sciences internship programme or lab-enquiry route from its official source and add it to the BioIntern Radar catalogue with field-level evidence. Use when the user names a programme or institution to add, or asks to find and add new European opportunities.
---

# Add an opportunity

Adds one real record to `src/data/realOpportunities.ts`. The catalogue's value is that every fact is attributable, so a record with honest gaps is better than a complete-looking one. Read the "Information integrity" section of `AGENTS.md` first; it overrides anything here.

## 1. Decide whether it belongs

- Europe only, open to undergraduates, life sciences (biology, biotechnology, genomics, biochemistry, pharmacy-adjacent research, bioinformatics, neuroscience).
- Check `src/data/realOpportunities.ts` for the same programme or an earlier cycle. A new cycle is a **new record** with a new `id` and `slug`; never overwrite an old cycle's facts.
- If it does not fit, say why and stop.

## 2. Read the official source

- Use only the provider's own pages (institution, programme, or an official network such as amgenscholars.com). Aggregators and scholarship lists are leads, never evidence.
- Note the exact URL of every page you actually read and today's date. That date is the check date; never reuse an older constant for something you checked today.
- For each fact, record one of: what the page says, that it does not say, that pages disagree, or that you did not look.
- If a page fails to load, say so. Do not guess a replacement URL.

Facts to look for: named cycle, application status wording, opening date, deadline (time and time zone only if stated), eligible degrees and years, GPA, documents, funding and its details, duration and dates, location, costs, application route.

## 3. Write the record

- Add URL constants at the top of the data file and a date constant for today's check if one does not exist.
- Use `defineRealOpportunity` with explicit evidence for **every** `factKeys` entry, using the helpers in `src/lib/evidenceHelpers.ts`: `checked`, `notStated`, `unclear` (explain both readings), `notApplicable`, `notChecked`.
- Every evidence URL and date must have a matching entry in `sources`, or the record is rejected.
- `category` is exactly `Structured programme`, `Advertised position` or `Speculative lab outreach`. A general enquiry route has status `No advertised vacancy`, not `Unknown`.
- A future deadline does not prove a call is open. Set `Open` only on explicit wording, a passed opening date or a live form.
- Use `deadlineAt` only when the source states the exact time and time zone.
- Never turn missing information into "no requirement". Unknown GPA, documents, funding and eligibility stay explicit.
- `eligibilitySummary` is a short sourced highlight, not the full rules. Write descriptions in your own words; do not copy the provider's text.
- Reuse existing `scientificTopics` names where they fit, so filters and the radar links keep working.

## 4. Update the paper trail

- `docs/source-review.md`: add a dated log line, a row in the collection table, the new record count, and any deliberate uncertainty.
- Update the dates in the first bullet of "Information integrity" in `AGENTS.md` if this is a new check date.

## 5. Verify

```sh
export PATH="$HOME/.nvm/versions/node/v24.16.0/bin:$PATH"
npm test
npm run build
npm run format:check
npm run status:report
```

Open the new detail page in the browser and confirm the status, deadline, key restrictions and every source link. Check its card in the catalogue.

## 6. Report

Tell the user, in plain English: what was added, which facts are sourced, which are unknown or unclear, and any page that could not be read. Do not commit or publish; that is the `ship` skill.
