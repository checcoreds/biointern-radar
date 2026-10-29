import { useEffect, useRef, useState } from 'react'
import {
  Dna,
  FlaskConical,
  Microscope,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { createRadarAudio } from './radarAudio'
import './sweep-radar.css'

export const sweepFields = [
  { name: 'Genomics', href: '/opportunities?field=Genomics', Icon: Dna },
  {
    name: 'Neuroscience',
    href: '/opportunities?field=Neuroscience',
    Icon: Microscope,
  },
  {
    name: 'Molecular biology',
    href: '/opportunities?field=Molecular+biology',
    Icon: FlaskConical,
  },
] as const

export function SweepRadar() {
  const region = useRef<HTMLElement>(null)
  const audio = useRef<ReturnType<typeof createRadarAudio> | null>(null)
  const pendingAudio = useRef<AudioContext | null>(null)
  const audioAttempt = useRef(0)
  const [turn, setTurn] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)
  const [reduced, setReduced] = useState(
    () =>
      typeof matchMedia === 'function' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [sound, setSound] = useState(false)
  const [soundError, setSoundError] = useState(false)
  const running = !paused && visible && pageVisible && !reduced
  const selected = turn % sweepFields.length

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
      audioAttempt.current++
      audio.current?.close()
      audio.current = null
      void pendingAudio.current?.close().catch(() => {})
      pendingAudio.current = null
    }
  }, [])
  useEffect(() => {
    if (!running) audio.current?.stop()
  }, [running])

  const toggleSound = async () => {
    if (sound) {
      audioAttempt.current++
      audio.current?.close()
      audio.current = null
      setSound(false)
      return
    }
    const attempt = ++audioAttempt.current
    void pendingAudio.current?.close().catch(() => {})
    let context: AudioContext | null = null
    try {
      context = new AudioContext()
      pendingAudio.current = context
      await context.resume()
      if (context.state !== 'running') throw new Error('Audio is blocked')
      if (attempt !== audioAttempt.current) {
        void context.close().catch(() => {})
        return
      }
      pendingAudio.current = null
      audio.current = createRadarAudio(context)
      setSound(true)
      setSoundError(false)
      audio.current.beep()
    } catch {
      if (pendingAudio.current === context) pendingAudio.current = null
      if (context) void context.close().catch(() => {})
      if (attempt === audioAttempt.current) {
        setSoundError(true)
        setSound(false)
      }
    }
  }
  return (
    <section
      ref={region}
      className="flat-radar"
      aria-label="Explore research fields"
      aria-describedby="flat-radar-caption"
      data-running={running}
      data-turn={turn}
      data-field={sweepFields[selected].name}
    >
      <div className="flat-radar-stage">
        <div className="flat-radar-grid" aria-hidden="true" />
        <div className="flat-radar-dial" aria-hidden="true">
          <div className="flat-radar-ring ring-outer" />
          <div className="flat-radar-ring ring-middle" />
          <div className="flat-radar-ring ring-inner" />
          <div className="flat-radar-axis axis-horizontal" />
          <div className="flat-radar-axis axis-vertical" />
          <div
            className="flat-radar-sweep"
            onAnimationIteration={(event) => {
              if (event.animationName !== 'flat-radar-turn' || !running) return
              setTurn((value) => value + 1)
              audio.current?.beep()
            }}
          />
          <div className="flat-radar-centre">
            <Dna size={40} strokeWidth={1.3} />
          </div>
          <div key={turn} className="flat-radar-ping" />
          <i className="flat-radar-dot dot-one" />
          <i className="flat-radar-dot dot-two" />
        </div>
        <div className="flat-radar-readout" aria-hidden="true">
          {sweepFields.map(({ name, Icon }, index) => (
            <span
              key={name}
              className="flat-radar-name"
              data-active={selected === index}
            >
              <Icon size={20} />
              <strong>{name}</strong>
            </span>
          ))}
        </div>
        <nav className="flat-radar-links" aria-label="Research fields">
          {sweepFields.map(({ name, href }, index) => (
            <Link
              key={name}
              to={href}
              data-active={selected === index}
              aria-label={`Explore ${name.toLowerCase()} internships`}
            >
              {name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flat-radar-footer">
        <p id="flat-radar-caption">Illustrative fields · not a live feed</p>
        <div className="flat-radar-controls">
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
                aria-label={sound ? 'Mute radar sound' : 'Enable radar sound'}
                aria-pressed={sound}
                onClick={() => void toggleSound()}
              >
                {sound ? (
                  <Volume2 size={16} aria-hidden="true" />
                ) : (
                  <VolumeX size={16} aria-hidden="true" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      {soundError && (
        <p className="flat-radar-audio-note" role="status">
          Sound is unavailable in this browser. The radar still works.
        </p>
      )}
    </section>
  )
}
