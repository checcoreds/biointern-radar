import type { EvidenceState, Opportunity } from '../types/opportunity'
import { factKeys } from '../types/opportunity'

export interface EvidenceStats {
  total: number
  checked: number
  notStated: number
  unclear: number
  notApplicable: number
  notChecked: number
  /** Earliest and latest actual check dates across every fact. */
  firstCheck: string | null
  lastCheck: string | null
}

const bucket: Partial<Record<EvidenceState, keyof EvidenceStats>> = {
  'source-checked': 'checked',
  'not-stated': 'notStated',
  unclear: 'unclear',
  'not-applicable': 'notApplicable',
  'not-checked': 'notChecked',
}

/** Counts every fact of every real record by its evidence state. */
export function evidenceStats(records: readonly Opportunity[]): EvidenceStats {
  const stats: EvidenceStats = {
    total: 0,
    checked: 0,
    notStated: 0,
    unclear: 0,
    notApplicable: 0,
    notChecked: 0,
    firstCheck: null,
    lastCheck: null,
  }
  for (const record of records) {
    if (record.isSample) continue
    for (const key of factKeys) {
      const evidence = record.evidence?.[key]
      if (!evidence) continue
      stats.total++
      const field = bucket[evidence.state]
      if (field) (stats[field] as number)++
      const date = evidence.checkedAt
      if (date) {
        if (!stats.firstCheck || date < stats.firstCheck)
          stats.firstCheck = date
        if (!stats.lastCheck || date > stats.lastCheck) stats.lastCheck = date
      }
    }
  }
  return stats
}
