import { useEffect, useRef, useState } from 'react'
import { Dna, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { sound, useSoundStatus } from '../../lib/sound'
import { useRadarScene } from './useRadarScene'
import './sweep-radar.css'

export const sweepFields = [
  { name: 'Genomics', href: '/opportunities?field=Genomics' },
  {
    name: 'Neuroscience',
    href: '/opportunities?field=Neuroscience',
  },
  {
    name: 'Molecular biology',
    href: '/opportunities?field=Molecular+biology',
  },
  { name: 'Biotechnology', href: '/opportunities?field=Biotechnology' },
  { name: 'Bioinformatics', href: '/opportunities?field=Bioinformatics' },
] as const

export function SweepRadar() {
  const region = useRef<HTMLElement>(null)
  const sceneHost = useRef<HTMLDivElement>(null)
  const sweep = useRef<HTMLDivElement>(null)
  const [turn, setTurn] = useState(0)
  const [paused, setPaused] = useState(false)
  const [fieldFocused, setFieldFocused] = useState(false)
  const [fieldOffset, setFieldOffset] = useState(0)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [reduced, setReduced] = useState(
    () =>
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const soundStatus = useSoundStatus()
  const running = !paused && !fieldFocused && visible && pageVisible && !reduced
  const selected = (turn + fieldOffset) % sweepFields.length
  // The 3D helix replaces the flat dial where WebGL works; the dial stays in
  // the page as the clock for each turn and as the fallback.
  const scene = useRadarScene({
    host: sceneHost,
    sweep,
    running,
    visible: visible && pageVisible,
    reduced,
  })

  useEffect(() => {
    const media =
      typeof matchMedia === 'function'
        ? matchMedia('(prefers-reduced-motion: reduce)')
        : null
    const preference = () => setReduced(media?.matches ?? false)
    const visibility = () => setPageVisible(!document.hidden)
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { threshold: 0.05 },
          )
        : null
    observer?.observe(region.current!)
    media?.addEventListener('change', preference)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      observer?.disconnect()
      media?.removeEventListener('change', preference)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  return (
    <section
      ref={region}
      className="flat-radar"
      aria-label="Explore research fields"
      aria-describedby="flat-radar-caption"
      data-running={running}
      data-scene={scene ? 'on' : 'off'}
      data-turn={turn}
      data-field={sweepFields[selected].name}
    >
      <div className="flat-radar-stage">
        <div ref={sceneHost} className="flat-radar-scene" aria-hidden="true" />
        <div className="flat-radar-grid" aria-hidden="true" />
        <div className="flat-radar-dial" aria-hidden="true">
          <div className="flat-radar-ring ring-outer" />
          <div className="flat-radar-ring ring-middle" />
          <div className="flat-radar-ring ring-inner" />
          <div className="flat-radar-axis axis-horizontal" />
          <div className="flat-radar-axis axis-vertical" />
          <div
            ref={sweep}
            className="flat-radar-sweep"
            onAnimationIteration={(event) => {
              if (event.animationName !== 'flat-radar-turn' || !running) return
              setTurn((value) => value + 1)
              sound.play('ping')
            }}
          />
          <div className="flat-radar-centre">
            <Dna size={40} strokeWidth={1.3} />
          </div>
          <div key={turn} className="flat-radar-ping" />
          <i className="flat-radar-dot dot-one" />
          <i className="flat-radar-dot dot-two" />
        </div>
        <Link
          className="flat-radar-readout"
          to={sweepFields[selected].href}
          aria-label={`Explore ${sweepFields[selected].name.toLowerCase()} internships`}
          aria-describedby="flat-radar-help"
          onFocus={() => setFieldFocused(true)}
          onBlur={() => setFieldFocused(false)}
        >
          {sweepFields.map(({ name }, index) => (
            <span
              key={name}
              className="flat-radar-name"
              data-active={selected === index}
              aria-hidden="true"
            >
              <strong>{name}</strong>
            </span>
          ))}
        </Link>
        <p id="flat-radar-help" className="sr-only">
          The radar pauses while this link has focus. Use Next research field to
          choose another field without waiting.
        </p>
      </div>
      <div className="flat-radar-footer">
        <p id="flat-radar-caption">Illustrative fields · not a live feed</p>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {paused ? `${sweepFields[selected].name}. Radar paused.` : ''}
        </span>
        <div className="flat-radar-controls">
          <button
            type="button"
            aria-label="Next research field"
            title="Next field · pauses the sweep"
            onClick={() => {
              setFieldOffset((value) => (value + 1) % sweepFields.length)
              setPaused(true)
            }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
          {reduced ? (
            <span className="flat-radar-static">Static view</span>
          ) : (
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
                  <Play size={16} aria-hidden="true" />
                ) : (
                  <Pause size={16} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                aria-label={
                  soundStatus === 'on'
                    ? 'Turn sound effects off'
                    : 'Turn sound effects on'
                }
                title="Sound effects for the radar, saving and checklists"
                aria-pressed={soundStatus === 'on'}
                onClick={() =>
                  soundStatus === 'on' ? sound.turnOff() : void sound.turnOn()
                }
              >
                {soundStatus === 'on' ? (
                  <Volume2 size={16} aria-hidden="true" />
                ) : (
                  <VolumeX size={16} aria-hidden="true" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      {soundStatus === 'unavailable' && (
        <p className="flat-radar-audio-note" role="status">
          Sound is unavailable in this browser. The radar still works.
        </p>
      )}
    </section>
  )
}
