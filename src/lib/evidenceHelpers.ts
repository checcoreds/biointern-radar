import type { FieldEvidence } from '../types/opportunity'

// Shorthand for writing explicit field evidence. Every helper requires the
// actual source URL and check date; nothing is filled in automatically.

export const checked = (
  sourceUrl: string,
  checkedAt: string,
  note?: string,
): FieldEvidence => ({
  state: 'source-checked',
  sourceUrl,
  checkedAt,
  ...(note ? { note } : {}),
})

export const notStated = (
  sourceUrl: string,
  checkedAt: string,
  note?: string,
): FieldEvidence => ({
  state: 'not-stated',
  sourceUrl,
  checkedAt,
  ...(note ? { note } : {}),
})

export const unclear = (
  sourceUrl: string,
  checkedAt: string,
  note: string,
): FieldEvidence => ({ state: 'unclear', sourceUrl, checkedAt, note })

export const notApplicable = (
  sourceUrl: string,
  checkedAt: string,
  note: string,
): FieldEvidence => ({ state: 'not-applicable', sourceUrl, checkedAt, note })

export const notChecked = (): FieldEvidence => ({
  state: 'not-checked',
  sourceUrl: null,
  checkedAt: null,
})

export const summaryNote =
  'Browsing summary of eligibility; read the full official requirements before applying.'
