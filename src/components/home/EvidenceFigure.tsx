import { useRef } from 'react'
import { CountUp } from '../CountUp'
import { formatDate } from '../../lib/opportunities'
import type { EvidenceStats } from '../../lib/evidenceStats'
import { useSectionProgress } from '../../lib/scrollProgress'

/**
 * A journal-style figure of the whole catalogue: every fact of every real
 * record, split by its evidence state. All numbers are computed from the
 * data on each build; nothing here is typed by hand.
 */
export function EvidenceFigure({ stats }: { stats: EvidenceStats }) {
  const figure = useRef<HTMLElement>(null)
  useSectionProgress(
    figure,
    'enter',
    (progress) =>
      figure.current?.style.setProperty('--grow', progress.toFixed(3)),
    0.7,
  )
  const parts = [
    {
      key: 'checked',
      value: stats.checked,
      label: 'checked on the official page',
    },
    {
      key: 'not-stated',
      value: stats.notStated,
      label: 'not stated by the source, and marked so',
    },
    {
      key: 'unclear',
      value: stats.unclear,
      label: 'sources disagree, with both readings explained',
    },
    {
      key: 'not-applicable',
      value: stats.notApplicable,
      label: 'not applicable, with the reason',
    },
    {
      key: 'not-checked',
      value: stats.notChecked,
      label: 'not yet checked',
    },
  ].filter((part) => part.value > 0)

  return (
    <figure
      ref={figure}
      className="evidence-figure"
      aria-labelledby="evidence-caption"
    >
      <div className="evidence-bar" aria-hidden="true">
        {parts.map((part) => (
          <span
            key={part.key}
            className={`evidence-segment segment-${part.key}`}
            style={{ flexGrow: part.value }}
          />
        ))}
      </div>
      <ul className="evidence-legend">
        {parts.map((part) => (
          <li key={part.key}>
            <span
              className={`evidence-swatch segment-${part.key}`}
              aria-hidden="true"
            />
            <strong>
              <CountUp value={part.value} />
            </strong>
            <span>{part.label}</span>
          </li>
        ))}
      </ul>
      <figcaption id="evidence-caption">
        <strong>Figure 1.</strong> All {stats.total} facts in the catalogue, by
        evidence
        {stats.firstCheck && stats.lastCheck
          ? `, read between ${formatDate(stats.firstCheck)} and ${formatDate(stats.lastCheck)}`
          : ''}
        .
      </figcaption>
    </figure>
  )
}
