# BioIntern Radar overview: scroll redesign brief

**Self-authored under explicit creative delegation.** The owner gave full creative
authority at the start of the project ("I give you full power to do all the
modifications that you want, obviously within limits") and, on 17 November 2026,
asked for a redesign of the whole site with scrollcraft: "use those layers and
depth and all that stuff". No interview was run. Decisions below are labelled as
authored; facts about the owner and audience come from earlier conversation.

## The eight topics

1. **Vibe in three to five words.** Authored: _a live specimen, in focus._
   References: the moment a slide snaps sharp under a microscope's fine-focus
   knob; a journal figure plate where every panel has a caption; a lab notebook
   page.
2. **The journey, section by section.** Authored from the product's actual job:
   the specimen (who this is for and the one action), the scattered problem, the
   moment it comes into focus, the evidence behind it, the collection, the
   protocol, a search field to start.
3. **Energy curve.** Calm and luminous at the top, quiet before the middle, one
   intense moment in the middle (the focus pull), then steady and practical to
   the end.
4. **Feeling, stage by stage, and the one moment.** See the curve and the peak.
5. **What no site they have seen does.** Owner's own words, earlier: similar sites
   "have been really bad". Authored answer: scrolling _is_ the fine-focus knob,
   and a blurry mess of internship details racks into one sharp record with its
   sources.
6. **Distance from premium-minimal.** Authored: _dense-scientific_, between
   Dense and Editorial (§5 of uniqueness.md). Information-forward, real numbers,
   small labels, one blue accent. Not luxury-dark.
7. **One world or distinct scenes.** Authored: one optical axis, distinct focal
   planes. Sections are planes at increasing depth, not a continuous flight.
8. **Assets.** None supplied. No image-generation key is set, and the project
   rules require asking before adding a paid service, so the world is rendered
   in code (WebGL point fields and CSS), no photographs, no video.

## Owner facts this brief relies on

- Audience: undergraduates aged about 19 to 23 in genomics, biotechnology,
  pharmacy, chemistry and related degrees, mostly arriving from LinkedIn.
- The owner wants 3D, light, motion and sound, and explicitly asked for the bold
  version over a restrained one.
- Project rules that bind this build (AGENTS.md): native system fonts only;
  colours only as `light-dark()` tokens; strict CSP (own files only, no inline
  scripts or styles); blue light/dark themes; pill controls and 24 to 30px
  radii; minimal opportunity cards; sticky header with pill navigation; the
  SweepRadar field link and controls; opt-in sound; reduced-motion support;
  facts never invented.

## World

Rendered microscopy, honest about being rendered. The ground is the page's own
blue light or deep-navy dark. Points of light make cells, a DNA helix and lens
dust; depth of field is real (points defocus into soft discs away from the focal
plane). No clay, no isometric diorama, no stock photograph, no violet-to-blue
gradient, no gradient text.

## Grammar: Focal series (new)

The page is a microscope focus series down one optical axis. Each section is a
focal plane at increasing depth.

- **Navigation:** the site's real sticky header stays, because the site is a
  tool with pages. On the overview only, a fine-focus gauge sits on the right
  edge (desktop): a vertical scale with one tick per plane, a marker for the
  current focal plane, and clickable plane names that jump.
- **Sequence:** planes alternate sparse and dense. Things arrive by coming into
  focus (blur to sharp, slight scale), never by sliding in from the side.
- **Hero:** plane one, a layered specimen with the headline on its focal plane.
- **Close:** the deepest plane is a real input: a search field with a cursor that
  opens the catalogue. Not a button island.
- **Bans:** horizontal pan rails, scrub video, clip-path wipes, a magnetic CTA,
  a pointer spotlight on the stage, character-split kinetic type, scroll cues,
  section numbers (the protocol's step numbers are the exception, because order
  is the information there), gradient text.

Why not the eight defined grammars: filmic one-shot forbids tool chrome and this
site is a tool; chaptered editorial forbids media above the fold, which fights
the layered hero the owner asked for; live surface forbids a hero scene;
continuous world needs real geography; typographic poster bans the scene;
gallery bans a hero claim and the overview must say what the site is; split
stage needs a two-sided argument; rhythmic cutlist is the wrong energy for an
audience deciding where to spend a summer.

## Signature move

**Scroll is the fine-focus knob.** In the peak section the focal plane travels
through a field of internship details scattered at different depths. Each
fragment sharpens as the focal plane passes it and blurs again behind it, until
the whole field lands on one plane and locks into a real fact sheet for the
soonest-closing open call, every line carrying its evidence and check date.

## Tell-someone sentence

It's the site where **you scroll like turning a microscope's focus knob and a
blurry pile of internship details snaps into one sharp fact sheet, with the
source pinned to every line.**

## Feeling curve

```
1  Wonder      a live specimen under the lens: helix in focus, cells drifting deeper, dust passing close
2  Unease      one plain sentence on empty ground: every institute publishes its own call, its own way
3  Clarity     the focus pull: scattered details sharpen one depth at a time and lock into one record
4  Trust       real counts of checked, unstated and unclear facts, unknowns kept visible
5  Appetite    the soonest real deadlines, cards leaning toward the pointer
6  Confidence  three practical steps, a line drawing itself between them
7  Resolve     a real search field with a cursor in it
```

**The peak:** act 3. Said to a friend: "it was all blurry, and as I scrolled it
racked into focus and became one clean record, with where every fact came from."

**Authored silence:** act 2 is deliberately sparse (one sentence, faint
fragments) so the peak has something to arrive from. It is not dead scroll.

## Layer contract (hero)

| Plane         | Asset and depth                                 | Independent movement                                | Occlusion rule                                      |
| ------------- | ----------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| Far           | WebGL cell field, full bleed, defocused at rest | Slowest rise, scales up as focus moves deeper       | Never behind body copy at high contrast             |
| Focal subject | The existing helix-and-radar WebGL scene        | Moderate rise; defocuses as the plane moves past it | Field name link and controls stay on top and usable |
| Typography    | Semantic HTML headline, line, CTA, facts        | Stable                                              | Always fully readable                               |
| Near          | Large out-of-focus dust discs                   | Fastest rise, passes the viewer                     | Corners and edges only; never covers the headline   |

Opening: helix sharp, cells soft, dust blurred near the lens. Midpoint: the
focal plane moves deeper, cells sharpen and grow, the helix softens and rises,
dust passes. Exit: the field settles into the quiet act 2 ground.

## Score

| Act          | Device family                    | Span | Why                                   |
| ------------ | -------------------------------- | ---- | ------------------------------------- |
| 1 Specimen   | parallax planes + depth of field | 1.0  | Depth is the opening promise          |
| 2 Scatter    | flow, single line                | 0.8  | Quiet before the peak                 |
| 3 Focus      | pin, custom focus series         | 2.6  | The peak gets the most room           |
| 4 Evidence   | count (real computed numbers)    | 0.9  | Trust needs checkable numbers         |
| 5 Collection | flow + pointer tilt on cards     | 1.3  | Options, at the visitor's pace        |
| 6 Protocol   | draw (stroke builds with scroll) | 0.9  | A procedure drawn as it is read       |
| 7 Search     | input                            | 0.8  | The visitor starts doing, not reading |

About 8.3 viewport-heights. Six device families, none twice in a row, no scrub.
Under reduced motion the pinned act collapses to its resolved state with no
extra scroll.
