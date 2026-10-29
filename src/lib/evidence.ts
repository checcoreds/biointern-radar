import type { FactKey, FieldEvidence, Opportunity } from '../types/opportunity'

export const evidenceLabels = {
  'source-checked': 'Checked against source',
  'not-stated': 'Not stated by the source',
  'not-checked': 'Not yet checked',
  'not-applicable': 'Not applicable',
  unclear: 'Source unclear — confirm with organiser',
  sample: 'Fictional sample',
} as const

export function evidenceFor(item: Opportunity, key: FactKey): FieldEvidence {
  if (item.isSample)
    return { state: 'sample', sourceUrl: null, checkedAt: null }
  return (
    item.evidence?.[key] ?? {
      state: 'not-checked',
      sourceUrl: null,
      checkedAt: null,
    }
  )
}

export function factText(item: Opportunity, key: FactKey): string {
  const value = item[key]
  const evidence = evidenceFor(item, key)
  if (value == null || value === 'Unknown')
    return item.isSample
      ? 'Not yet checked · sample'
      : evidenceLabels[evidence.state]
  return Array.isArray(value) ? value.join(', ') : String(value)
}
