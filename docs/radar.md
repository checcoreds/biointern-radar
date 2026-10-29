# Animated research radar

The active homepage component is `SweepRadar.tsx`. It restores the original flat green radar: grid, concentric rings, central DNA icon and a translucent rotating beam. The headline, typography, primary action and homepage structure are unchanged.

## Timing and interaction

- The CSS sweep completes a full revolution every **five seconds**, with no JavaScript frame loop or graphics initialization.
- Its native `animationiteration` event advances one featured name: **Genomics → Neuroscience → Molecular biology → Genomics**. The readout crossfades over 600ms and the light pulses once. It is illustrative, not live detection.
- Three ordinary React Router links remain available below the diagram, so students can open a field immediately without waiting for a cycle. The changing decorative readout is hidden from screen readers; link names and URLs stay stable.
- Pause/resume controls preserve the sweep phase. IntersectionObserver/document visibility pause the animation and prevent pings offscreen or when hidden. Reduced motion shows a static view with all links available.

## Sound

The speaker button creates and resumes a Web Audio context only after a user click. It previews a quiet ping, then plays one per completed turn. An oscillator and gain envelope produce a short, softly decaying tone locally; no audio assets or network calls are involved. Muting, unmounting or navigating away stop/close the audio resources. A failed/blocked audio context leaves the visual radar and navigation usable.

Sound defaults off on every new visit. Browser autoplay policies and device output/mute settings still apply. No browser permission, key or external service is required.

## Retired 3D implementation

The homepage no longer imports `ResearchRadar.tsx` or `radarScene.ts`. The production build has **no Three.js graphics chunk** and creates no canvas/WebGL context. Earlier source/dependency files are retained without being shipped; no files were deleted. The former local fault fixture now shows a retirement message and links back to the homepage.

## Verification

Focused tests cover native sweep-cycle events, field-name order and URLs, pause/resume, reduced motion, hidden-document suspension, audio opt-in, one ping per turn, audio cleanup and unavailable audio. Existing catalogue, saved-record, checklist and accessibility regressions remain in the suite.

The sweep and readout were checked interactively, including the speaker toggle, pause/resume, link navigation, mobile scrolling and layouts at 320, 390, 768 and 1440px. The browser accepted the audio context and reported no console errors. Actual perceived volume depends on the device; no acoustic output measurement was performed. Physical touch devices and all browser/audio-driver combinations were not tested.
