import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { SweepRadar } from '../radar/SweepRadar'
import { CountUp } from '../CountUp'
import { parseColour } from '../radar/useRadarScene'
import type { Rgb } from '../radar/helixScene'
import { createCellField, type FieldColours } from './cellField'
import { formatDate } from '../../lib/opportunities'
import { optics } from '../../lib/optics'
import {
  reducedMotion,
  smoothstep,
  useSectionProgress,
} from '../../lib/scrollProgress'

/** Theme tokens resolve only on a real property, so read them via a probe. */
function readFieldColours(probe: HTMLElement): FieldColours {
  const read = (token: string): Rgb => {
    probe.style.color = `var(${token})`
    return parseColour(getComputedStyle(probe).color) ?? [0.3, 0.5, 0.9]
  }
  const [red, green, blue] = read('--page')
  const colours = {
    membrane: read('--radar'),
    nucleus: read('--accent'),
    vesicle: read('--radar-dim'),
    light: red * 0.299 + green * 0.587 + blue * 0.114 > 0.5,
  }
  probe.style.removeProperty('color')
  return colours
}

/**
 * Plane one of the overview. Four planes move at different rates as the
 * visitor scrolls: a far field of cells, the helix radar as the focal
 * subject, the headline, and out-of-focus dust right in front of the lens.
 * Scrolling moves the focal plane deeper: the helix softens, the cells
 * sharpen and grow, and the dust passes the viewer.
 */
export function SpecimenHero({
  records,
  countries,
  latestCheck,
}: {
  records: number
  countries: number
  latestCheck: string | null
}) {
  const section = useRef<HTMLElement>(null)
  const far = useRef<HTMLDivElement>(null)
  const rack = useRef(0)
  const redraw = useRef(() => {})

  useSectionProgress(
    section,
    'exit',
    (reported) => {
      // Reduced motion reports every section as resolved; the hero's
      // resolved state is its opening composition, so it stays at rest.
      const progress = reducedMotion() ? 0 : reported
      rack.current = progress
      section.current?.style.setProperty('--rack', progress.toFixed(4))
      optics.helixDefocus = smoothstep(0.12, 0.8, progress) * 0.85
      redraw.current()
    },
    0.9,
  )

  useEffect(() => {
    const host = far.current
    const stage = section.current
    if (!host || !stage) return
    const canvas = document.createElement('canvas')
    const field = createCellField(canvas)
    if (!field) return
    host.append(canvas)
    field.setColours(readFieldColours(stage))
    stage.dataset.field = 'on'

    const still = reducedMotion()
    const fine = matchMedia('(hover: hover) and (pointer: fine)')
    let frame = 0
    let last = 0
    let time = 0
    let visible = true
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0

    const render = (now: number) => {
      frame = 0
      if (!visible || document.hidden) {
        last = 0
        return
      }
      const delta = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      if (!still) time += delta
      const ease = still ? 1 : 1 - Math.exp(-delta * 4)
      easedX += (pointerX - easedX) * ease
      easedY += (pointerY - easedY) * ease
      stage.style.setProperty('--mx', easedX.toFixed(3))
      stage.style.setProperty('--my', easedY.toFixed(3))
      const progress = rack.current
      field.draw({
        time,
        // The focal plane starts in front of the field, so every cell is
        // soft, then travels into it as the visitor scrolls.
        focus: still ? 0.45 : -0.35 + progress * 1.25,
        dolly: still ? 0 : progress,
        pointerX: easedX,
        pointerY: easedY,
      })
      if (!still) frame = requestAnimationFrame(render)
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    redraw.current = request

    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      field.resize(width, height, Math.min(window.devicePixelRatio || 1, 1.5))
      request()
    })
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) request()
    })
    const recolour = () => {
      field.setColours(readFieldColours(stage))
      request()
    }
    const theme = new MutationObserver(recolour)
    const scheme = matchMedia('(prefers-color-scheme: dark)')
    const onPointer = (event: PointerEvent) => {
      if (still || !fine.matches || event.pointerType === 'touch') return
      pointerX = (event.clientX / window.innerWidth) * 2 - 1
      pointerY = (event.clientY / window.innerHeight) * 2 - 1
      request()
    }
    const lost = () => cleanup()
    resize.observe(host)
    observer.observe(stage)
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    scheme.addEventListener('change', recolour)
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('visibilitychange', request)
    canvas.addEventListener('webglcontextlost', lost)

    function cleanup() {
      cancelAnimationFrame(frame)
      redraw.current = () => {}
      resize.disconnect()
      observer.disconnect()
      theme.disconnect()
      scheme.removeEventListener('change', recolour)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', request)
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.remove()
      if (stage) delete stage.dataset.field
    }
    return () => {
      cleanup()
      field.dispose()
      optics.helixDefocus = 0
    }
  }, [])

  return (
    <section
      ref={section}
      className="specimen"
      data-sc-act="specimen"
      id="plane-specimen"
    >
      <div ref={far} className="specimen-far" aria-hidden="true" />
      <div className="container specimen-layout">
        <div className="specimen-copy">
          <h1>
            Find a research
            <br />
            <span>internship.</span>
          </h1>
          <p className="hero-description">
            Life-sciences opportunities for undergraduates. Compare requirements
            and prepare to apply.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/opportunities">
              Explore internships <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="hero-facts" aria-label="Catalogue at a glance">
            <li>
              <strong>
                <CountUp value={records} />
              </strong>
              <span>opportunities</span>
            </li>
            <li>
              <strong>
                <CountUp value={countries} />
              </strong>
              <span>countries</span>
            </li>
            {latestCheck && (
              <li>
                <strong>
                  <time dateTime={latestCheck}>{formatDate(latestCheck)}</time>
                </strong>
                <span>latest source check</span>
              </li>
            )}
          </ul>
        </div>
        <div className="specimen-subject">
          <SweepRadar />
        </div>
      </div>
      <div className="specimen-near" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </section>
  )
}
