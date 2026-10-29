import { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Dna,
  FlaskConical,
  Microscope,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { radarFields, type FieldId, type RadarController } from './radarModel'
import './research-radar.css'

const icons = { genomics: Dna, molecular: FlaskConical, neuro: Microscope }
const loadRadarScene = () => import('./radarScene')
export function ResearchRadar({
  loadScene = loadRadarScene,
}: {
  loadScene?: typeof loadRadarScene
}) {
  const stage = useRef<HTMLDivElement>(null)
  const host = useRef<HTMLDivElement>(null)
  const controller = useRef<RadarController | null>(null)
  const visible = useRef(true)
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  )
  const [attempt, setAttempt] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(
    () =>
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [moved, setMoved] = useState(false)
  const [hovered, setHovered] = useState<FieldId | null>(null)
  const [focused, setFocused] = useState<FieldId | null>(null)
  const highlighted = focused ?? hovered

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReduced(media.matches)
    media.addEventListener('change', change)
    return () => media.removeEventListener('change', change)
  }, [])
  useEffect(() => {
    let cancelled = false
    let expired = false
    let timeout: number | undefined
    setStatus('loading')
    setMoved(false)
    const active = () =>
      controller.current?.setActive(visible.current && !document.hidden)
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            ([entry]) => {
              visible.current = entry.isIntersecting
              active()
            },
            { threshold: 0.05 },
          )
        : null
    observer?.observe(stage.current!)
    document.addEventListener('visibilitychange', active)
    if (!('WebGL2RenderingContext' in window)) setStatus('fallback')
    else {
      // The renderer and Three.js are a separate chunk, requested only on home.
      timeout = window.setTimeout(() => {
        expired = true
        if (!cancelled) {
          controller.current?.dispose()
          controller.current = null
          setStatus('fallback')
        }
      }, 12000)
      loadScene()
        .then(({ createRadarScene }) => {
          if (cancelled || expired) return
          try {
            controller.current = createRadarScene({
              stage: stage.current!,
              host: host.current!,
              onReady: () => {
                window.clearTimeout(timeout)
                if (!cancelled && !expired) setStatus('ready')
              },
              onFailure: () => {
                window.clearTimeout(timeout)
                if (!cancelled) {
                  controller.current?.dispose()
                  controller.current = null
                  setStatus('fallback')
                }
              },
              onViewChange: (value) => {
                if (!cancelled) setMoved(value)
              },
            })
            active()
          } catch {
            window.clearTimeout(timeout)
            if (!cancelled) setStatus('fallback')
          }
        })
        .catch(() => {
          window.clearTimeout(timeout)
          if (!cancelled) setStatus('fallback')
        })
    }
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
      observer?.disconnect()
      document.removeEventListener('visibilitychange', active)
      controller.current?.dispose()
      controller.current = null
    }
  }, [attempt, loadScene])
  useEffect(() => {
    controller.current?.setMotion(paused, reduced)
  }, [paused, reduced, status])
  useEffect(() => {
    controller.current?.highlight(highlighted)
  }, [highlighted, status])

  return (
    <section
      className="research-radar"
      aria-label="Explore research fields"
      aria-describedby="radar-caption"
    >
      <div
        ref={stage}
        className="research-radar-stage"
        data-graphics={status}
        data-motion={reduced ? 'reduced' : paused ? 'paused' : 'running'}
      >
        <div className="radar-fallback" aria-hidden="true">
          <div className="radar-orbit orbit-outer" />
          <div className="radar-orbit orbit-mid" />
          <div className="radar-orbit orbit-inner" />
          <div className="radar-axis axis-x" />
          <div className="radar-axis axis-y" />
          <div className="radar-sweep" />
          <div className="radar-core">
            <Dna size={43} strokeWidth={1.3} />
          </div>
        </div>
        <div className="radar-graphics" ref={host} aria-hidden="true" />
        <svg className="radar-connectors" aria-hidden="true" focusable="false">
          {radarFields.map(({ id }) => (
            <path
              key={id}
              data-connection={id}
              data-active={highlighted === id}
            />
          ))}
        </svg>
        <div className="radar-fields">
          {radarFields.map(({ id, name, href }) => {
            const Icon = icons[id]
            return (
              <Link
                key={id}
                className={`radar-field radar-field-${id}`}
                data-field={id}
                data-active={highlighted === id}
                to={href}
                aria-label={`Explore ${name.toLowerCase()} internships`}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused(null)}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{name}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </div>
      <div className="radar-footer">
        <p id="radar-caption">Illustrative fields · not a live feed</p>
        <div className="radar-controls">
          {status === 'ready' && !reduced && (
            <>
              <button
                type="button"
                aria-label={
                  paused ? 'Resume radar animation' : 'Pause radar animation'
                }
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? (
                  <Play size={15} aria-hidden="true" />
                ) : (
                  <Pause size={15} aria-hidden="true" />
                )}
                <span>{paused ? 'Resume' : 'Pause'}</span>
              </button>
              <button
                type="button"
                aria-label="Reset radar view"
                disabled={!moved}
                onClick={() => controller.current?.reset()}
              >
                <RotateCcw size={15} aria-hidden="true" />
                <span className="sr-only">Reset view</span>
              </button>
            </>
          )}
          {status === 'ready' && reduced && (
            <span className="radar-static-note">Static view</span>
          )}
          {status === 'fallback' && (
            <button
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
            >
              Retry 3D
            </button>
          )}
        </div>
      </div>
      {status === 'fallback' && (
        <p className="radar-fallback-note" role="status">
          3D view unavailable. Field links still work.
        </p>
      )}
    </section>
  )
}
