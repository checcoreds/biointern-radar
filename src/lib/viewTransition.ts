import { flushSync } from 'react-dom'

type TransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> }
}

/** Shared element name used by a clicked card and the detail heading. */
export const OPPORTUNITY_TRANSITION = 'opportunity-hero'

function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Runs a navigation inside a browser View Transition when supported, so the
 * clicked card can morph into the detail heading. Falls back to a plain
 * update in older browsers, tests and reduced-motion mode.
 */
export function withViewTransition(
  update: () => void,
  morphFrom?: HTMLElement | null,
): void {
  const doc = document as TransitionDocument
  if (typeof doc.startViewTransition !== 'function' || prefersReducedMotion()) {
    update()
    return
  }
  if (morphFrom) morphFrom.style.viewTransitionName = OPPORTUNITY_TRANSITION
  // The morph replaces the generic page-enter animation for this navigation.
  doc.documentElement.classList.add('is-view-transition')
  const transition = doc.startViewTransition(() => flushSync(update))
  void transition.finished.finally(() =>
    doc.documentElement.classList.remove('is-view-transition'),
  )
}
