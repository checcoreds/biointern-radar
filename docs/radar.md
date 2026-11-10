# Animated research radar

The active homepage component is `SweepRadar.tsx`. It keeps the flat radar geometry: grid, concentric rings, central DNA icon and a translucent rotating beam. The scene is transparent, without a surrounding tile. Cool cyan highlights, a shaded centre and bold name add restrained depth within the graphite theme. The headline, typography, primary action and homepage structure are unchanged.

## Timing and interaction

- The CSS sweep completes a full revolution every **five seconds**, with no JavaScript frame loop or graphics initialization.
- Its native `animationiteration` event advances one featured name: **Genomics → Neuroscience → Molecular biology → Biotechnology → Bioinformatics → Genomics**. The readout crossfades over 600ms and the light pulses once. It is illustrative, not live detection.
- The field-name icons and lower three-name strip have been removed. One ordinary React Router link wraps the bold current name. Its accessible name matches the active field; keyboard focus pauses the sweep so the destination stays stable. Decorative crossfading copies are hidden from screen readers and do not generate live announcements.
- **Next research field** selects the next name immediately and pauses automatic motion; it never triggers an automatic-cycle ping. It also works in reduced-motion mode. All five catalogue filters can be reached without waiting for animation.
- Pausing or manually selecting a field produces a quiet screen-reader announcement. Automatic laps do not generate live announcements. The field link's focus outline stays inside the scene so it is not clipped.
- Pause/resume controls preserve the sweep phase. IntersectionObserver/document visibility pause the animation and prevent pings offscreen or when hidden. Reduced motion shows a static view with the current link and manual next control available.

## Sound

The speaker button creates and resumes a Web Audio context only after a user click. It previews a quiet ping, then plays one per completed turn. An oscillator and gain envelope produce a short, softly decaying tone locally; no audio assets or network calls are involved. Muting, unmounting or navigating away stop/close the audio resources. A failed/blocked audio context leaves the visual radar and navigation usable.

Sound defaults off on every new visit. Browser autoplay policies and device output/mute settings still apply. No browser permission, key or external service is required.

## Retired 3D implementation

The earlier Three.js radar (`ResearchRadar.tsx`, `radarScene.ts`, `radarModel.ts`, its CSS, the `docs/radar-harness.html` fixture) and the `three`/`@types/three` packages were deleted on 10 November 2026. They had not been part of the build since the CSS radar replaced them. The production build creates no canvas/WebGL context.

## Verification

Focused tests cover native sweep-cycle events, field-name order and URLs, pause/resume, reduced motion, hidden-document suspension, audio opt-in, one ping per turn, audio cleanup and unavailable audio. Existing catalogue, saved-record, checklist and accessibility regressions remain in the suite.

The sweep and readout were checked interactively, including the speaker toggle, pause/resume, link navigation, mobile scrolling and layouts at 320, 390, 768 and 1440px. The browser accepted the audio context and reported no console errors. Actual perceived volume depends on the device; no acoustic output measurement was performed. Physical touch devices and all browser/audio-driver combinations were not tested.
