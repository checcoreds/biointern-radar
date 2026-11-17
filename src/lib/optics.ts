/**
 * Shared optical state for the overview's layered hero. The hero writes how
 * far its focal plane has travelled; the helix scene reads it on its next
 * frame. A plain object, so reading it costs nothing inside a render loop.
 */
export const optics = {
  /** 0: the helix is in focus. 1: focus has moved past it into the cells. */
  helixDefocus: 0,
}
