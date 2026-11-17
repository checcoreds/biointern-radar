import { useEffect, type RefObject } from 'react'

export function reducedMotion(): boolean {
  return (
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/** Smooth 0→1 between two edges, like GLSL's smoothstep. */
export function smoothstep(from: number, to: number, value: number): number {
  const t = clamp01((value - from) / (to - from))
  return t * t * (3 - 2 * t)
}

/**
 * How far a section has travelled, 0 to 1.
 *
 * - `pinned`: a tall section with a sticky stage. 0 when its top meets the
 *   viewport top, 1 when its bottom meets the viewport bottom.
 * - `exit`: a natural-flow section. 0 at rest at the top, 1 once it has
 *   scrolled up by `distance` of the viewport height.
 * - `enter`: 0 when the section's top reaches the viewport bottom, 1 when it
 *   reaches `distance` of the way up the viewport.
 */
export function sectionProgress(
  rect: { top: number; height: number },
  viewport: number,
  mode: 'pinned' | 'exit' | 'enter',
  distance = 0.8,
): number {
  if (mode === 'pinned') {
    const travel = rect.height - viewport
    return travel > 1 ? clamp01(-rect.top / travel) : 1
  }
  if (mode === 'exit') return clamp01(-rect.top / (viewport * distance))
  return clamp01((viewport - rect.top) / (viewport * distance))
}

/**
 * Calls `onProgress` with the section's progress whenever it may have
 * changed: on scroll and resize, at most once per frame, and only while the
 * section is near the viewport. Under reduced motion it reports 1 once, so
 * every section shows its resolved state with nothing left mid-transition.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  mode: 'pinned' | 'exit' | 'enter',
  onProgress: (progress: number) => void,
  distance?: number,
): void {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (reducedMotion()) {
      onProgress(1)
      return
    }
    let frame = 0
    let near = true
    const update = () => {
      frame = 0
      const rect = element.getBoundingClientRect()
      onProgress(sectionProgress(rect, window.innerHeight, mode, distance))
    }
    const request = () => {
      if (near && !frame) frame = requestAnimationFrame(update)
    }
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            ([entry]) => {
              near = entry.isIntersecting
              request()
            },
            { rootMargin: '50% 0px' },
          )
        : null
    observer?.observe(element)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
    // The callback is read fresh through the closure each frame on purpose.
  }, [ref, mode, distance])
}
