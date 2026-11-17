import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { realOpportunities } from '../data/realOpportunities'
import { sampleOpportunities } from '../data/opportunities'
import { factKeys } from '../types/opportunity'
import { evidenceStats } from '../lib/evidenceStats'
import { sectionProgress, smoothstep } from '../lib/scrollProgress'
import { evidenceTag } from '../components/home/FocusSeries'
import { planes } from '../components/home/FocusGauge'
import { buildCellPoints } from '../components/home/cellField'
import { HomePage } from '../pages/HomePage'
import { DeviceProvider } from '../lib/device'
import { featuredOpportunities } from '../lib/opportunities'

function Where() {
  const location = useLocation()
  return (
    <output data-testid="where">{location.pathname + location.search}</output>
  )
}
const renderHome = () =>
  render(
    <DeviceProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Where />} />
        </Routes>
      </MemoryRouter>
    </DeviceProvider>,
  )

describe('Evidence counts on the overview', () => {
  it('counts every fact of every real record exactly once', () => {
    const stats = evidenceStats(realOpportunities)
    expect(stats.total).toBe(realOpportunities.length * factKeys.length)
    expect(
      stats.checked +
        stats.notStated +
        stats.unclear +
        stats.notApplicable +
        stats.notChecked,
    ).toBe(stats.total)
    expect(stats.firstCheck! <= stats.lastCheck!).toBe(true)
  })
  it('ignores fictional demos', () => {
    expect(evidenceStats(sampleOpportunities).total).toBe(0)
  })
})

describe('Scroll progress', () => {
  it('maps a pinned section from top-at-top to bottom-at-bottom', () => {
    expect(sectionProgress({ top: 0, height: 3000 }, 1000, 'pinned')).toBe(0)
    expect(sectionProgress({ top: -1000, height: 3000 }, 1000, 'pinned')).toBe(
      0.5,
    )
    expect(sectionProgress({ top: -5000, height: 3000 }, 1000, 'pinned')).toBe(
      1,
    )
    // A section no taller than the viewport has no travel: it is resolved.
    expect(sectionProgress({ top: 0, height: 1000 }, 1000, 'pinned')).toBe(1)
  })
  it('maps natural-flow exits and entrances over a visible interval', () => {
    expect(sectionProgress({ top: 0, height: 900 }, 1000, 'exit', 0.9)).toBe(0)
    expect(sectionProgress({ top: -450, height: 900 }, 1000, 'exit', 0.9)).toBe(
      0.5,
    )
    expect(sectionProgress({ top: 1000, height: 400 }, 1000, 'enter')).toBe(0)
    expect(sectionProgress({ top: 200, height: 400 }, 1000, 'enter')).toBe(1)
  })
  it('eases between edges like GLSL smoothstep', () => {
    expect(smoothstep(0, 1, -1)).toBe(0)
    expect(smoothstep(0, 1, 0.5)).toBe(0.5)
    expect(smoothstep(0, 1, 2)).toBe(1)
  })
})

describe('The focus series', () => {
  const record = featuredOpportunities(realOpportunities, 1)[0]
  it('labels evidence with its real state and date, never as checked when it is not', () => {
    for (const key of factKeys) {
      const tag = evidenceTag(record, key)
      const evidence = record.evidence![key]!
      if (evidence.state === 'source-checked') expect(tag).toMatch(/^Checked /)
      if (evidence.state === 'not-stated') expect(tag).toMatch(/^Not stated/)
      if (evidence.state === 'unclear') expect(tag).toMatch(/^Sources disagree/)
    }
  })
  it('shows the soonest-closing record as a complete, readable fact sheet', () => {
    renderHome()
    const sheet = screen
      .getByRole('heading', { name: record.title })
      .closest('article')!
    const terms = within(sheet)
      .getAllByRole('term')
      .map((term) => term.textContent)
    expect(terms).toEqual([
      'Status',
      'Deadline',
      'Country',
      'Funding',
      'Degree level',
      'GPA requirement',
    ])
    expect(
      within(sheet).getByRole('link', { name: /Open the full record/ }),
    ).toHaveAttribute('href', `/opportunities/${record.slug}`)
  })
})

describe('Overview structure', () => {
  it('gives every gauge plane a real section to jump to', () => {
    renderHome()
    for (const plane of planes)
      expect(document.getElementById(plane.id)).not.toBeNull()
    expect(
      within(
        screen.getByRole('navigation', { name: 'Overview sections' }),
      ).getAllByRole('button'),
    ).toHaveLength(planes.length)
  })
  it('ends on a real search field that opens the filtered catalogue', async () => {
    const user = userEvent.setup()
    renderHome()
    await user.type(
      screen.getByRole('searchbox', {
        name: 'Search field, country or institute',
      }),
      'genomics',
    )
    await user.click(
      screen.getByRole('button', { name: 'Explore internships' }),
    )
    expect(screen.getByTestId('where')).toHaveTextContent(
      '/opportunities?search=genomics',
    )
  })
  it('builds the same cell field on every visit', () => {
    expect(buildCellPoints(3)).toEqual(buildCellPoints(3))
    expect(buildCellPoints(3).length % 6).toBe(0)
  })
})
