import { sampleOpportunities } from '../data/opportunities'
import { realOpportunities } from '../data/realOpportunities'
import type {
  ApplicationStatus,
  Filters,
  Opportunity,
} from '../types/opportunity'

export const emptyFilters: Filters = {
  search: '',
  field: '',
  country: '',
  degree: '',
  status: '',
  funding: '',
  period: '',
  category: '',
  collection: '',
  sort: 'recommended',
  hideClosed: false,
}
const allOpportunities = [...realOpportunities, ...sampleOpportunities]
/** Replace this adapter with a database query in a future milestone. */
export const opportunityRepository = {
  list: (): readonly Opportunity[] => realOpportunities,
  listAll: (): readonly Opportunity[] => allOpportunities,
  findBySlug: (slug: string): Opportunity | undefined =>
    allOpportunities.find((item) => item.slug === slug),
}

/** Real numbers for the overview and footer: size, reach and freshness. */
export function catalogueFacts(items: readonly Opportunity[]) {
  const countries = new Set(
    items.flatMap(
      (item) => item.countries ?? (item.country ? [item.country] : []),
    ),
  )
  const checks = items
    .map((item) => item.lastVerifiedDate)
    .filter((date): date is string => Boolean(date))
    .sort()
  return {
    records: items.length,
    countries: countries.size,
    /** The most recent field check of any record; older checks keep their own dates. */
    latestCheck: checks.at(-1) ?? null,
  }
}

export function applicationStatus(
  item: Opportunity,
  now = new Date(),
): ApplicationStatus {
  if (item.category === 'Speculative lab outreach')
    return 'No advertised vacancy'
  // An elapsed, exact deadline can close a call. A future deadline never proves it is open.
  if (
    !item.isSample &&
    item.deadlineAt &&
    Date.parse(item.deadlineAt) < now.getTime()
  )
    return 'Closed'
  if (
    !item.isSample &&
    item.deadline &&
    !item.deadlineAt &&
    item.deadline < now.toISOString().slice(0, 10)
  )
    return 'Closed'
  return item.applicationStatus
}

/** Whole calendar days from today (UTC) until a date-only deadline. */
export function daysUntil(date: string, now = new Date()): number {
  const target = Date.parse(`${date.slice(0, 10)}T00:00:00Z`)
  const today = Date.parse(`${now.toISOString().slice(0, 10)}T00:00:00Z`)
  return Math.round((target - today) / 86_400_000)
}

/** Short urgency hint for an open call closing within two weeks. */
export function closingSoonLabel(
  item: Opportunity,
  now = new Date(),
): string | null {
  if (!item.deadline || applicationStatus(item, now) !== 'Open') return null
  const days = daysUntil(item.deadline, now)
  if (days < 0 || days > 14) return null
  if (days === 0) return 'Closes today'
  return days === 1 ? '1 day left' : `${days} days left`
}

/** Open calls first (soonest deadline), then upcoming ones, for the overview. */
export function featuredOpportunities(
  items: readonly Opportunity[],
  count = 3,
  now = new Date(),
): Opportunity[] {
  const byDeadline = (status: ApplicationStatus) =>
    sortOpportunities(
      items.filter((item) => applicationStatus(item, now) === status),
      'deadline-asc',
    )
  const picks = [...byDeadline('Open'), ...byDeadline('Upcoming')]
  return (picks.length ? picks : sortOpportunities(items, 'recommended')).slice(
    0,
    count,
  )
}

export function filterOpportunities(
  items: readonly Opportunity[],
  filters: Filters,
  now = new Date(),
): Opportunity[] {
  const terms = filters.search
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
  return items.filter((item) => {
    const searchable = [
      item.title,
      item.institution,
      item.country ?? 'Unknown',
      ...(item.countries ?? []),
      item.location ?? '',
      item.category,
      ...item.scientificTopics,
    ]
      .join(' ')
      .toLocaleLowerCase()
    const status = applicationStatus(item, now)
    return (
      terms.every((term) => searchable.includes(term)) &&
      (!filters.collection ||
        filters.collection === 'all' ||
        (filters.collection === 'demo' ? item.isSample : !item.isSample)) &&
      (!filters.field || item.scientificTopics.includes(filters.field)) &&
      (!filters.country ||
        (item.countries ?? [item.country ?? 'Unknown']).includes(
          filters.country,
        )) &&
      (!filters.degree ||
        (filters.degree === 'Unknown'
          ? item.eligibleDegrees === null
          : item.eligibleDegrees?.some(
              (degree) => degree === filters.degree,
            ))) &&
      (!filters.status || status === filters.status) &&
      (!filters.funding || item.funding === filters.funding) &&
      (!filters.period || item.period === filters.period) &&
      (!filters.category || item.category === filters.category) &&
      (!filters.hideClosed || status !== 'Closed')
    )
  })
}

export function sortOpportunities(
  items: readonly Opportunity[],
  sort: string,
): Opportunity[] {
  return [...items].sort((a, b) => {
    if (sort === 'deadline-asc' || sort === 'deadline-desc') {
      if (!a.deadline && !b.deadline) return a.title.localeCompare(b.title)
      if (!a.deadline) return 1
      if (!b.deadline) return -1
      const difference = a.deadline.localeCompare(b.deadline)
      return (
        (sort === 'deadline-desc' ? -difference : difference) ||
        a.title.localeCompare(b.title)
      )
    }
    const rank = (item: Opportunity) =>
      ({
        Open: 0,
        Upcoming: 1,
        'No advertised vacancy': 2,
        Unknown: 3,
        Closed: 4,
      })[applicationStatus(item)]
    return rank(a) - rank(b) || a.title.localeCompare(b.title)
  })
}

export function readFilters(
  params: URLSearchParams,
  defaultCollection = 'real',
): Filters {
  return {
    search: params.get('search') ?? '',
    field: params.get('field') ?? '',
    country: params.get('country') ?? '',
    degree: params.get('degree') ?? '',
    status: params.get('status') ?? '',
    funding: params.get('funding') ?? '',
    period: params.get('period') ?? '',
    category: params.get('category') ?? '',
    collection: params.get('collection') ?? defaultCollection,
    sort: params.get('sort') ?? 'recommended',
    hideClosed: params.get('hideClosed') === 'true',
  }
}

export function formatDate(date: string | null | undefined): string {
  if (!date || !Number.isFinite(Date.parse(date))) return 'Not yet checked'
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}
export function safeSourceUrl(url: string | null): string | null {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' ? parsed.href : null
  } catch {
    return null
  }
}
