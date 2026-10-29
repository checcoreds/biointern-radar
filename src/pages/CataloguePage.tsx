import { useRef, useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { CollectionNotice, EmptyState, OpportunityCard } from '../components/UI'
import {
  filterOpportunities,
  opportunityRepository,
  readFilters,
  sortOpportunities,
} from '../lib/opportunities'
import { useCatalogueQuery } from '../lib/useCatalogueQuery'
import { useDevice } from '../lib/useDevice'
import type { Filters } from '../types/opportunity'

export function CataloguePage({ savedOnly = false }: { savedOnly?: boolean }) {
  const { params, update, reset } = useCatalogueQuery()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const resultsRef = useRef<HTMLElement>(null)
  const { data } = useDevice()
  const filters = readFilters(params, savedOnly ? 'all' : 'real')
  const allItems = opportunityRepository.listAll()
  const items = savedOnly
    ? allItems.filter((item) => data.savedIds.includes(item.id))
    : allItems
  const collectionItems = items.filter(
    (item) =>
      filters.collection === 'all' ||
      (filters.collection === 'demo' ? item.isSample : !item.isSample),
  )
  const results = sortOpportunities(
    filterOpportunities(items, filters),
    filters.sort,
  )
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) =>
      !['search', 'collection', 'sort', 'hideClosed'].includes(key) && value,
  ) as [keyof Filters, string][]
  const defaultCollection = savedOnly ? 'all' : 'real'
  const filterCount =
    activeFilters.length +
    Number(filters.hideClosed) +
    Number(filters.collection !== defaultCollection)
  const filterOptions: {
    key: keyof Filters
    label: string
    options: string[]
  }[] = [
    {
      key: 'field',
      label: 'Research field',
      options: [
        ...new Set(collectionItems.flatMap((item) => item.scientificTopics)),
      ].sort(),
    },
    {
      key: 'country',
      label: 'Country',
      options: [
        ...new Set(
          collectionItems.flatMap(
            (item) => item.countries ?? [item.country ?? 'Unknown'],
          ),
        ),
      ].sort(),
    },
    {
      key: 'degree',
      label: 'Degree level',
      options: ['Bachelor’s', 'Master’s', 'Unknown'],
    },
    {
      key: 'status',
      label: 'Application status',
      options: [
        'Open',
        'Upcoming',
        'Closed',
        'Unknown',
        'No advertised vacancy',
      ],
    },
    {
      key: 'funding',
      label: 'Funding',
      options: ['Funded', 'Partially funded', 'Unpaid', 'Unknown'],
    },
    {
      key: 'period',
      label: 'Approximate period',
      options: ['Summer', 'Academic year', 'Flexible', 'Unknown'],
    },
    {
      key: 'category',
      label: 'Opportunity type',
      options: [
        'Structured programme',
        'Advertised position',
        'Speculative lab outreach',
      ],
    },
  ]
  const showResults = () => {
    setFiltersOpen(false)
    requestAnimationFrame(() => {
      resultsRef.current?.focus({ preventScroll: true })
      resultsRef.current?.scrollIntoView({ block: 'start' })
    })
  }
  if (savedOnly && items.length === 0)
    return (
      <div className="container catalogue-page empty-saved-page">
        <div className="catalogue-heading">
          <h1>Your saved opportunities</h1>
        </div>
        <section
          id="catalogue-results"
          tabIndex={-1}
          aria-label="Saved opportunities"
        >
          <EmptyState reset={reset} saved hasSaved={false} headingLevel={2} />
        </section>
      </div>
    )

  return (
    <div className="container catalogue-page">
      <div className="catalogue-heading">
        <h1>
          {savedOnly ? 'Your saved opportunities' : 'Life-sciences internships'}
        </h1>
        <p>
          {savedOnly
            ? 'Your shortlist, saved on this device.'
            : 'Compare requirements. Plan your next step.'}
        </p>
      </div>
      {filters.collection !== 'all' && (
        <CollectionNotice demo={filters.collection === 'demo'} />
      )}
      <div className="catalogue-tools">
        <div className="search-bar">
          <Search size={20} aria-hidden="true" />
          <label htmlFor="opportunity-search" className="sr-only">
            Search opportunities
          </label>
          <input
            id="opportunity-search"
            type="search"
            placeholder="Search field, country or institute"
            value={filters.search}
            onChange={(event) => update('search', event.target.value)}
          />
        </div>
        <div className="catalogue-toolbar">
          <button
            className={`mobile-filter-toggle ${filterCount ? 'has-filters' : ''}`}
            onClick={() => setFiltersOpen((previous) => !previous)}
            aria-expanded={filtersOpen}
            aria-controls="filter-panel"
          >
            <SlidersHorizontal size={18} aria-hidden="true" />
            Filters
            {filterCount > 0 && (
              <span className="filter-count">{filterCount}</span>
            )}
          </button>
          <div className="sort-control">
            <label htmlFor="sort-results" className="sr-only">
              Sort by
            </label>
            <select
              id="sort-results"
              className={
                filters.sort !== 'recommended' ? 'is-selected' : undefined
              }
              value={filters.sort}
              onChange={(event) => update('sort', event.target.value)}
            >
              <option value="recommended">Application status</option>
              <option value="deadline-asc">Deadline: soonest</option>
              <option value="deadline-desc">Deadline: latest</option>
              {!['recommended', 'deadline-asc', 'deadline-desc'].includes(
                filters.sort,
              ) && <option value={filters.sort}>Default order</option>}
            </select>
          </div>
        </div>
      </div>
      <div className="catalogue-layout">
        <aside
          id="filter-panel"
          className={`filter-sidebar ${filtersOpen ? 'is-open' : ''}`}
          aria-label="Catalogue filters"
        >
          <div className="filter-heading">
            <h2>Refine your search</h2>
            <button
              className="reset-button"
              onClick={reset}
              disabled={params.size === 0}
            >
              Reset
            </button>
          </div>
          <div className="filter-fields" id="filter-fields">
            <div className="filter-group">
              <label htmlFor="filter-collection">Collection</label>
              <select
                id="filter-collection"
                className={
                  filters.collection !== defaultCollection
                    ? 'is-selected'
                    : undefined
                }
                value={filters.collection}
                onChange={(event) =>
                  update(
                    'collection',
                    event.target.value === defaultCollection
                      ? ''
                      : event.target.value,
                  )
                }
              >
                {savedOnly && <option value="all">All saved records</option>}
                <option value="real">Official-source records</option>
                <option value="demo">Fictional demos only</option>
                {!['real', 'demo', ...(savedOnly ? ['all'] : [])].includes(
                  filters.collection,
                ) && (
                  <option value={filters.collection}>
                    {filters.collection}
                  </option>
                )}
              </select>
            </div>
            {filterOptions.map((filter) => (
              <div className="filter-group" key={filter.key}>
                <label htmlFor={`filter-${filter.key}`}>{filter.label}</label>
                <select
                  id={`filter-${filter.key}`}
                  className={filters[filter.key] ? 'is-selected' : undefined}
                  value={String(filters[filter.key])}
                  onChange={(event) => update(filter.key, event.target.value)}
                >
                  <option value="">Any {filter.label.toLowerCase()}</option>
                  {filters[filter.key] &&
                    !filter.options.includes(String(filters[filter.key])) && (
                      <option value={String(filters[filter.key])}>
                        {String(filters[filter.key])}
                      </option>
                    )}
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <label className="hide-closed-control">
              <input
                type="checkbox"
                checked={filters.hideClosed}
                onChange={(event) =>
                  update('hideClosed', event.target.checked ? 'true' : '')
                }
              />
              <span>Hide closed opportunities</span>
            </label>
            <p className="filter-note">
              Lab enquiries do not confirm a vacancy. Unknown details never mean
              no requirement.
            </p>
            <button
              className="button button-dark show-results"
              onClick={showResults}
            >
              Show {results.length}{' '}
              {results.length === 1 ? 'result' : 'results'}
            </button>
          </div>
        </aside>
        <section
          className="catalogue-results"
          id="catalogue-results"
          aria-labelledby="results-title"
          ref={resultsRef}
          tabIndex={-1}
        >
          <div className="results-heading">
            <h2 id="results-title" className="sr-only">
              {savedOnly ? 'Saved opportunities' : 'Research opportunities'}
            </h2>
            <p role="status" aria-live="polite">
              <strong>{results.length}</strong>{' '}
              {results.length === 1 ? 'opportunity' : 'opportunities'}
              {filters.collection === 'demo' ? ' · fictional demos' : ''}
            </p>
          </div>
          {(activeFilters.length > 0 || filters.hideClosed) && (
            <div className="active-filters">
              {activeFilters.map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => update(key, '')}
                  aria-label={`Remove ${key} filter: ${value}`}
                >
                  {value}
                  <X size={15} aria-hidden="true" />
                </button>
              ))}
              {filters.hideClosed && (
                <button
                  onClick={() => update('hideClosed', '')}
                  aria-label="Remove hide closed filter"
                >
                  Closed hidden
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
          {results.length ? (
            <div className="cards-grid catalogue-cards">
              {results.map((item) => (
                <OpportunityCard key={item.id} opportunity={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              reset={reset}
              saved={savedOnly}
              hasSaved={items.length > 0}
            />
          )}
          <p className="catalogue-end">
            {filters.collection === 'demo'
              ? 'Fictional examples for exploring the interface.'
              : 'Manually maintained. Confirm current details with the official source.'}
          </p>
        </section>
      </div>
    </div>
  )
}
