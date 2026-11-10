import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import axe from 'axe-core'
import { App } from '../App'
import { realOpportunities } from '../data/realOpportunities'
import { sampleOpportunities } from '../data/opportunities'
import { DEVICE_KEY } from '../lib/deviceStorage'

let entryId = 0
function HistoryControls() {
  const location = useLocation()
  const navigate = useNavigate()
  return (
    <div>
      <output data-testid="current-url">
        {location.pathname + location.search}
      </output>
      <button onClick={() => navigate(-1)}>Test browser back</button>
      <button onClick={() => navigate(1)}>Test browser forward</button>
    </div>
  )
}
function renderApp(path = '/', entryKey?: string) {
  const url = new URL(path, 'http://localhost')
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: url.pathname,
          search: url.search,
          key: entryKey ?? `test-${entryId++}`,
        },
      ]}
    >
      <App />
      <HistoryControls />
    </MemoryRouter>,
  )
}
const demo = '/opportunities?collection=demo'
const genomicsTitle = 'Genomics Summer Research Programme · demo'

describe('Search, filters and history', () => {
  it('navigates from home to the real catalogue and keeps demos separate', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(
      within(screen.getByRole('main')).getByRole('link', {
        name: 'Explore internships',
      }),
    )
    expect(screen.getAllByRole('article')).toHaveLength(
      realOpportunities.length,
    )
    expect(screen.queryByText(genomicsTitle)).not.toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText('Collection'), 'demo')
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(screen.getByText('Fictional demo collection.')).toBeVisible()
  })
  it('retains Open AND Funded when both changes occur before React rerenders', () => {
    renderApp(demo)
    act(() => {
      fireEvent.change(screen.getByLabelText('Application status'), {
        target: { value: 'Open' },
      })
      fireEvent.change(screen.getByLabelText('Funding'), {
        target: { value: 'Funded' },
      })
    })
    expect(screen.getByLabelText('Application status')).toHaveValue('Open')
    expect(screen.getByLabelText('Funding')).toHaveValue('Funded')
    expect(screen.getByTestId('current-url')).toHaveTextContent(
      'status=Open&funding=Funded',
    )
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(screen.getByRole('link', { name: genomicsTitle })).toBeVisible()
    expect(
      screen.queryByText('Molecular Biology Summer Programme · demo'),
    ).not.toBeInTheDocument()
  })
  it('keeps controls, chips and results synchronized through back and forward', async () => {
    const user = userEvent.setup()
    renderApp(demo)
    await user.selectOptions(
      screen.getByLabelText('Application status'),
      'Open',
    )
    await user.selectOptions(screen.getByLabelText('Funding'), 'Funded')
    await user.click(screen.getByRole('button', { name: 'Test browser back' }))
    expect(screen.getByLabelText('Application status')).toHaveValue('Open')
    expect(screen.getByLabelText('Funding')).toHaveValue('')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    await user.click(
      screen.getByRole('button', { name: 'Test browser forward' }),
    )
    expect(screen.getByLabelText('Funding')).toHaveValue('Funded')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    await user.click(
      screen.getByRole('button', { name: 'Remove status filter: Open' }),
    )
    expect(screen.getByLabelText('Funding')).toHaveValue('Funded')
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })
  it('loads search, sort and hide-closed settings from a reloadable URL', () => {
    renderApp(`${demo}&search=genomics&sort=deadline-asc&hideClosed=true`)
    expect(screen.getByRole('searchbox')).toHaveValue('genomics')
    expect(screen.getByLabelText('Sort by')).toHaveValue('deadline-asc')
    expect(screen.getByLabelText('Hide closed opportunities')).toBeChecked()
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })
  it('searches, combines filters and recovers from an empty state', async () => {
    const user = userEvent.setup()
    renderApp(demo)
    await user.type(screen.getByRole('searchbox'), 'genomics')
    await user.selectOptions(screen.getByLabelText('Country'), 'Italy')
    expect(
      screen.getByRole('heading', { name: 'No matches on the radar' }),
    ).toBeVisible()
    await user.click(
      screen.getByRole('button', { name: 'Clear search and filters' }),
    )
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(screen.getByLabelText('Collection')).toHaveValue('real')
    expect(screen.getAllByRole('article')).toHaveLength(
      realOpportunities.length,
    )
  })
  it('restores catalogue search, filters and scroll when returning from a record', async () => {
    const user = userEvent.setup()
    renderApp(`${demo}&search=genomics&country=Germany&sort=deadline-asc`)
    Object.defineProperty(window, 'scrollY', {
      value: 734,
      writable: true,
      configurable: true,
    })
    await user.click(screen.getByRole('link', { name: genomicsTitle }))
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    })
    await user.click(
      screen.getByRole('link', { name: 'Back to the catalogue' }),
    )
    expect(screen.getByRole('searchbox')).toHaveValue('genomics')
    expect(screen.getByLabelText('Country')).toHaveValue('Germany')
    expect(screen.getByLabelText('Sort by')).toHaveValue('deadline-asc')
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 734)
  })
  it('uses the general catalogue when a detail is opened directly', () => {
    renderApp('/opportunities/sample-genomics-summer')
    expect(
      screen.getByRole('link', { name: 'Back to the catalogue' }),
    ).toHaveAttribute('href', '/opportunities')
  })
  it('makes radar labels accessible links to filtered real records', async () => {
    const user = userEvent.setup()
    renderApp()
    await user.click(
      screen.getByRole('link', { name: 'Explore genomics internships' }),
    )
    expect(screen.getByLabelText('Research field')).toHaveValue('Genomics')
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0)
  })
})

describe('Device-only preparation', () => {
  it('shows the empty Saved message immediately and introduces controls after saving', async () => {
    const user = userEvent.setup()
    renderApp('/saved')
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Sort by')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Filters' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Your next steps, all in one place',
      }),
    ).toBeVisible()
    await user.click(
      within(screen.getByRole('main')).getByRole('link', {
        name: 'Explore internships',
      }),
    )
    await user.click(
      screen.getByRole('button', {
        name: 'Save Life Sciences Summer Research Program 2027',
      }),
    )
    await user.click(
      screen.getByRole('link', { name: 'Saved opportunities (1)' }),
    )
    expect(screen.getByRole('searchbox')).toBeVisible()
    expect(screen.getByLabelText('Sort by')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })
  it('persists per-opportunity checklists through navigation and remounts, and resets explicitly', async () => {
    const user = userEvent.setup()
    const view = renderApp('/opportunities/sample-genomics-summer')
    await user.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '1')
    expect(
      JSON.parse(localStorage.getItem(DEVICE_KEY)!).checklists['sample-01'],
    ).toEqual(['source'])
    view.unmount()
    const other = renderApp('/opportunities/sample-cell-biology')
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '0')
    other.unmount()
    renderApp('/opportunities/sample-genomics-summer')
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '1')
    expect(screen.getAllByRole('checkbox')[0]).toBeChecked()
    await user.click(
      screen.getByRole('button', { name: 'Reset this checklist' }),
    )
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '0')
    expect(
      JSON.parse(localStorage.getItem(DEVICE_KEY)!).checklists['sample-01'],
    ).toEqual([])
  })
  it('saves, revisits and unsaves an opportunity without an account', async () => {
    const user = userEvent.setup()
    const view = renderApp('/opportunities/epfl-life-sciences-summer-2027')
    await user.click(
      screen.getByRole('button', {
        name: 'Save Life Sciences Summer Research Program 2027',
      }),
    )
    view.unmount()
    renderApp('/saved')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    expect(
      screen.getByRole('link', {
        name: 'Life Sciences Summer Research Program 2027',
      }),
    ).toBeVisible()
    await user.click(
      screen.getByRole('button', {
        name: 'Unsave Life Sciences Summer Research Program 2027',
      }),
    )
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: 'Your next steps, all in one place',
      }),
    ).toBeVisible()
  })
  it('handles corrupt stored data without crashing', () => {
    localStorage.setItem(DEVICE_KEY, '{broken')
    renderApp('/saved')
    expect(screen.getByText(/Saved data could not be read/)).toBeVisible()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Your saved opportunities',
    )
  })
  it('keeps working and tells the student if storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    const user = userEvent.setup()
    renderApp('/opportunities/sample-genomics-summer')
    await user.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '1')
    expect(screen.getByText(/Browser storage is unavailable/)).toBeVisible()
  })
})

describe('Honest information and route coverage', () => {
  it('keeps essential card facts concise and retains the complete detail information', async () => {
    const user = userEvent.setup()
    renderApp('/opportunities')
    const card = screen
      .getByRole('link', {
        name: 'Life Sciences Summer Research Program 2027',
      })
      .closest('article')!
    expect(
      card.querySelectorAll('.topic-list > span:not(.extra-topics)'),
    ).toHaveLength(2)
    const more = within(card).getByRole('button', {
      name: /Show 2 more research topics/,
    })
    expect(more).toHaveTextContent('+2 more')
    expect(more).toHaveAttribute('aria-expanded', 'false')
    expect(within(card).getByText('Bioinformatics')).not.toBeVisible()
    await user.click(more)
    expect(more).toHaveAttribute('aria-expanded', 'true')
    expect(within(card).getByText('Bioinformatics')).toBeVisible()
    expect(within(card).getByText('Neuroscience')).toBeVisible()
    expect(screen.getByTestId('current-url')).toHaveTextContent(
      '/opportunities',
    )
    more.focus()
    await user.keyboard('{Enter}')
    expect(more).toHaveAttribute('aria-expanded', 'false')
    expect(within(card).getByText('Bioinformatics')).not.toBeVisible()
    await user.keyboard(' ')
    expect(within(card).getByText('Bioinformatics')).toBeVisible()
    for (const label of ['Deadline', 'Funding', 'Eligibility'])
      expect(within(card).getByText(label)).toBeVisible()
    await user.click(within(card).getByRole('link'))
    const summary = screen.getByRole('region', { name: 'Opportunity summary' })
    for (const label of ['Deadline', 'Duration', 'Funding'])
      expect(within(summary).getByText(label)).toBeVisible()
    expect(
      within(summary).getByRole('link', {
        name: 'Read the official source (opens in a new tab)',
      }),
    ).toHaveAttribute(
      'href',
      realOpportunities.find(
        (item) => item.slug === 'epfl-life-sciences-summer-2027',
      )!.sourceUrl,
    )
    const eligibility = screen
      .getByRole('heading', { name: 'Am I eligible?' })
      .closest('section')!
    const notes = eligibility.querySelector('details')!
    expect(notes).not.toHaveAttribute('open')
    await user.click(within(eligibility).getByText('Sources & notes'))
    expect(notes).toHaveAttribute('open')
    expect(within(notes).getAllByRole('link').length).toBeGreaterThan(0)
    expect(notes).toHaveTextContent('28 Oct 2026')
  })
  it('shows decisive university and study-year restrictions while browsing', () => {
    renderApp('/opportunities')
    const rise = screen
      .getByRole('link', { name: 'RISE Germany Research Internships 2027' })
      .closest('article')!
    expect(within(rise).getByText('Bachelor’s')).toBeVisible()
    expect(
      within(rise).getByText(/University in the US, Canada, UK or Ireland/),
    ).toBeVisible()
    expect(rise).toHaveTextContent(
      '2 undergraduate years completed; remain an undergraduate afterward',
    )
    const lmu = screen
      .getByRole('link', { name: 'LMU Munich Amgen Scholars Programme 2027' })
      .closest('article')!
    expect(lmu).toHaveTextContent('University in Europe (EHEA)')
  })
  it('renders repeated source URLs with distinct check dates without React key warnings', async () => {
    const errors = vi.spyOn(console, 'error').mockImplementation(() => {})
    const user = userEvent.setup()
    renderApp('/opportunities/daad-rise-germany-2027')
    expect(screen.getByText(/Only eligibility was rechecked/)).toBeVisible()
    const eligibility = screen
      .getByRole('heading', { name: 'Am I eligible?' })
      .closest('section')!
    await user.click(within(eligibility).getByText('Sources & notes'))
    expect(within(eligibility).getAllByText(/29 Oct 2026/)).toHaveLength(3)
    expect(within(eligibility).getByText(/28 Oct 2026/)).toBeVisible()
    expect(errors).not.toHaveBeenCalled()
  })
  it.each([...realOpportunities, ...sampleOpportunities])(
    'renders all student questions for $slug',
    (item) => {
      renderApp(`/opportunities/${item.slug}`)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        item.title,
      )
      for (const title of [
        'What will I do?',
        'Am I eligible?',
        'When does it happen?',
        'What does it cost?',
        'What must I prepare?',
        'How do I apply?',
      ])
        expect(screen.getByRole('heading', { name: title })).toBeVisible()
      if (item.isSample)
        expect(
          screen.queryByRole('link', {
            name: 'Read the official source (opens in a new tab)',
          }),
        ).not.toBeInTheDocument()
      else
        expect(
          screen.getByRole('link', {
            name: 'Read the official source (opens in a new tab)',
          }),
        ).toHaveAttribute('href', item.sourceUrl)
    },
  )
  it('distinguishes not-stated, not-checked and not-applicable fields', () => {
    renderApp('/opportunities/embl-undergraduate-research-outreach')
    expect(
      screen.getAllByText('Not stated by the source').length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('Not applicable').length).toBeGreaterThan(0)
    expect(
      screen.getAllByText('No advertised vacancy.').length,
    ).toBeGreaterThan(0)
  })
  it.each(['/opportunities/not-a-real-record', '/missing-page'])(
    'recovers from an unknown route: %s',
    async (path) => {
      const user = userEvent.setup()
      renderApp(path)
      expect(screen.getByRole('main')).toHaveTextContent(
        /not found|hasn’t been mapped/,
      )
      await user.click(
        within(screen.getByRole('main')).getByRole('link', {
          name: /Back to the catalogue|Explore internships/,
        }),
      )
      expect(screen.getByRole('searchbox')).toBeVisible()
    },
  )
})

describe('Basic accessibility', () => {
  it('supports opening and dismissing the compact menu from the keyboard', async () => {
    const user = userEvent.setup()
    renderApp()
    const toggle = screen.getByRole('button', { name: 'Main menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
    await user.click(toggle)
    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Main navigation' }),
      ).getByRole('link', {
        name: 'Explore internships',
      }),
    )
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Life-sciences internships',
    )
  })
  it.each([
    '/',
    '/opportunities',
    '/saved',
    '/opportunities/epfl-life-sciences-summer-2027',
    '/opportunities/embl-undergraduate-research-outreach',
    '/missing-page',
  ])('has no axe structural violations at %s', async (path) => {
    renderApp(path)
    // jsdom does not render layout or contrast; these are checked interactively.
    const result = await axe.run(
      document.querySelector('#root') ??
        document.querySelector('main')!.parentElement!,
      {
        rules: { 'color-contrast': { enabled: false } },
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      },
    )
    expect(
      result.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([])
  })
})

it('does not reuse an unrelated page scroll when direct visits share the default router key', () => {
  const first = renderApp('/saved', 'default')
  Object.defineProperty(window, 'scrollY', {
    value: 540,
    configurable: true,
    writable: true,
  })
  first.unmount()
  renderApp('/', 'default')
  expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
})
