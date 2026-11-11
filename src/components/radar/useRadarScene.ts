import { useEffect, useRef, useState, type RefObject } from 'react'
import {
  createHelixScene,
  sceneLayout,
  type Rgb,
  type SceneColours,
} from './helixScene'

/** One sweep of the CSS radar, which stays the clock for the 3D layer. */
const SWEEP_MS = 5000

/** Parses the computed colour strings browsers return for theme tokens. */
export function parseColour(value: string): Rgb | null {
  const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/)
  if (rgb) return [+rgb[1] / 255, +rgb[2] / 255, +rgb[3] / 255]
  const srgb = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/)
  return srgb ? [+srgb[1], +srgb[2], +srgb[3]] : null
}

/**
 * Theme tokens are light-dark() pairs, which only resolve on a real property.
 * So each one is applied to the probe's colour and read back.
 */
function readColours(probe: HTMLElement): SceneColours {
  const read = (token: string): Rgb => {
    probe.style.color = `var(${token})`
    return parseColour(getComputedStyle(probe).color) ?? [0.3, 0.5, 0.9]
  }
  const [red, green, blue] = read('--page')
  const colours = {
    radar: read('--radar'),
    strong: read('--radar-strong'),
    dim: read('--radar-dim'),
    from: read('--accent'),
    to: read('--headline-to'),
    light: red * 0.299 + green * 0.587 + blue * 0.114 > 0.5,
  }
  probe.style.removeProperty('color')
  return colours
}

/**
 * Draws the 3D helix inside `host` and reports whether it is showing. It
 * animates only while the radar is running, redraws single frames for pointer,
 * scroll, resize and theme changes, and draws nothing while offscreen.
 */
export function useRadarScene({
  host,
  sweep,
  running,
  visible,
  reduced,
}: {
  host: RefObject<HTMLElement | null>
  sweep: RefObject<HTMLElement | null>
  running: boolean
  visible: boolean
  reduced: boolean
}): boolean {
  const [showing, setShowing] = useState(false)
  const live = useRef({ running, visible, reduced })
  const invalidate = useRef(() => {})

  useEffect(() => {
    live.current = { running, visible, reduced }
    invalidate.current()
  }, [running, visible, reduced])

  useEffect(() => {
    const element = host.current
    if (!element) return
    const canvas = document.createElement('canvas')
    const scene = createHelixScene(canvas)
    if (!scene) return
    element.append(canvas)
    scene.setColours(readColours(element))
    setShowing(true)

    let frame = 0
    let last = 0
    let time = 0
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0
    let animation: Animation | null = null

    const sweepProgress = () => {
      if (!animation || animation.playState === 'idle')
        animation = sweep.current?.getAnimations?.()[0] ?? null
      const now = Number(animation?.currentTime ?? NaN)
      return Number.isFinite(now) ? (now % SWEEP_MS) / SWEEP_MS : 0.08
    }
    const render = (now: number) => {
      frame = 0
      const state = live.current
      if (!state.visible) {
        last = 0
        return
      }
      const delta = last ? Math.min(0.05, (now - last) / 1000) : 0
      last = now
      if (state.running) time += delta
      const ease = state.reduced ? 1 : 1 - Math.exp(-delta * 6)
      easedX += (pointerX - easedX) * ease
      easedY += (pointerY - easedY) * ease
      scene.draw({
        time,
        sweep: sweepProgress(),
        yaw: easedX * 0.55 + window.scrollY * 0.0012 + Math.sin(time * 0.2) / 8,
        pitch: 0.42 + easedY * 0.1,
      })
      const settling =
        Math.abs(pointerX - easedX) > 0.001 ||
        Math.abs(pointerY - easedY) > 0.001
      if (state.running || settling) frame = requestAnimationFrame(render)
      else last = 0
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    invalidate.current = request

    const finePointer = matchMedia('(hover: hover) and (pointer: fine)')
    const onPointer = (event: PointerEvent) => {
      if (live.current.reduced || !finePointer.matches) return
      pointerX = (event.clientX / window.innerWidth) * 2 - 1
      pointerY = (event.clientY / window.innerHeight) * 2 - 1
      request()
    }
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      scene.resize(width, height, Math.min(window.devicePixelRatio || 1, 2))
      const { unit, centreY } = sceneLayout(width, height)
      element.style.setProperty('--scene-unit', `${unit}px`)
      element.style.setProperty('--scene-centre', `${centreY}px`)
      request()
    })
    const recolour = () => {
      scene.setColours(readColours(element))
      request()
    }
    const theme = new MutationObserver(recolour)
    const scheme = matchMedia('(prefers-color-scheme: dark)')
    const stop = () => {
      cancelAnimationFrame(frame)
      invalidate.current = () => {}
      resize.disconnect()
      theme.disconnect()
      scheme.removeEventListener('change', recolour)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', request)
      canvas.removeEventListener('webglcontextlost', lost)
      canvas.remove()
      setShowing(false)
    }
    // A lost graphics context hands the stage back to the CSS radar.
    function lost() {
      stop()
    }

    resize.observe(element)
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })
    scheme.addEventListener('change', recolour)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('scroll', request, { passive: true })
    canvas.addEventListener('webglcontextlost', lost)
    return () => {
      stop()
      scene.dispose()
    }
  }, [host, sweep])

  return showing
}
