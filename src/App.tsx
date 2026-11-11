import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Bookmark,
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
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
import {
  catalogueFacts,
  formatDate,
  opportunityRepository,
} from './lib/opportunities'
import { DeviceProvider } from './lib/device'
import { useDevice } from './lib/useDevice'
import { getCatalogueReturn } from './lib/catalogueNavigation'
import { useTheme } from './lib/theme'
import { sound, useSoundStatus } from './lib/sound'
import { installPointerLight } from './lib/pointerLight'

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
function NotFound() {
  return (
    <div className="container not-found">
      <span className="eyebrow">OFF THE RADAR · 404</span>
      <h1>This page hasn’t been mapped.</h1>
      <p>Let’s get you back to exploring research pathways.</p>
      <Link className="button button-primary" to="/opportunities">
        Explore internships
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  )
}
function Shell() {
  const { data, storageWarning } = useDevice()
  const { pathname } = useLocation()
  const { theme, toggle: toggleTheme } = useTheme()
  const soundStatus = useSoundStatus()
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  // Count only records that still exist, so the badge matches the Saved page.
  const savedCount = opportunityRepository
    .listAll()
    .filter((item) => data.savedIds.includes(item.id)).length
  const { latestCheck } = catalogueFacts(opportunityRepository.list())
  useEffect(installPointerLight, [])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])
  return (
    <>
      <RouteEffects />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header" ref={header}>
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuButton}
            type="button"
            className="icon-button menu-toggle"
            aria-label="Main menu"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((previous) => !previous)}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
          <nav
            id="main-navigation"
            className={`site-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Main navigation"
            onClick={() => setMenuOpen(false)}
          >
            <NavLink to="/" end>
              Overview
            </NavLink>
            <NavLink to="/opportunities">Explore internships</NavLink>
            <NavLink
              to="/saved"
              aria-label={`Saved opportunities${savedCount ? ` (${savedCount})` : ''}`}
            >
              <Bookmark size={16} aria-hidden="true" />
              Saved
              {savedCount > 0 && (
                <span className="saved-count">{savedCount}</span>
              )}
            </NavLink>
            <Link to="/#how-it-works">How it works</Link>
          </nav>
          <button
            type="button"
            className="icon-button theme-toggle"
            aria-label={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
            onClick={() => {
              toggleTheme()
              sound.play('tick')
            }}
          >
            {theme === 'dark' ? (
              <Sun size={20} aria-hidden="true" />
            ) : (
              <Moon size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>
      {storageWarning && (
        <p className="storage-warning container" role="status">
          {storageWarning}
        </p>
      )}
      <main id="main-content" tabIndex={-1}>
        <div className="page-enter" key={pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/opportunities" element={<CataloguePage />} />
            <Route path="/saved" element={<CataloguePage savedOnly />} />
            <Route path="/opportunities/:slug" element={<OpportunityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Brand />
            <p>
              Life-sciences research internships in Europe. Facts carry their
              official source and check date; unknowns stay marked.
            </p>
            <button
              type="button"
              className="sound-toggle"
              aria-label={
                soundStatus === 'on'
                  ? 'Turn sound effects off'
                  : 'Turn sound effects on'
              }
              aria-pressed={soundStatus === 'on'}
              onClick={() =>
                soundStatus === 'on' ? sound.turnOff() : void sound.turnOn()
              }
            >
              {soundStatus === 'on' ? (
                <Volume2 size={16} aria-hidden="true" />
              ) : (
                <VolumeX size={16} aria-hidden="true" />
              )}
              {soundStatus === 'on'
                ? 'Sound effects on'
                : soundStatus === 'unavailable'
                  ? 'Sound unavailable in this browser'
                  : 'Sound effects off'}
            </button>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <Link to="/opportunities">Explore internships</Link>
            <Link to="/saved">Saved</Link>
            <Link to="/#how-it-works">How it works</Link>
          </nav>
          <p className="footer-note">
            Maintained by hand from official sources
            {latestCheck ? `; latest check ${formatDate(latestCheck)}` : ''}.
            Always confirm details with the organiser before applying. Saved
            items and checklists stay on this device. Fictional demos are kept
            separate.
          </p>
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
