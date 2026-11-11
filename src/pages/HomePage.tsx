import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { SweepRadar } from '../components/radar/SweepRadar'
import { Link } from 'react-router-dom'
import { OpportunityCard, CollectionNotice } from '../components/UI'
import { CountUp } from '../components/CountUp'
import {
  catalogueFacts,
  featuredOpportunities,
  formatDate,
  opportunityRepository,
} from '../lib/opportunities'

const steps = [
  {
    number: '01',
    title: 'Find an opportunity',
    description: 'Filter by research field, country and funding.',
  },
  {
    number: '02',
    title: 'Check the requirements',
    description:
      'Compare eligibility and deadlines. Unknown details stay labelled.',
  },
  {
    number: '03',
    title: 'Prepare to apply',
    description:
      'Save opportunities, follow your checklist and apply through the official source.',
  },
]

export function HomePage() {
  const records = opportunityRepository.list()
  const facts = catalogueFacts(records)
  return (
    <>
      <section className="hero">
        <div className="container hero-layout">
          <div className="hero-copy">
            <h1>
              Find a research
              <br />
              <span>internship.</span>
            </h1>
            <p className="hero-description">
              Life-sciences opportunities for undergraduates. Compare
              requirements and prepare to apply.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/opportunities">
                Explore internships{' '}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <ul className="hero-facts" aria-label="Catalogue at a glance">
              <li>
                <strong>
                  <CountUp value={facts.records} />
                </strong>
                <span>opportunities</span>
              </li>
              <li>
                <strong>
                  <CountUp value={facts.countries} />
                </strong>
                <span>countries</span>
              </li>
              {facts.latestCheck && (
                <li>
                  <strong>
                    <time dateTime={facts.latestCheck}>
                      {formatDate(facts.latestCheck)}
                    </time>
                  </strong>
                  <span>latest source check</span>
                </li>
              )}
            </ul>
          </div>
          <SweepRadar />
        </div>
      </section>
      <section className="container section-pad">
        <div className="section-heading">
          <h2>Internships to explore</h2>
          <Link className="text-link" to="/opportunities">
            View the catalogue <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <CollectionNotice />
        <div className="cards-grid home-cards">
          {featuredOpportunities(records).map((item) => (
            <OpportunityCard key={item.id} opportunity={item} />
          ))}
        </div>
      </section>
      <section id="how-it-works" className="how-section">
        <div className="container section-pad">
          <div className="section-heading">
            <h2>How it works</h2>
          </div>
          <ol className="steps-grid">
            {steps.map(({ number, title, description }) => (
              <li className="step" key={number}>
                <span className="step-number" aria-hidden="true">
                  {number}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
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
      </section>
    </>
  )
}
