export const radarFields = [
  {
    id: 'genomics',
    name: 'Genomics',
    href: '/opportunities?field=Genomics',
    position: [1.35, 0.3, -1.55],
  },
  {
    id: 'molecular',
    name: 'Molecular biology',
    href: '/opportunities?field=Molecular+biology',
    position: [-1.7, 0.3, 0.8],
  },
  {
    id: 'neuro',
    name: 'Neuroscience',
    href: '/opportunities?field=Neuroscience',
    position: [1.7, 0.3, 1.25],
  },
] as const
export type FieldId = (typeof radarFields)[number]['id']
export type View = { yaw: number; tilt: number }
export const boundedView = (yaw: number, tilt: number): View => ({
  yaw: Math.max(-0.32, Math.min(0.32, yaw)),
  tilt: Math.max(-0.09, Math.min(0.09, tilt)),
})
export const isDrag = (x: number, y: number) => x * x + y * y > 36

/** One pending frame at most; no background/offscreen animation. */
export function createDemandLoop(
  draw: (time: number) => boolean,
  request = requestAnimationFrame,
  cancel = cancelAnimationFrame,
) {
  let frame = 0
  let active = false
  let disposed = false
  const tick = (time: number) => {
    frame = 0
    if (!active || disposed) return
    if (draw(time)) invalidate()
  }
  const invalidate = () => {
    if (active && !disposed && !frame) frame = request(tick)
  }
  return {
    invalidate,
    setActive(value: boolean) {
      active = value
      if (!active && frame) {
        cancel(frame)
        frame = 0
      }
      if (active) invalidate()
    },
    dispose() {
      disposed = true
      if (frame) cancel(frame)
      frame = 0
    },
  }
}

export interface RadarController {
  setActive(active: boolean): void
  setMotion(paused: boolean, reduced: boolean): void
  highlight(id: FieldId | null): void
  reset(): void
  dispose(): void
}
export interface RadarOptions {
  stage: HTMLElement
  host: HTMLElement
  onReady(): void
  onFailure(): void
  onViewChange(changed: boolean): void
}
