import { useSyncExternalStore } from 'react'

/**
 * Opt-in interface sounds for the whole site. Everything is synthesised in the
 * browser: no audio files and no network requests. Sound is off until the
 * visitor turns it on, and the choice is a per-device display preference kept
 * separately from saved opportunities.
 */
export const SOUND_STORAGE_KEY = 'biointern-radar:sound'

export type SoundName =
  'ping' | 'save' | 'unsave' | 'tick' | 'untick' | 'complete'
export type SoundStatus = 'off' | 'on' | 'unavailable'

/** One note: frequency glide in hertz, start offset and length in seconds. */
type Note = readonly [from: number, to: number, at: number, length: number]

const scores: Record<SoundName, readonly Note[]> = {
  ping: [[880, 660, 0, 0.18]],
  save: [
    [587, 587, 0, 0.09],
    [880, 880, 0.07, 0.16],
  ],
  unsave: [[660, 440, 0, 0.14]],
  tick: [[1175, 1175, 0, 0.06]],
  untick: [[784, 622, 0, 0.07]],
  complete: [
    [523, 523, 0, 0.2],
    [659, 659, 0.09, 0.2],
    [784, 784, 0.18, 0.2],
    [1047, 1047, 0.27, 0.3],
  ],
}

function storedChoice(): boolean {
  try {
    return localStorage.getItem(SOUND_STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}
function storeChoice(on: boolean): void {
  try {
    if (on) localStorage.setItem(SOUND_STORAGE_KEY, 'on')
    else localStorage.removeItem(SOUND_STORAGE_KEY)
  } catch {
    /* The choice still applies for this visit. */
  }
}

let status: SoundStatus = storedChoice() ? 'on' : 'off'
let context: AudioContext | null = null
let attempt = 0
const listeners = new Set<() => void>()

function setStatus(next: SoundStatus): void {
  status = next
  listeners.forEach((listener) => listener())
}

function schedule(audio: AudioContext, name: SoundName): void {
  const now = audio.currentTime
  for (const [from, to, at, length] of scores[name]) {
    const oscillator = audio.createOscillator()
    const gain = audio.createGain()
    const start = now + at
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(from, start)
    if (to !== from)
      oscillator.frequency.exponentialRampToValueAtTime(to, start + length)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.035, start + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length)
    oscillator.connect(gain)
    gain.connect(audio.destination)
    oscillator.onended = () => {
      oscillator.disconnect()
      gain.disconnect()
    }
    oscillator.start(start)
    oscillator.stop(start + length + 0.02)
  }
}

/** Browsers only let audio start during a click, tap or key press. */
function inGesture(): boolean {
  return navigator.userActivation?.isActive ?? true
}

export const sound = {
  status: (): SoundStatus => status,
  subscribe(listener: () => void): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
  /** Call from a click. Resolves once the browser has allowed audio. */
  async turnOn(): Promise<void> {
    const mine = ++attempt
    void context?.close().catch(() => {})
    context = null
    let audio: AudioContext | null = null
    try {
      audio = new AudioContext()
      await audio.resume()
      if (audio.state !== 'running') throw new Error('Audio is blocked')
      if (mine !== attempt) {
        void audio.close().catch(() => {})
        return
      }
      context = audio
      storeChoice(true)
      setStatus('on')
      schedule(audio, 'ping')
    } catch {
      if (audio) void audio.close().catch(() => {})
      if (mine === attempt) setStatus('unavailable')
    }
  },
  turnOff(): void {
    attempt++
    void context?.close().catch(() => {})
    context = null
    storeChoice(false)
    setStatus('off')
  },
  /** Plays a sound if the visitor has turned sound on; otherwise does nothing. */
  play(name: SoundName): void {
    if (status !== 'on') return
    try {
      // A remembered choice has no audio yet on a new visit: start it on the
      // first click or key press, never unprompted.
      if (!context) {
        if (!inGesture()) return
        context = new AudioContext()
      }
      const audio = context
      if (audio.state === 'running') schedule(audio, name)
      else if (inGesture())
        void audio
          .resume()
          .then(() => {
            if (audio === context && audio.state === 'running')
              schedule(audio, name)
          })
          .catch(() => {})
    } catch {
      /* Sound is decoration; the action itself already happened. */
    }
  },
}

export function useSoundStatus(): SoundStatus {
  return useSyncExternalStore(sound.subscribe, sound.status, sound.status)
}
