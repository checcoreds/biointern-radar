import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

afterEach(cleanup)
window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()
// axe probes canvas support, but jsdom has no canvas renderer.
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => null,
  configurable: true,
})

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  Object.defineProperty(window, 'scrollY', {
    value: 0,
    configurable: true,
    writable: true,
  })
})
