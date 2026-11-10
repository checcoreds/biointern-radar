import { applicationStatus } from './opportunities'
import type { Opportunity } from '../types/opportunity'

export type ReviewPriority = 'urgent' | 'soon' | 'routine' | 'ok'

export interface StatusReview {
  id: string
  title: string
  storedStatus: Opportunity['applicationStatus']
  displayedStatus: Opportunity['applicationStatus']
  deadline: string | null
  statusCheckedAt: string | null
  daysSinceStatusCheck: number | null
  daysUntilDeadline: number | null
  priority: ReviewPriority
  reasons: string[]
  sources: string[]
}

const DAY = 24 * 60 * 60 * 1000
const rank: Record<ReviewPriority, number> = {
  urgent: 0,
  soon: 1,
  routine: 2,
  ok: 3,
}

function daysBetween(fromIso: string, to: Date): number {
  const from = Date.parse(`${fromIso.slice(0, 10)}T00:00:00Z`)
  const today = Date.parse(`${to.toISOString().slice(0, 10)}T00:00:00Z`)
  return Math.round((today - from) / DAY)
}

/**
 * Lists which real records need a fresh look at their official sources.
 * It only reads stored data: it never changes a status or claims a check.
 */
export function reviewStatuses(
  records: readonly Opportunity[],
  now = new Date(),
): StatusReview[] {
  return records
    .filter((item) => !item.isSample)
    .map((item) => {
      const reasons: string[] = []
      let priority: ReviewPriority = 'ok'
      const raise = (level: ReviewPriority, reason: string) => {
        reasons.push(reason)
        if (rank[level] < rank[priority]) priority = level
      }
      const statusCheckedAt =
        item.evidence?.applicationStatus?.checkedAt ?? null
      const daysSinceStatusCheck = statusCheckedAt
        ? daysBetween(statusCheckedAt, now)
        : null
      const daysUntilDeadline = item.deadline
        ? -daysBetween(item.deadline, now)
        : null
      const displayed = applicationStatus(item, now)
      const stored = item.applicationStatus
      const outreach = item.category === 'Speculative lab outreach'

      if (displayed === 'Closed' && stored !== 'Closed')
        raise(
          'urgent',
          'Deadline has passed: confirm the call closed and look for the next cycle.',
        )
      if (stored === 'Upcoming' && daysUntilDeadline !== null)
        raise(
          (daysSinceStatusCheck ?? Infinity) > 7 ? 'soon' : 'routine',
          'Marked Upcoming: check whether applications have opened.',
        )
      if (
        (stored === 'Open' || stored === 'Upcoming') &&
        daysUntilDeadline !== null &&
        daysUntilDeadline >= 0 &&
        daysUntilDeadline <= 14
      )
        raise(
          'soon',
          `Deadline in ${daysUntilDeadline} day${daysUntilDeadline === 1 ? '' : 's'}: recheck for extensions or early closure.`,
        )
      if (stored === 'Unknown')
        raise('soon', 'Status unknown: look for an announced cycle.')
      if (daysSinceStatusCheck === null)
        raise('soon', 'Application status has never been checked.')
      else if (daysSinceStatusCheck > (outreach ? 90 : 30))
        raise(
          outreach ? 'routine' : 'soon',
          `Status last checked ${daysSinceStatusCheck} days ago.`,
        )
      if (item.verificationStatus === 'Needs review')
        raise('routine', item.reviewNote ?? 'Marked as needing review.')
      const unclear = Object.entries(item.evidence ?? {})
        .filter(([, evidence]) => evidence?.state === 'unclear')
        .map(([key]) => key)
      if (unclear.length)
        raise('routine', `Unclear source evidence: ${unclear.join(', ')}.`)

      return {
        id: item.id,
        title: `${item.institution} · ${item.title}`,
        storedStatus: stored,
        displayedStatus: displayed,
        deadline: item.deadline,
        statusCheckedAt,
        daysSinceStatusCheck,
        daysUntilDeadline,
        priority,
        reasons,
        sources: [...new Set((item.sources ?? []).map((source) => source.url))],
      }
    })
    .sort(
      (a, b) =>
        rank[a.priority] - rank[b.priority] ||
        (a.daysUntilDeadline ?? Infinity) - (b.daysUntilDeadline ?? Infinity) ||
        a.title.localeCompare(b.title),
    )
}
