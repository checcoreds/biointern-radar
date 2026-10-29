/** Synthesised locally after a user gesture. No audio file or network request. */
export function createRadarAudio(context: AudioContext) {
  const voices = new Set<OscillatorNode>()
  const beep = () => {
    if (context.state !== 'running') return
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const now = context.currentTime
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, now)
    oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.16)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
    oscillator.connect(gain)
    gain.connect(context.destination)
    voices.add(oscillator)
    oscillator.onended = () => {
      oscillator.disconnect()
      gain.disconnect()
      voices.delete(oscillator)
    }
    oscillator.start(now)
    oscillator.stop(now + 0.2)
  }
  const stop = () => {
    voices.forEach((voice) => {
      try {
        voice.stop()
      } catch {
        /* Already ended. */
      }
    })
    voices.clear()
  }
  return {
    beep,
    stop,
    close: () => {
      stop()
      void context.close().catch(() => {})
    },
  }
}
