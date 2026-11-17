import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { FactKey, Opportunity } from '../../types/opportunity'
import { evidenceFor, factText } from '../../lib/evidence'
import { applicationStatus, formatDate } from '../../lib/opportunities'
import { smoothstep, useSectionProgress } from '../../lib/scrollProgress'
import { sound } from '../../lib/sound'
import { StatusBadge } from '../UI'

const facts: { key: FactKey; label: string }[] = [
  { key: 'applicationStatus', label: 'Status' },
  { key: 'deadline', label: 'Deadline' },
  { key: 'country', label: 'Country' },
  { key: 'funding', label: 'Funding' },
  { key: 'eligibleDegrees', label: 'Degree level' },
  { key: 'gpaRequirement', label: 'GPA requirement' },
]

/**
 * Where each piece of the record starts: a depth in the specimen (0 near,
 * 1 far) and a scatter offset in viewport units and degrees. Depth decides
 * when it comes into focus, so the record assembles out of reading order,
 * the way a focal plane passes through things at different depths.
 */
const scatter = [
  { depth: 0.06, x: -4, y: -20, turn: -3 },
  { depth: 0.58, x: -20, y: -16, turn: -7 },
  { depth: 0.2, x: 21, y: -11, turn: 6 },
  { depth: 0.84, x: -23, y: 15, turn: 5 },
  { depth: 0.38, x: 17, y: 21, turn: -6 },
  { depth: 0.7, x: -9, y: 27, turn: 4 },
  { depth: 0.28, x: 24, y: 6, turn: -4 },
]

/** Other records' names drift past at their own depths, then fall away. */
const decoyPlaces = [
  { depth: 0.12, x: 6, y: 12 },
  { depth: 0.33, x: 68, y: 8 },
  { depth: 0.47, x: 12, y: 78 },
  { depth: 0.61, x: 74, y: 70 },
  { depth: 0.76, x: 40, y: 88 },
  { depth: 0.9, x: 82, y: 34 },
  { depth: 0.24, x: 3, y: 46 },
  { depth: 0.54, x: 58, y: 92 },
]

export function evidenceTag(item: Opportunity, key: FactKey): string {
  const evidence = evidenceFor(item, key)
  const date = evidence.checkedAt ? formatDate(evidence.checkedAt) : ''
  switch (evidence.state) {
    case 'source-checked':
      return `Checked ${date}`
    case 'not-stated':
      return `Not stated · read ${date}`
    case 'unclear':
      return `Sources disagree · ${date}`
    case 'not-applicable':
      return 'Not applicable'
    default:
      return 'Not yet checked'
  }
}

function factValue(item: Opportunity, key: FactKey): string {
  if (key === 'deadline' && item.deadline) return formatDate(item.deadline)
  return factText(item, key)
}

/**
 * The overview's peak. Scroll turns the fine-focus knob: the focal plane
 * travels through a scatter of details at different depths, each one
 * sharpens and locks into place as the plane reaches it, and the scatter
 * resolves into one real record with the evidence beside every line.
 */
export function FocusSeries({
  record,
  decoys,
}: {
  record: Opportunity
  decoys: string[]
}) {
  const section = useRef<HTMLElement>(null)
  const pieces = useRef<(HTMLElement | null)[]>([])
  const ghosts = useRef<(HTMLElement | null)[]>([])
  const locked = useRef(false)

  useSectionProgress(section, 'pinned', (progress) => {
    const stage = section.current
    if (!stage) return
    // The focal plane sweeps from just in front of the specimen to just
    // behind it over the first 80% of the travel, then holds.
    const focal = -0.1 + 1.25 * Math.min(1, progress / 0.8)
    stage.style.setProperty('--focus-p', progress.toFixed(4))
    stage.style.setProperty(
      '--sheet',
      smoothstep(0.72, 0.92, progress).toFixed(3),
    )
    pieces.current.forEach((piece, index) => {
      if (!piece) return
      const place = scatter[index]
      const lock = smoothstep(place.depth - 0.04, place.depth + 0.16, focal)
      const loose = 1 - lock
      piece.style.transform = `translate3d(${(place.x * loose).toFixed(2)}vw, ${(place.y * loose).toFixed(2)}vh, 0) rotate(${(place.turn * loose).toFixed(2)}deg) scale(${(0.9 + 0.1 * lock).toFixed(3)})`
      piece.style.filter =
        loose > 0.01 ? `blur(${(loose * 5).toFixed(2)}px)` : ''
      piece.style.opacity = (0.5 + 0.5 * lock).toFixed(3)
    })
    const fade = 1 - smoothstep(0.7, 0.86, progress)
    ghosts.current.forEach((ghost, index) => {
      if (!ghost) return
      const place = decoyPlaces[index]
      const sharp = 1 - Math.min(1, Math.abs(place.depth - focal) * 4)
      ghost.style.filter = `blur(${((1 - sharp) * 5).toFixed(2)}px)`
      ghost.style.opacity = ((0.3 + 0.6 * sharp) * fade).toFixed(3)
    })
    const done = progress > 0.84
    if (done && !locked.current) sound.play('focus')
    locked.current = done
  })

  const status = applicationStatus(record)
  const keep = (index: number) => (element: HTMLElement | null) => {
    pieces.current[index] = element
  }

  return (
    <section
      ref={section}
      className="focus-series"
      id="plane-focus"
      data-sc-act="focus"
      aria-labelledby="focus-title"
    >
      <div className="focus-stage">
        <div className="container focus-layout">
          <div className="focus-copy">
            <h2 id="focus-title">Then it comes into focus.</h2>
            <p>
              Every line was read on the organiser’s own page, on the date shown
              beside it. When the page says nothing, the record says so.
            </p>
            <div className="focus-knob" aria-hidden="true">
              <span className="focus-knob-dial" />
              <span className="focus-knob-label">Fine focus</span>
            </div>
          </div>
          <div className="focus-field">
            <div className="focus-ghosts" aria-hidden="true">
              {decoys.slice(0, decoyPlaces.length).map((name, index) => (
                <span
                  key={name}
                  ref={(element) => {
                    ghosts.current[index] = element
                  }}
                  className="focus-ghost"
                  style={{
                    left: `${decoyPlaces[index].x}%`,
                    top: `${decoyPlaces[index].y}%`,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
            <article className="fact-sheet">
              <header ref={keep(0)} className="fact-sheet-head">
                <p className="fact-sheet-kicker">Closing soonest</p>
                <h3>{record.title}</h3>
                <p>{record.institution.split(' · ')[0]}</p>
              </header>
              <dl>
                {facts.map(({ key, label }, index) => (
                  <div className="fact-row" key={key} ref={keep(index + 1)}>
                    <dt>{label}</dt>
                    <dd className="fact-value">
                      {key === 'applicationStatus' ? (
                        <StatusBadge status={status} />
                      ) : (
                        factValue(record, key)
                      )}
                    </dd>
                    <dd className="fact-evidence">
                      {evidenceTag(record, key)}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link className="text-link" to={`/opportunities/${record.slug}`}>
                Open the full record <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
