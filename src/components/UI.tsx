import {
  ArrowRight,
  Bookmark,
  CalendarClock,
  Check,
  FlaskConical,
  MapPin,
  Radar,
  Wallet,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { CSSProperties, MouseEvent } from 'react'
import type { ApplicationStatus, Opportunity } from '../types/opportunity'
import {
  applicationStatus,
  closingSoonLabel,
  formatDate,
} from '../lib/opportunities'
import { evidenceFor, factText } from '../lib/evidence'
import { withViewTransition } from '../lib/viewTransition'
import { useDevice } from '../lib/useDevice'
import { rememberCatalogue } from '../lib/catalogueNavigation'
import { institutionHue, monogram } from '../lib/monogram'
import { sound } from '../lib/sound'

export function Brand() {
  return (
    <Link to="/" className="brand" aria-label="BioIntern Radar home">
      <span className="brand-mark">
        <Radar size={25} strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span>
        BioIntern<span className="brand-light"> Radar</span>
      </span>
    </Link>
  )
}
export function SampleNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`sample-notice ${compact ? 'compact' : ''}`}>
      <FlaskConical size={18} aria-hidden="true" />
      <p>
        <strong>Fictional demo collection.</strong> These records are interface
        examples, not real openings or verified facts.
      </p>
    </div>
  )
}
export function CollectionNotice({ demo = false }: { demo?: boolean }) {
  return (
    <details className={`collection-disclosure ${demo ? 'is-demo' : ''}`}>
      <summary>
        <Check size={15} aria-hidden="true" />
        <span>
          {demo ? (
            <strong>Fictional demo collection.</strong>
          ) : (
            'Official sources · dated field evidence'
          )}
        </span>
      </summary>
      <p>
        {demo
          ? 'These records are interface examples, not real openings or verified facts.'
          : 'Each field carries its own source and actual check date; dates may differ. A source check does not mean applications are open or every field is known. Confirm current details with the official source before applying.'}
      </p>
    </details>
  )
}
export function StatusBadge({
  status,
  demo = false,
}: {
  status: ApplicationStatus
  demo?: boolean
}) {
  return (
    <span
      className={`status status-${status.toLowerCase().replaceAll(' ', '-')}`}
    >
      <span aria-hidden="true" />
      {status}
      {demo ? ' · demo' : ''}
    </span>
  )
}
export function SaveButton({
  opportunity: item,
  compact = false,
}: {
  opportunity: Opportunity
  compact?: boolean
}) {
  const { data, toggleSaved } = useDevice()
  const location = useLocation()
  const saved = data.savedIds.includes(item.id)
  return (
    <button
      type="button"
      className={`save-button ${saved ? 'is-saved' : ''}`}
      aria-pressed={saved}
      aria-label={`${saved ? 'Unsave' : 'Save'} ${item.title}`}
      onClick={() => {
        toggleSaved(item.id)
        sound.play(saved ? 'unsave' : 'save')
        if (saved && location.pathname === '/saved')
          requestAnimationFrame(() =>
            document
              .getElementById('catalogue-results')
              ?.focus({ preventScroll: true }),
          )
      }}
    >
      <Bookmark
        size={17}
        fill={saved ? 'currentColor' : 'none'}
        aria-hidden="true"
      />
      <span className={compact ? 'sr-only' : undefined}>
        {saved ? 'Saved' : 'Save'}
      </span>
    </button>
  )
}
function cardDeadline(item: Opportunity): string {
  if (item.deadline) return formatDate(item.deadline)
  if (evidenceFor(item, 'deadline').state === 'not-applicable')
    return 'No fixed deadline'
  return 'Deadline not stated'
}
function cardFunding(item: Opportunity): string {
  if (item.funding === 'Unknown') return 'Funding not stated'
  return item.isSample ? `${item.funding} · demo` : item.funding
}
export function OpportunityCard({
  opportunity: item,
}: {
  opportunity: Opportunity
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const status = applicationStatus(item)
  const closingSoon = item.isSample ? null : closingSoonLabel(item)
  const detailUrl = `/opportunities/${item.slug}`
  const institution = item.institution.split(' · ')[0]
  const openDetail = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    event.preventDefault()
    const fromCatalogue =
      location.pathname === '/opportunities' || location.pathname === '/saved'
    const catalogueReturn = fromCatalogue
      ? { url: location.pathname + location.search, scrollY: window.scrollY }
      : null
    if (catalogueReturn) rememberCatalogue(catalogueReturn)
    withViewTransition(
      () =>
        navigate(
          detailUrl,
          catalogueReturn ? { state: { catalogueReturn } } : undefined,
        ),
      event.currentTarget.closest('article'),
    )
  }
  return (
    <article
      className={`radar-card radar-card-${status.toLowerCase().replaceAll(' ', '-')}`}
      style={{ '--card-hue': institutionHue(institution) } as CSSProperties}
    >
      <div className="radar-card-top">
        <span className="radar-card-avatar" aria-hidden="true">
          {monogram(institution)}
        </span>
        <div className="radar-card-status">
          <StatusBadge status={status} demo={item.isSample} />
          {closingSoon && <span className="closing-soon">{closingSoon}</span>}
        </div>
        <SaveButton opportunity={item} compact />
      </div>
      {item.isSample && (
        <span className="record-badge is-demo">Fictional demo</span>
      )}
      <h3>
        <Link to={detailUrl} onClick={openDetail}>
          {item.title}
        </Link>
      </h3>
      <p className="radar-card-institution">{institution}</p>
      <ul className="radar-card-meta" aria-label="Key facts">
        <li>
          <MapPin size={15} aria-hidden="true" />
          <span className="sr-only">Country: </span>
          {factText(item, 'country')}
        </li>
        <li>
          <CalendarClock size={15} aria-hidden="true" />
          <span className="sr-only">Deadline: </span>
          {cardDeadline(item)}
        </li>
        <li>
          <Wallet size={15} aria-hidden="true" />
          <span className="sr-only">Funding: </span>
          {cardFunding(item)}
        </li>
      </ul>
      <span className="radar-card-more" aria-hidden="true">
        View details
        <ArrowRight size={16} />
      </span>
    </article>
  )
}

export function EmptyState({
  reset,
  saved = false,
  hasSaved = true,
  headingLevel = 3,
}: {
  reset: () => void
  saved?: boolean
  hasSaved?: boolean
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <div className="empty-state">
      <Radar size={38} strokeWidth={1.2} aria-hidden="true" />
      <Heading>
        {saved && !hasSaved
          ? 'Your next steps, all in one place'
          : 'No matches on the radar'}
      </Heading>
      <p>
        {saved && !hasSaved
          ? 'Save an opportunity to revisit its details and continue your preparation here.'
          : 'Try a broader search or remove a filter to find more opportunities.'}
      </p>
      {saved && !hasSaved ? (
        <Link className="button button-primary" to="/opportunities">
          Explore internships
        </Link>
      ) : (
        <button type="button" className="button button-primary" onClick={reset}>
          Clear search and filters
        </button>
      )}
    </div>
  )
}
