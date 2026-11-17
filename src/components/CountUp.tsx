import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 900

function motionAllowed(): boolean {
  return (
    typeof matchMedia === 'function' &&
    !matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Counts up to a whole number once, when it first appears. The number itself
 * always comes from the caller: this only animates how it arrives. Visitors
 * who ask for reduced motion see the final value straight away.
 */
export function CountUp({ value }: { value: number }) {
  const element = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(() => (motionAllowed() ? 0 : value))
  useEffect(() => {
    if (!motionAllowed()) {
      setShown(value)
      return
    }
    let frame = 0
    let settle = 0
    const run = () => {
      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION_MS)
        setShown(Math.round(value * (1 - (1 - progress) ** 3)))
        if (progress < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
      // Frames stop in background tabs. A fact must never be left showing a
      // part-counted number, so a timer guarantees the real value.
      settle = window.setTimeout(() => setShown(value), DURATION_MS + 300)
    }
    // Count when the number scrolls into view, so it is seen arriving.
    const observer =
      typeof IntersectionObserver === 'function' && element.current
        ? new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            observer?.disconnect()
            run()
          })
        : null
    if (observer && element.current) observer.observe(element.current)
    else run()
    return () => {
      observer?.disconnect()
      cancelAnimationFrame(frame)
      clearTimeout(settle)
    }
  }, [value])
  return (
    <span
      ref={element}
      className="count-up"
      style={{ minWidth: `${String(value).length}ch` }}
    >
      {shown}
    </span>
  )
}
