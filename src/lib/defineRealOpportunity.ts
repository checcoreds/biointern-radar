import { factKeys } from '../types/opportunity'
import type {
  FactKey,
  FieldEvidence,
  OfficialSource,
  Opportunity,
} from '../types/opportunity'

export type RealOpportunityInput = Omit<
  Opportunity,
  'isSample' | 'lastVerifiedDate' | 'sourceUrl' | 'sources' | 'evidence'
> & {
  sourceUrl: string
  sources: OfficialSource[]
  evidence: Record<FactKey, FieldEvidence>
}

const validDate = (value: string | null): value is string => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  )
}
const validUrl = (value: string | null): value is string => {
  try {
    return new URL(value ?? '').protocol === 'https:'
  } catch {
    return false
  }
}

/** Fail closed: adding a value never verifies it or assigns today's date. */
export function defineRealOpportunity(
  input: RealOpportunityInput,
): Opportunity {
  const fail = (message: string): never => {
    throw new Error(`${input.id}: ${message}`)
  }
  if (!validUrl(input.sourceUrl) || !input.sources?.length)
    fail('an official HTTPS source and dated source entries are required')
  for (const source of input.sources) {
    if (!validUrl(source.url) || !validDate(source.checkedAt))
      fail('each source requires an HTTPS URL and a valid actual check date')
  }
  const checkedDates: string[] = []
  for (const key of factKeys) {
    const evidence = input.evidence?.[key]
    if (!evidence) fail(`explicit evidence is required for ${key}`)
    if (evidence.state === 'not-checked') {
      if (evidence.checkedAt !== null || evidence.sourceUrl !== null)
        fail(`${key}: unchecked evidence must not claim a source check`)
      continue
    }
    if (
      !['source-checked', 'not-stated', 'not-applicable', 'unclear'].includes(
        evidence.state,
      )
    )
      fail(`${key}: invalid evidence state for a real record`)
    if (!validUrl(evidence.sourceUrl) || !validDate(evidence.checkedAt))
      fail(`${key}: evidence requires an HTTPS source and actual check date`)
    if (
      !input.sources.some(
        (source) =>
          source.url === evidence.sourceUrl &&
          source.checkedAt === evidence.checkedAt,
      )
    )
      fail(`${key}: evidence must match a listed source and its check date`)
    const value = input[key]
    if (
      evidence.state === 'source-checked' &&
      (value == null ||
        value === 'Unknown' ||
        value === '' ||
        (Array.isArray(value) && value.length === 0))
    )
      fail(`${key}: a checked fact must have a value`)
    if (evidence.state === 'not-applicable' && !evidence.note?.trim())
      fail(`${key}: explain why this field does not apply`)
    checkedDates.push(evidence.checkedAt!)
  }
  if (
    input.verificationStatus === 'Source checked' &&
    !factKeys.some((key) => input.evidence[key].state === 'source-checked')
  )
    fail('Source checked requires at least one explicitly checked fact')
  if (
    ['Sample', 'Unverified'].includes(input.verificationStatus) &&
    checkedDates.length
  )
    fail('verification status conflicts with dated evidence')
  return {
    ...input,
    isSample: false,
    // Summary only: section notes retain every individual field's actual date.
    lastVerifiedDate: checkedDates.sort().at(-1) ?? null,
  }
}
