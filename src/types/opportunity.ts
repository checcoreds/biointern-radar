export type Category =
  'Structured programme' | 'Advertised position' | 'Speculative lab outreach'
export type ApplicationStatus =
  'Open' | 'Upcoming' | 'Closed' | 'Unknown' | 'No advertised vacancy'
export type Funding = 'Funded' | 'Partially funded' | 'Unpaid' | 'Unknown'
export type Period = 'Summer' | 'Academic year' | 'Flexible' | 'Unknown'
export type Degree = 'Bachelor’s' | 'Master’s'
export type VerificationStatus =
  'Sample' | 'Unverified' | 'Source checked' | 'Needs review'

export type EvidenceState =
  | 'source-checked'
  | 'not-stated'
  | 'not-checked'
  | 'not-applicable'
  | 'unclear'
  | 'sample'
export interface FieldEvidence {
  state: EvidenceState
  sourceUrl: string | null
  checkedAt: string | null
  note?: string
}
export const factKeys = [
  'country',
  'location',
  'eligibleDegrees',
  'eligibilityDetails',
  'eligibilitySummary',
  'yearOfStudyRequirement',
  'gpaRequirement',
  'requiredDocuments',
  'funding',
  'fundingDetails',
  'costs',
  'duration',
  'period',
  'dates',
  'deadline',
  'applicationStatus',
  'applicationRoute',
] as const
export type FactKey = (typeof factKeys)[number]
export interface OfficialSource {
  title: string
  url: string
  checkedAt: string
  note?: string
}

/** JSON-compatible contract. Null means unknown, never "no requirement". */
export interface Opportunity {
  id: string
  slug: string
  title: string
  institution: string
  country: string | null
  countries?: string[]
  scientificTopics: string[]
  category: Category
  description: string
  eligibleDegrees: Degree[] | null
  yearOfStudyRequirement: string | null
  gpaRequirement: string | null
  requiredDocuments: string[] | null
  funding: Funding
  fundingDetails: string | null
  duration: string | null
  period: Period
  deadline: string | null
  applicationStatus: ApplicationStatus
  applicationRoute: string | null
  sourceUrl: string | null
  lastVerifiedDate: string | null
  verificationStatus: VerificationStatus
  isSample: boolean
  location?: string | null
  eligibilityDetails?: string | null
  /** Concise, sourced restrictions for browsing; never the complete eligibility rules. */
  eligibilitySummary?: string | null
  dates?: string | null
  costs?: string | null
  cycleLabel?: string
  deadlineAt?: string | null
  sources?: OfficialSource[]
  evidence?: Partial<Record<FactKey, FieldEvidence>>
  reviewNote?: string
}

export interface Filters {
  search: string
  field: string
  country: string
  degree: string
  status: string
  funding: string
  period: string
  category: string
  collection: string
  sort: string
  hideClosed: boolean
}
