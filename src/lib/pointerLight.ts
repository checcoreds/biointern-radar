const CARD = '.radar-card'
const PROPERTIES = ['--light-x', '--light-y', '--tilt-x', '--tilt-y']
/** The furthest a card leans towards the pointer, in degrees. */
const MAX_TILT = 3.5

/**
 * Opportunity cards catch the light under a mouse pointer and lean towards
 * it. One delegated listener serves every card; touch screens, keyboards and
 * reduced-motion visitors get the plain card. The values are written as CSS
 * custom properties, which styles.css and motion.css turn into the effect.
 */
export function installPointerLight(): () => void {
  if (typeof matchMedia !== 'function') return () => {}
  const fine = matchMedia('(hover: hover) and (pointer: fine)')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  let lit: HTMLElement | null = null
  let pending: PointerEvent | null = null
  let frame = 0

  const clear = () => {
    PROPERTIES.forEach((name) => lit?.style.removeProperty(name))
    lit = null
  }
  const apply = () => {
    frame = 0
    const event = pending
    if (!event) return
    const target =
      event.target instanceof Element
        ? event.target.closest<HTMLElement>(CARD)
        : null
    if (target !== lit) clear()
    if (!target || !fine.matches || reduced.matches) return
    lit = target
    const box = target.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width
    const y = (event.clientY - box.top) / box.height
    target.style.setProperty('--light-x', `${(x * 100).toFixed(1)}%`)
    target.style.setProperty('--light-y', `${(y * 100).toFixed(1)}%`)
    target.style.setProperty(
      '--tilt-x',
      `${((0.5 - y) * 2 * MAX_TILT).toFixed(2)}deg`,
    )
    target.style.setProperty(
      '--tilt-y',
      `${((x - 0.5) * 2 * MAX_TILT).toFixed(2)}deg`,
    )
  }
  const move = (event: PointerEvent) => {
    if (event.pointerType === 'touch') return
    pending = event
    if (!frame) frame = requestAnimationFrame(apply)
  }
  const leave = () => {
    pending = null
    clear()
  }
  document.addEventListener('pointermove', move, { passive: true })
  document.documentElement.addEventListener('pointerleave', leave)
  return () => {
    cancelAnimationFrame(frame)
    clear()
    document.removeEventListener('pointermove', move)
    document.documentElement.removeEventListener('pointerleave', leave)
  }
}
