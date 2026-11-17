import { useRef, useState, type FormEvent } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { OpportunityCard, CollectionNotice } from '../components/UI'
import { SpecimenHero } from '../components/home/SpecimenHero'
import { FocusSeries } from '../components/home/FocusSeries'
import { EvidenceFigure } from '../components/home/EvidenceFigure'
import { FocusGauge } from '../components/home/FocusGauge'
import {
  catalogueFacts,
  featuredOpportunities,
  opportunityRepository,
} from '../lib/opportunities'
import { evidenceStats } from '../lib/evidenceStats'
import { useSectionProgress } from '../lib/scrollProgress'

const steps = [
  {
    number: '1',
    title: 'Find an opportunity',
    description: 'Filter by research field, country and funding.',
  },
  {
    number: '2',
    title: 'Check the requirements',
    description:
      'Compare eligibility and deadlines. Unknown details stay labelled.',
  },
  {
    number: '3',
    title: 'Prepare to apply',
    description:
      'Save opportunities, follow your checklist and apply through the official source.',
  },
]

/** The overview: a focus series down one optical axis. See BRIEF.md. */
export function HomePage() {
  const records = opportunityRepository.list()
  const facts = catalogueFacts(records)
  const featured = featuredOpportunities(records, 4)
  const [focusRecord, ...soonest] = featured
  const stats = evidenceStats(records)
  const pages = new Set(
    records.flatMap((item) => (item.sources ?? []).map((source) => source.url)),
  ).size
  const decoys = [
    ...new Set(
      records
        .filter((item) => item.id !== focusRecord?.id)
        .map((item) => item.institution.split(' · ')[0]),
    ),
  ]

  return (
    <div className="focal-series">
      <SpecimenHero
        records={facts.records}
        countries={facts.countries}
        latestCheck={facts.latestCheck}
      />

      <section
        className="scatter-plane"
        id="plane-scatter"
        data-sc-act="scatter"
      >
        <div className="container">
          <p className="scatter-line">
            Every institute publishes its own call, on its own page, in its own
            format.
          </p>
          <p className="scatter-note">
            This catalogue is built from {pages} of those pages, read by hand.
          </p>
        </div>
      </section>

      {focusRecord && <FocusSeries record={focusRecord} decoys={decoys} />}

      <section
        className="evidence-plane"
        id="plane-evidence"
        data-sc-act="evidence"
        aria-labelledby="evidence-title"
      >
        <div className="container evidence-layout">
          <div className="evidence-copy">
            <h2 id="evidence-title">Unknowns stay unknown.</h2>
            <p>
              When a page does not say something, the record says so. A missing
              GPA never turns into “no GPA required”, and when two official
              pages disagree, both readings are shown.
            </p>
          </div>
          <EvidenceFigure stats={stats} />
        </div>
      </section>

      <section
        className="collection-plane"
        id="plane-collection"
        data-sc-act="collection"
        aria-labelledby="collection-title"
      >
        <div className="container">
          <div className="section-heading">
            <h2 id="collection-title">More calls closing soon</h2>
            <Link className="text-link" to="/opportunities">
              View the catalogue <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <CollectionNotice />
          <div className="cards-grid home-cards">
            {soonest.map((item) => (
              <OpportunityCard key={item.id} opportunity={item} />
            ))}
          </div>
        </div>
      </section>

      <Protocol />

      <SearchPlane />

      <FocusGauge />
    </div>
  )
}

function Protocol() {
  const section = useRef<HTMLElement>(null)
  useSectionProgress(
    section,
    'enter',
    (progress) =>
      section.current?.style.setProperty('--draw', progress.toFixed(3)),
    0.85,
  )
  return (
    <section
      ref={section}
      id="how-it-works"
      className="protocol-plane"
      data-sc-act="protocol"
      aria-labelledby="protocol-title"
    >
      <div className="container protocol-layout">
        <h2 id="protocol-title">How it works</h2>
        <div className="protocol-body">
          <div className="protocol-track">
            <svg
              className="protocol-line"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="1" y1="0" x2="1" y2="100" pathLength="1" />
            </svg>
            <ol className="protocol-steps">
              {steps.map(({ number, title, description }) => (
                <li className="protocol-step" key={number}>
                  <span className="protocol-number" aria-hidden="true">
                    {number}
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
          <details className="pathway-disclosure">
            <summary>Understand the three opportunity types</summary>
            <dl>
              <div>
                <dt>Structured programme</dt>
                <dd>A defined programme with its own application process.</dd>
              </div>
              <div>
                <dt>Advertised position</dt>
                <dd>
                  A specific research opening advertised by a lab or
                  institution.
                </dd>
              </div>
              <div>
                <dt>Speculative lab outreach</dt>
                <dd>An enquiry to a lab, with no confirmed vacancy.</dd>
              </div>
            </dl>
          </details>
        </div>
      </div>
    </section>
  )
}

/** The deepest plane ends on a real input, not a button island. */
function SearchPlane() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const search = query.trim()
    navigate(
      search
        ? `/opportunities?search=${encodeURIComponent(search)}`
        : '/opportunities',
    )
  }
  return (
    <section
      className="search-plane"
      id="plane-search"
      data-sc-act="search"
      aria-labelledby="search-title"
    >
      <div className="container">
        <h2 id="search-title">Where do you want to spend your summer?</h2>
        <form
          className="search-plane-form"
          role="search"
          action="/opportunities"
          method="get"
          onSubmit={submit}
        >
          <label htmlFor="plane-search-input" className="sr-only">
            Search field, country or institute
          </label>
          <Search size={20} aria-hidden="true" />
          <input
            id="plane-search-input"
            name="search"
            type="search"
            placeholder="Try genomics, Germany or EMBL"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" className="button button-primary">
            Explore internships
          </button>
        </form>
      </div>
    </section>
  )
}
