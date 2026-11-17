import { useEffect, useState } from 'react'
import { reducedMotion } from '../../lib/scrollProgress'

export const planes = [
  { id: 'plane-specimen', label: 'Specimen' },
  { id: 'plane-scatter', label: 'Scatter' },
  { id: 'plane-focus', label: 'Focus' },
  { id: 'plane-evidence', label: 'Evidence' },
  { id: 'plane-collection', label: 'Collection' },
  { id: 'how-it-works', label: 'Protocol' },
  { id: 'plane-search', label: 'Search' },
] as const

/**
 * The overview's map: a fine-focus scale on the right edge with one tick per
 * focal plane. The marker follows the plane in view, and each name jumps to
 * its plane. Wide screens only; phones get the same order by scrolling.
 */
export function FocusGauge() {
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (typeof IntersectionObserver !== 'function') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setActive(planes.findIndex((plane) => plane.id === entry.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    planes.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])
  return (
    <nav className="focus-gauge" aria-label="Overview sections">
      <ol>
        {planes.map((plane, index) => (
          <li key={plane.id}>
            <button
              type="button"
              aria-current={index === active ? 'location' : undefined}
              onClick={() =>
                document.getElementById(plane.id)?.scrollIntoView({
                  behavior: reducedMotion() ? 'auto' : 'smooth',
                })
              }
            >
              <span className="focus-gauge-tick" aria-hidden="true" />
              <span className="focus-gauge-label">{plane.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
