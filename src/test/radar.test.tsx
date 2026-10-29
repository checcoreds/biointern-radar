import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { SweepRadar, sweepFields } from '../components/radar/SweepRadar'

const renderRadar = () =>
  render(
    <MemoryRouter>
      <SweepRadar />
    </MemoryRouter>,
  )
function revolution() {
  const event = new Event('animationiteration', { bubbles: true })
  Object.defineProperty(event, 'animationName', { value: 'flat-radar-turn' })
  fireEvent(document.querySelector('.flat-radar-sweep')!, event)
}
afterEach(() => vi.unstubAllGlobals())

describe('Flat animated research radar', () => {
  it('keeps all three field links available without canvas or graphics support', () => {
    renderRadar()
    for (const field of sweepFields)
      expect(
        screen.getByRole('link', {
          name: `Explore ${field.name.toLowerCase()} internships`,
        }),
      ).toHaveAttribute('href', field.href)
    expect(document.querySelector('canvas')).not.toBeInTheDocument()
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-running',
      'true',
    )
  })
  it('advances exactly once per complete sweep and cycles through the three names', () => {
    renderRadar()
    const radar = document.querySelector('.flat-radar')!
    expect(radar).toHaveAttribute('data-field', 'Genomics')
    revolution()
    expect(radar).toHaveAttribute('data-field', 'Neuroscience')
    revolution()
    expect(radar).toHaveAttribute('data-field', 'Molecular biology')
    revolution()
    expect(radar).toHaveAttribute('data-field', 'Genomics')
    expect(radar).toHaveAttribute('data-turn', '3')
  })
  it('pauses the sweep and field cycle, then resumes without a timer race', async () => {
    const user = userEvent.setup()
    renderRadar()
    await user.click(
      screen.getByRole('button', { name: 'Pause radar animation' }),
    )
    revolution()
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-turn',
      '0',
    )
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-running',
      'false',
    )
    await user.click(
      screen.getByRole('button', { name: 'Resume radar animation' }),
    )
    revolution()
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-turn',
      '1',
    )
  })
  it('uses a static view for reduced motion while keeping all field links', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )
    renderRadar()
    expect(screen.getByText('Static view')).toBeVisible()
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(
      screen.queryByRole('button', { name: 'Pause radar animation' }),
    ).not.toBeInTheDocument()
    revolution()
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-turn',
      '0',
    )
  })
  it('stops advancing when the document is hidden', () => {
    renderRadar()
    const original = Object.getOwnPropertyDescriptor(document, 'hidden')
    Object.defineProperty(document, 'hidden', {
      configurable: true,
      value: true,
    })
    act(() => document.dispatchEvent(new Event('visibilitychange')))
    revolution()
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-running',
      'false',
    )
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-turn',
      '0',
    )
    if (original) Object.defineProperty(document, 'hidden', original)
    else Reflect.deleteProperty(document, 'hidden')
  })
  it('creates audio only after a click, beeps once per turn, and closes it on unmount', async () => {
    const oscillator = {
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
    }
    const gain = {
      gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      disconnect: vi.fn(),
    }
    const context = {
      state: 'running',
      currentTime: 0,
      destination: {},
      createOscillator: vi.fn(() => ({ ...oscillator })),
      createGain: vi.fn(() => gain),
      resume: vi.fn(async () => {}),
      close: vi.fn(async () => {}),
    }
    const Audio = vi.fn(function () {
      return context
    })
    vi.stubGlobal('AudioContext', Audio)
    const user = userEvent.setup()
    const view = renderRadar()
    expect(Audio).not.toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Enable radar sound' }))
    expect(
      screen.getByRole('button', { name: 'Mute radar sound' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(context.createOscillator).toHaveBeenCalledTimes(1)
    revolution()
    expect(context.createOscillator).toHaveBeenCalledTimes(2)
    view.unmount()
    expect(context.close).toHaveBeenCalledOnce()
  })
  it('handles unavailable audio without breaking the visual radar or navigation', async () => {
    vi.stubGlobal('AudioContext', undefined)
    const user = userEvent.setup()
    renderRadar()
    await user.click(screen.getByRole('button', { name: 'Enable radar sound' }))
    expect(screen.getByRole('status')).toHaveTextContent('Sound is unavailable')
    revolution()
    expect(document.querySelector('.flat-radar')).toHaveAttribute(
      'data-field',
      'Neuroscience',
    )
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })
  it('closes a pending audio context if navigation happens before audio resumes', async () => {
    let resume!: () => void
    const context = {
      state: 'running',
      resume: vi.fn(
        () =>
          new Promise<void>((done) => {
            resume = done
          }),
      ),
      close: vi.fn(async () => {}),
    }
    vi.stubGlobal(
      'AudioContext',
      vi.fn(function () {
        return context
      }),
    )
    const user = userEvent.setup()
    const view = renderRadar()
    await user.click(screen.getByRole('button', { name: 'Enable radar sound' }))
    view.unmount()
    expect(context.close).toHaveBeenCalledOnce()
    await act(async () => resume())
    expect(
      screen.queryByRole('button', { name: 'Mute radar sound' }),
    ).not.toBeInTheDocument()
  })
})
