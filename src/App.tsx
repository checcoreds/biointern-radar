import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Bookmark, Menu, X } from 'lucide-react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import { Brand } from './components/UI'
import { HomePage } from './pages/HomePage'
import { CataloguePage } from './pages/CataloguePage'
import { OpportunityPage } from './pages/OpportunityPage'
import { opportunityRepository } from './lib/opportunities'
import { DeviceProvider } from './lib/device'
import { useDevice } from './lib/useDevice'
import { getCatalogueReturn } from './lib/catalogueNavigation'

const scrollPositions = new Map<string, number>()
function storedScroll(key: string): number | undefined {
  if (scrollPositions.has(key)) return scrollPositions.get(key)
  try {
    const raw = sessionStorage.getItem(`biointern-radar:scroll:${key}`)
    if (raw === null) return undefined
    const value = Number(raw)
    return Number.isFinite(value) && value >= 0 ? value : undefined
  } catch {
    return undefined
  }
}
function RouteEffects() {
  const location = useLocation()
  const navigationType = useNavigationType()
  useLayoutEffect(() => {
    if (!('scrollRestoration' in window.history)) return
    const previous = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.history.scrollRestoration = previous
    }
  }, [])
  useEffect(() => {
    const item = opportunityRepository.findBySlug(
      location.pathname.split('/')[2] ?? '',
    )
    const title =
      location.pathname === '/'
        ? 'Life-sciences research internships'
        : location.pathname === '/opportunities'
          ? 'Explore internships'
          : location.pathname === '/saved'
            ? 'Saved opportunities'
            : (item?.title ?? 'Page not found')
    document.title = `${title} | BioIntern Radar`
  }, [location.pathname])
  useLayoutEffect(() => {
    // Direct document visits can all have Router's "default" key. Include the
    // URL so a saved position from another page cannot leak into this one.
    const scrollKey = `${location.key}:${location.pathname}${location.search}`
    const state = location.state as {
      restoreCatalogue?: unknown
      catalogueQuery?: boolean
    } | null
    const restore = getCatalogueReturn(state?.restoreCatalogue)
    if (location.hash)
      document.getElementById(location.hash.slice(1))?.scrollIntoView()
    else if (restore && restore.url === location.pathname + location.search) {
      window.scrollTo(0, restore.scrollY)
    } else if (
      navigationType === 'POP' &&
      storedScroll(scrollKey) !== undefined
    ) {
      window.scrollTo(0, storedScroll(scrollKey)!)
    } else if (!state?.catalogueQuery) {
      window.scrollTo(0, 0)
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
    const persist = () => {
      scrollPositions.set(scrollKey, window.scrollY)
      try {
        sessionStorage.setItem(
          `biointern-radar:scroll:${scrollKey}`,
          String(window.scrollY),
        )
      } catch {
        /* In-memory restoration still works. */
      }
    }
    window.addEventListener('pagehide', persist)
    return () => {
      persist()
      window.removeEventListener('pagehide', persist)
    }
  }, [
    location.key,
    location.pathname,
    location.search,
    location.hash,
    location.state,
    navigationType,
  ])
  return null
}
function Shell() {
  const { data, storageWarning } = useDevice()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])
  return (
    <>
      <RouteEffects />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label="Main menu"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? (
              <X size={23} aria-hidden="true" />
            ) : (
              <Menu size={23} aria-hidden="true" />
            )}
          </button>
          <nav
            id="main-navigation"
            className={menuOpen ? 'is-open' : ''}
            aria-label="Main navigation"
            onClick={() => setMenuOpen(false)}
          >
            <NavLink to="/" end>
              Overview
            </NavLink>
            <NavLink to="/opportunities">Explore internships</NavLink>
            <NavLink
              to="/saved"
              className="saved-nav"
              aria-label={`Saved opportunities${data.savedIds.length ? ` (${data.savedIds.length})` : ''}`}
            >
              <Bookmark size={16} aria-hidden="true" />
              Saved
              {data.savedIds.length > 0 && (
                <span className="saved-count">{data.savedIds.length}</span>
              )}
            </NavLink>
            <Link to="/#how-it-works" className="guide-nav">
              How it works
            </Link>
          </nav>
          <Link to="/opportunities" className="header-cta">
            Find your next step
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </header>
      {storageWarning && (
        <p className="storage-warning container" role="status">
          {storageWarning}
        </p>
      )}
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/opportunities" element={<CataloguePage />} />
          <Route path="/saved" element={<CataloguePage savedOnly />} />
          <Route path="/opportunities/:slug" element={<OpportunityPage />} />
          <Route
            path="*"
            element={
              <div className="container not-found">
                <span className="eyebrow">OFF THE RADAR · 404</span>
                <h1>This page hasn’t been mapped.</h1>
                <p>Let’s get you back to exploring research pathways.</p>
                <Link className="button button-dark" to="/opportunities">
                  Explore internships
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <Brand />
          </div>
          <div className="footer-right">
            <span className="footer-demo">
              Manual collection · separate fictional demos
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
export function App() {
  return (
    <DeviceProvider>
      <Shell />
    </DeviceProvider>
  )
}
