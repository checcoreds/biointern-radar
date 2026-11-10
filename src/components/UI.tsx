import {
  ArrowUpRight,
  Bookmark,
  Check,
  MapPin,
  FlaskConical,
  Radar,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useId, useState, type MouseEvent } from 'react'
import type { ApplicationStatus, Opportunity } from '../types/opportunity'
import {
  applicationStatus,
  closingSoonLabel,
  formatDate,
} from '../lib/opportunities'
import { factText } from '../lib/evidence'
import { useDevice } from '../lib/useDevice'
import { rememberCatalogue } from '../lib/catalogueNavigation'

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
      className={`save-button ${saved ? 'is-saved' : ''} ${compact ? 'compact-save' : ''}`}
      aria-pressed={saved}
      aria-label={`${saved ? 'Unsave' : 'Save'} ${item.title}`}
      onClick={() => {
        toggleSaved(item.id)
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
export function OpportunityCard({
  opportunity: item,
}: {
  opportunity: Opportunity
}) {
  const [topicsExpanded, setTopicsExpanded] = useState(false)
  const extraTopicsId = useId()
  const location = useLocation()
  const navigate = useNavigate()
  const status = applicationStatus(item)
  const closingSoon = item.isSample ? null : closingSoonLabel(item)
  const detailUrl = `/opportunities/${item.slug}`
  const openDetail = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    if (
      location.pathname !== '/opportunities' &&
      location.pathname !== '/saved'
    )
      return
    event.preventDefault()
    const catalogueReturn = {
      url: location.pathname + location.search,
      scrollY: window.scrollY,
    }
    rememberCatalogue(catalogueReturn)
    navigate(detailUrl, { state: { catalogueReturn } })
  }
  return (
    <article className="opportunity-card">
      <div className="card-top">
        <p className="card-category">{item.category}</p>
        <SaveButton opportunity={item} compact />
      </div>
      {item.isSample && (
        <span className="record-badge is-demo">Fictional demo</span>
      )}
      <h3>
        <Link to={detailUrl} onClick={openDetail}>
          {item.title}
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </h3>
      <p className="institution">{item.institution.split(' · ')[0]}</p>
      <p className="card-location">
        <MapPin size={14} aria-hidden="true" />
        <span>
          {factText(item, 'country')}
          <span aria-hidden="true"> · </span>
          <span className="sr-only">; period: </span>
          {factText(item, 'period')}
        </span>
      </p>
      <div className="topic-list">
        {item.scientificTopics.slice(0, 2).map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
        {item.scientificTopics.length > 2 && (
          <>
            <button
              type="button"
              className="more-topics"
              aria-expanded={topicsExpanded}
              aria-controls={extraTopicsId}
              aria-label={`${topicsExpanded ? 'Hide' : 'Show'} ${item.scientificTopics.length - 2} more research ${item.scientificTopics.length === 3 ? 'topic' : 'topics'} for ${item.title}`}
              onClick={() => setTopicsExpanded((expanded) => !expanded)}
            >
              {topicsExpanded
                ? 'Show fewer'
                : `+${item.scientificTopics.length - 2} more`}
            </button>
            <span
              id={extraTopicsId}
              className="extra-topics"
              hidden={!topicsExpanded}
            >
              {item.scientificTopics.slice(2).map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </span>
          </>
        )}
      </div>
      <dl className="card-key-facts">
        <div className="card-deadline">
          <dt>Deadline</dt>
          <dd>
            {item.deadline
              ? formatDate(item.deadline)
              : factText(item, 'deadline')}
            {closingSoon && (
              <span className="closing-soon"> · {closingSoon}</span>
            )}
          </dd>
        </div>
        <div>
          <dt>Funding</dt>
          <dd>
            {factText(item, 'funding')}
            {item.isSample && item.funding !== 'Unknown' ? ' · demo' : ''}
          </dd>
        </div>
        <div className="card-eligibility">
          <dt>Eligibility</dt>
          <dd>
            {factText(item, 'eligibleDegrees')}
            {item.eligibilitySummary && (
              <span className="card-eligibility-summary">
                {factText(item, 'eligibilitySummary')}
              </span>
            )}
          </dd>
        </div>
      </dl>
      <div className="card-bottom">
        <StatusBadge status={status} demo={item.isSample} />
        <span className="last-checked">
          {item.isSample
            ? 'Not verified'
            : item.verificationStatus === 'Needs review'
              ? 'Source needs clarification'
              : `Last checked ${formatDate(item.lastVerifiedDate)}`}
        </span>
      </div>
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
        <Link className="button button-dark" to="/opportunities">
          Explore internships
        </Link>
      ) : (
        <button className="button button-dark" onClick={reset}>
          Clear search and filters
        </button>
      )}
    </div>
  )
}
