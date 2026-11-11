import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CountUp } from '../components/CountUp'
import { sceneLayout } from '../components/radar/helixScene'
import { parseColour } from '../components/radar/useRadarScene'
import { installPointerLight } from '../lib/pointerLight'
import { SOUND_STORAGE_KEY, sound } from '../lib/sound'

function fakeAudio(state = 'running') {
  const context = {
    state,
    currentTime: 0,
    destination: {},
    createOscillator: vi.fn(() => ({
      type: '',
      frequency: {
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      onended: null,
    })),
    createGain: vi.fn(() => ({
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      disconnect: vi.fn(),
    })),
    resume: vi.fn(async () => {}),
    close: vi.fn(async () => {}),
  }
  const Audio = vi.fn(function () {
    return context
  })
  vi.stubGlobal('AudioContext', Audio)
  return { context, Audio }
}
function media(matches: (query: string) => boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: matches(query),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
}
afterEach(() => {
  sound.turnOff()
  vi.unstubAllGlobals()
  vi.resetModules()
})

describe('Opt-in sound effects', () => {
  it('stays silent and creates no audio until the visitor turns sound on', () => {
    const { Audio } = fakeAudio()
    expect(sound.status()).toBe('off')
    sound.play('save')
    sound.play('complete')
    expect(Audio).not.toHaveBeenCalled()
  })
  it('remembers the choice on this device and forgets it when turned off', async () => {
    const { context } = fakeAudio()
    await sound.turnOn()
    expect(sound.status()).toBe('on')
    expect(localStorage.getItem(SOUND_STORAGE_KEY)).toBe('on')
    expect(context.createOscillator).toHaveBeenCalledTimes(1)
    sound.play('complete')
    expect(context.createOscillator).toHaveBeenCalledTimes(5)
    sound.turnOff()
    expect(sound.status()).toBe('off')
    expect(localStorage.getItem(SOUND_STORAGE_KEY)).toBeNull()
    expect(context.close).toHaveBeenCalledOnce()
    sound.play('save')
    expect(context.createOscillator).toHaveBeenCalledTimes(5)
  })
  it('reports blocked audio without remembering a choice', async () => {
    const { context } = fakeAudio('suspended')
    await sound.turnOn()
    expect(sound.status()).toBe('unavailable')
    expect(localStorage.getItem(SOUND_STORAGE_KEY)).toBeNull()
    expect(context.close).toHaveBeenCalledOnce()
  })
  it('restores a remembered choice but starts audio only during a gesture', async () => {
    localStorage.setItem(SOUND_STORAGE_KEY, 'on')
    const { Audio, context } = fakeAudio()
    const activation = { isActive: false }
    vi.stubGlobal('navigator', { userActivation: activation })
    vi.resetModules()
    const fresh = (await import('../lib/sound')).sound
    expect(fresh.status()).toBe('on')
    fresh.play('ping')
    expect(Audio).not.toHaveBeenCalled()
    activation.isActive = true
    fresh.play('save')
    expect(Audio).toHaveBeenCalledOnce()
    expect(context.createOscillator).toHaveBeenCalledTimes(2)
    fresh.turnOff()
  })
})

describe('Pointer light on cards', () => {
  const card = () => {
    const element = document.createElement('article')
    element.className = 'radar-card'
    element.getBoundingClientRect = () =>
      ({ left: 100, top: 200, width: 200, height: 100 }) as DOMRect
    document.body.append(element)
    return element
  }
  const move = (
    target: Element,
    x: number,
    y: number,
    pointerType = 'mouse',
  ) => {
    const event = new MouseEvent('pointermove', {
      bubbles: true,
      clientX: x,
      clientY: y,
    })
    Object.defineProperty(event, 'pointerType', { value: pointerType })
    target.dispatchEvent(event)
  }
  // Runs each frame at once; 0 tells the caller no frame is still pending.
  const instantFrames = () =>
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callback(0)
      return 0
    })

  it('lights and tilts the card under a mouse, and clears it on leaving', () => {
    media((query) => query.includes('pointer: fine'))
    instantFrames()
    const element = card()
    const remove = installPointerLight()
    move(element, 250, 225)
    expect(element.style.getPropertyValue('--light-x')).toBe('75.0%')
    expect(element.style.getPropertyValue('--light-y')).toBe('25.0%')
    expect(element.style.getPropertyValue('--tilt-x')).toBe('1.75deg')
    expect(element.style.getPropertyValue('--tilt-y')).toBe('1.75deg')
    move(document.body, 10, 10)
    expect(element.style.getPropertyValue('--light-x')).toBe('')
    expect(element.style.getPropertyValue('--tilt-y')).toBe('')
    remove()
    element.remove()
  })
  it.each([
    ['touch input', 'touch', (query: string) => query.includes('fine')],
    ['coarse pointers', 'mouse', () => false],
    ['reduced motion', 'mouse', () => true],
  ])('leaves cards alone for %s', (_label, pointerType, matches) => {
    media(matches)
    instantFrames()
    const element = card()
    const remove = installPointerLight()
    move(element, 250, 225, pointerType)
    expect(element.getAttribute('style') ?? '').toBe('')
    remove()
    element.remove()
  })
})

describe('3D radar scene helpers', () => {
  it.each([
    [284, 310],
    [354, 310],
    [500, 310],
    [270, 470],
    [535, 470],
  ])('keeps the scene inside a %i×%i stage and above the name', (w, h) => {
    const { unit, centreY } = sceneLayout(w, h)
    expect(unit * 2.3).toBeLessThanOrEqual(w + 0.01)
    // Helix tip, including perspective, stays below the top edge.
    expect(centreY - unit * 1.45).toBeGreaterThanOrEqual(0)
    // The disc's front edge stays above the overlaid field name.
    expect(centreY + unit * 0.52).toBeLessThanOrEqual(h - 46)
  })
  it('reads the colour formats browsers report for theme tokens', () => {
    expect(parseColour('rgb(255, 0, 51)')).toEqual([1, 0, 0.2])
    expect(parseColour('rgba(0, 0, 0, 0.5)')).toEqual([0, 0, 0])
    expect(parseColour('color(srgb 0.25 0.5 1)')).toEqual([0.25, 0.5, 1])
    expect(parseColour('light-dark(#fff, #000)')).toBeNull()
  })
})

describe('Counting numbers', () => {
  it('shows the real value at once without motion support or with reduced motion', () => {
    const plain = render(<CountUp value={15} />)
    expect(plain.container).toHaveTextContent(/^15$/)
    plain.unmount()
    media(() => true)
    render(<CountUp value={9} />)
    expect(screen.getByText('9')).toBeVisible()
  })
  it('counts up to exactly the real value when motion is allowed', () => {
    media(() => false)
    const frames: FrameRequestCallback[] = []
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
      frames.push(callback),
    )
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    const view = render(<CountUp value={15} />)
    expect(view.container).toHaveTextContent(/^0$/)
    act(() => frames.at(-1)!(performance.now() + 5000))
    expect(view.container).toHaveTextContent(/^15$/)
  })
  it('still lands on the real value if animation frames never run', () => {
    media(() => false)
    vi.useFakeTimers()
    vi.stubGlobal('requestAnimationFrame', () => 1)
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    const view = render(<CountUp value={15} />)
    expect(view.container).toHaveTextContent(/^0$/)
    act(() => vi.advanceTimersByTime(1500))
    expect(view.container).toHaveTextContent(/^15$/)
    vi.useRealTimers()
  })
})
