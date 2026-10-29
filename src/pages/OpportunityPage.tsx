import {
  ArrowLeft,
  ArrowUpRight,
  CircleHelp,
  ShieldCheck,
  Link2,
} from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Checklist } from '../components/Checklist'
import { SampleNotice, SaveButton, StatusBadge } from '../components/UI'
import {
  applicationStatus,
  formatDate,
  opportunityRepository,
  safeSourceUrl,
} from '../lib/opportunities'
import { evidenceFor, evidenceLabels, factText } from '../lib/evidence'
import { getCatalogueReturn } from '../lib/catalogueNavigation'
import type { FactKey, Opportunity } from '../types/opportunity'

const fieldLabels: Record<FactKey, string> = {
  country: 'Country',
  location: 'Location',
  eligibleDegrees: 'Degree level',
  eligibilityDetails: 'Other eligibility conditions',
  eligibilitySummary: 'Key eligibility restrictions',
  yearOfStudyRequirement: 'Year of study',
  gpaRequirement: 'GPA requirement',
  requiredDocuments: 'Required documents',
  funding: 'Funding',
  fundingDetails: 'Funding details',
  costs: 'Fees and costs',
  duration: 'Duration',
  period: 'Approximate period',
  dates: 'Programme dates',
  deadline: 'Application deadline',
  applicationStatus: 'Application status',
  applicationRoute: 'Application route',
}
function FactField({
  item,
  field,
  label,
  text,
}: {
  item: Opportunity
  field: FactKey
  label: string
  text?: string
}) {
  return (
    <div className="detail-field">
      <dt>{label}</dt>
      <dd>{text ?? factText(item, field)}</dd>
    </div>
  )
}
function SectionSources({
  item,
  fields,
}: {
  item: Opportunity
  fields: FactKey[]
}) {
  if (item.isSample) return null
  return (
    <details className="section-sources">
      <summary>
        <Link2 size={14} aria-hidden="true" />
        Sources & notes
        <span className="sr-only">
          {' '}
          for {fields.map((field) => fieldLabels[field]).join(', ')}
        </span>
      </summary>
      <ul>
        {fields.map((field) => {
          const evidence = evidenceFor(item, field)
          const source = safeSourceUrl(evidence.sourceUrl)
          return (
            <li key={field}>
              <strong>{fieldLabels[field]}</strong>
              <span>
                {evidenceLabels[evidence.state]}
                {evidence.checkedAt
                  ? ` · ${formatDate(evidence.checkedAt)}`
                  : ''}
              </span>
              {source && (
                <a href={source} target="_blank" rel="noopener noreferrer">
                  Official source
                  <ArrowUpRight size={13} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {evidence.note && <p>{evidence.note}</p>}
            </li>
          )
        })}
      </ul>
    </details>
  )
}
export function OpportunityPage() {
  const { slug } = useParams()
  const location = useLocation()
  const item = opportunityRepository.findBySlug(slug ?? '')
  const state = location.state as { catalogueReturn?: unknown } | null
  const returnTarget = getCatalogueReturn(state?.catalogueReturn)
  const backUrl = returnTarget?.url ?? '/opportunities'
  const backState = returnTarget ? { restoreCatalogue: returnTarget } : null
  if (!item)
    return (
      <div className="container not-found">
        <span className="eyebrow">OFF THE RADAR</span>
        <h1>Opportunity not found.</h1>
        <p>This record may have moved, or the link may be incorrect.</p>
        <Link className="button button-dark" to={backUrl} state={backState}>
          <ArrowLeft size={17} aria-hidden="true" /> Back to the catalogue
        </Link>
      </div>
    )
  const source = safeSourceUrl(item.sourceUrl)
  return (
    <div className="container detail-page">
      <Link className="back-link" to={backUrl} state={backState}>
        <ArrowLeft size={17} aria-hidden="true" />
        Back to{' '}
        {returnTarget?.url.startsWith('/saved')
          ? 'saved opportunities'
          : 'the catalogue'}
      </Link>
      {item.isSample && <SampleNotice compact />}
      <div className="detail-heading">
        <div className="detail-badges">
          {(item.isSample || item.verificationStatus === 'Needs review') && (
            <span className={`record-badge ${item.isSample ? 'is-demo' : ''}`}>
              {item.isSample
                ? 'Fictional demo · not verified'
                : item.verificationStatus === 'Needs review'
                  ? 'Official sources · clarification needed'
                  : 'Official sources checked'}
            </span>
          )}
          <span className="category-badge">{item.category}</span>
          <SaveButton opportunity={item} />
        </div>
        <h1>{item.title}</h1>
        <p className="detail-institution">{item.institution}</p>
        <p className="detail-cycle">
          {item.cycleLabel ?? 'Fictional demonstration scenario'}
        </p>
        <p className="detail-status">
          <StatusBadge status={applicationStatus(item)} demo={item.isSample} />
          {item.isSample
            ? ' · fictional status'
            : ` · last checked ${formatDate(item.lastVerifiedDate)}`}
        </p>
        <div className="topic-list">
          {item.scientificTopics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>
      </div>
      <section className="opportunity-summary" aria-label="Opportunity summary">
        <dl>
          <div>
            <dt>Deadline</dt>
            <dd>
              {item.deadline
                ? formatDate(item.deadline)
                : factText(item, 'deadline')}
            </dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{factText(item, 'duration')}</dd>
          </div>
          <div>
            <dt>Funding</dt>
            <dd>{factText(item, 'funding')}</dd>
          </div>
        </dl>
        {source ? (
          <a
            className="button button-dark summary-source"
            aria-label="Read the official source (opens in a new tab)"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official source
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ) : (
          <p className="summary-demo-note">
            Fictional demo · no official application link
          </p>
        )}
      </section>
      {item.reviewNote && (
        <div className="review-notice">
          <CircleHelp size={20} aria-hidden="true" />
          <p>{item.reviewNote}</p>
        </div>
      )}
      {item.category === 'Speculative lab outreach' && (
        <div className="inline-note outreach-note">
          <CircleHelp size={20} aria-hidden="true" />
          <p>
            <strong>No advertised vacancy.</strong> This is an enquiry route,
            not a confirmed opening. A lab may have no capacity or funding.
          </p>
        </div>
      )}
      <div className="detail-layout">
        <div className="detail-main">
          <section className="panel">
            <span className="eyebrow">01 / The research</span>
            <h2>What will I do?</h2>
            <p>{item.description}</p>
            <dl>
              <FactField
                item={item}
                field="location"
                label="Location"
                text={item.location ?? factText(item, 'country')}
              />
              <FactField item={item} field="country" label="Country" />
            </dl>
            <SectionSources item={item} fields={['location', 'country']} />
          </section>
          <section className="panel">
            <span className="eyebrow">02 / Eligibility</span>
            <h2>Am I eligible?</h2>
            <dl className="detail-fields">
              <FactField
                item={item}
                field="eligibleDegrees"
                label="Degree level"
              />
              <FactField
                item={item}
                field="yearOfStudyRequirement"
                label="Year of study"
              />
              <FactField
                item={item}
                field="gpaRequirement"
                label="GPA requirement"
              />
              <FactField
                item={item}
                field="eligibilityDetails"
                label="Other eligibility conditions"
              />
            </dl>
            <SectionSources
              item={item}
              fields={[
                'eligibleDegrees',
                'yearOfStudyRequirement',
                'gpaRequirement',
                'eligibilityDetails',
              ]}
            />
          </section>
          <section className="panel">
            <span className="eyebrow">03 / Timing</span>
            <h2>When does it happen?</h2>
            <dl className="detail-fields">
              <FactField item={item} field="dates" label="Programme dates" />
              <FactField item={item} field="duration" label="Duration" />
              <FactField
                item={item}
                field="period"
                label="Approximate period"
              />
              <FactField
                item={item}
                field="deadline"
                label="Application deadline"
                text={item.deadline ? formatDate(item.deadline) : undefined}
              />
            </dl>
            {item.deadlineAt && (
              <p className="deadline-time">
                Exact published cut-off:{' '}
                {new Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                  timeZone: 'Europe/Rome',
                }).format(new Date(item.deadlineAt))}{' '}
                (Europe/Rome). Check the source for its original time zone.
              </p>
            )}
            <SectionSources
              item={item}
              fields={['dates', 'duration', 'period', 'deadline']}
            />
          </section>
          <section className="panel">
            <span className="eyebrow">04 / Funding & costs</span>
            <h2>What does it cost?</h2>
            <dl>
              <FactField item={item} field="funding" label="Funding category" />
              <FactField
                item={item}
                field="fundingDetails"
                label="What the support covers"
              />
              <FactField
                item={item}
                field="costs"
                label="Fees and costs to plan for"
              />
            </dl>
            <p className="data-caption">
              “Funded” does not promise every expense is covered. Unstated costs
              and missing requirements still need confirming.
            </p>
            <SectionSources
              item={item}
              fields={['funding', 'fundingDetails', 'costs']}
            />
          </section>
          <section className="panel">
            <span className="eyebrow">05 / Application materials</span>
            <h2>What must I prepare?</h2>
            <dl>
              <FactField
                item={item}
                field="requiredDocuments"
                label="Documents stated in the checked source"
              />
            </dl>
            <SectionSources item={item} fields={['requiredDocuments']} />
          </section>
          <section className="panel">
            <span className="eyebrow">06 / Your next step</span>
            <h2>How do I apply?</h2>
            <dl>
              <FactField
                item={item}
                field="applicationStatus"
                label="Application status"
                text={applicationStatus(item)}
              />
              <FactField
                item={item}
                field="applicationRoute"
                label="Application route"
              />
            </dl>
            {source && (
              <a
                className="button button-dark official-button"
                href={source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read official application guidance
                <ArrowUpRight size={17} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
            {applicationStatus(item) === 'Closed' && (
              <p className="data-caption">
                This call is closed. The source may announce a later cycle; do
                not submit against an old deadline.
              </p>
            )}
            <SectionSources
              item={item}
              fields={['applicationStatus', 'applicationRoute']}
            />
          </section>
          <Checklist category={item.category} opportunityId={item.id} />
        </div>
        <aside className="detail-sidebar">
          <section className="panel verification-panel">
            <div className="panel-title">
              <ShieldCheck size={22} aria-hidden="true" />
              <h2>Sources & last check</h2>
            </div>
            <p>
              {item.isSample
                ? 'Fictional fixture. Nothing in this record is verified against a real programme.'
                : 'Source checks apply only to the stated fields and named cycle. They do not establish that applications remain open.'}
            </p>
            {item.isSample ? (
              <p className="data-caption">
                No official source or application link.
              </p>
            ) : (
              <ul className="source-list">
                {item.sources?.map((official) => (
                  <li
                    key={`${official.url}:${official.checkedAt}:${official.title}`}
                  >
                    <a
                      href={official.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {official.title}
                      <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                    <span>Checked {formatDate(official.checkedAt)}</span>
                    {official.note && <p>{official.note}</p>}
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="panel meaning-panel">
            <h2>Read the labels</h2>
            <dl>
              <div>
                <dt>Not stated by the source</dt>
                <dd>The checked page does not provide this detail.</dd>
              </div>
              <div>
                <dt>Not yet checked</dt>
                <dd>We have not verified this field.</dd>
              </div>
              <div>
                <dt>Not applicable</dt>
                <dd>
                  This field does not apply to the stated route, with a reason
                  provided.
                </dd>
              </div>
            </dl>
            <p>
              No missing label means “no requirement.” Confirm before applying.
            </p>
          </section>
        </aside>
      </div>
    </div>
  )
}
