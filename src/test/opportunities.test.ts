import { describe, expect, it } from 'vitest'
import { sampleOpportunities } from '../data/opportunities'
import { realOpportunities } from '../data/realOpportunities'
import { factKeys } from '../types/opportunity'
import {
  defineRealOpportunity,
  type RealOpportunityInput,
} from '../lib/defineRealOpportunity'
import {
  emptyFilters,
  filterOpportunities,
  formatDate,
  readFilters,
  safeSourceUrl,
  sortOpportunities,
  applicationStatus,
} from '../lib/opportunities'

describe('Catalogue filtering', () => {
  it('combines topic and funding constraints', () => {
    const results = filterOpportunities(sampleOpportunities, {
      ...emptyFilters,
      field: 'Genomics',
      funding: 'Funded',
      status: 'Open',
    })
    expect(results.map((item) => item.slug)).toEqual(['sample-genomics-summer'])
  })
  it('searches case-insensitively across words and ignores extra spaces', () => {
    expect(
      filterOpportunities(sampleOpportunities, {
        ...emptyFilters,
        search: '  GENOMICS   germany ',
      }),
    ).toHaveLength(1)
  })
  it.each([
    ['country', 'Sweden', 'sample-ecology-fieldwork'],
    ['degree', 'Master’s', 'sample-cell-biology'],
    ['status', 'Closed', 'sample-molecular-summer'],
    ['period', 'Academic year', 'sample-cell-biology'],
    ['category', 'Speculative lab outreach', 'sample-neuroscience-outreach'],
  ])('supports the %s filter', (key, value, expected) => {
    const results = filterOpportunities(sampleOpportunities, {
      ...emptyFilters,
      [key]: value,
    })
    expect(results.some((item) => item.slug === expected)).toBe(true)
    expect(results.length).toBeLessThan(sampleOpportunities.length)
  })
  it('allows users to explicitly find unknown information', () => {
    expect(
      filterOpportunities(sampleOpportunities, {
        ...emptyFilters,
        country: 'Unknown',
        degree: 'Unknown',
        period: 'Unknown',
      }).map((item) => item.slug),
    ).toEqual(['sample-immunology-outreach'])
  })
  it('does not treat unknown eligibility as a match for a confirmed degree', () => {
    const results = filterOpportunities(sampleOpportunities, {
      ...emptyFilters,
      degree: 'Bachelor’s',
    })
    expect(
      results.some((item) => item.slug === 'sample-immunology-outreach'),
    ).toBe(false)
  })
  it('returns no results for incompatible filters', () => {
    expect(
      filterOpportunities(sampleOpportunities, {
        ...emptyFilters,
        country: 'Italy',
        funding: 'Funded',
      }),
    ).toHaveLength(0)
  })
  it('restores a bookmarkable filter query', () => {
    const filters = readFilters(
      new URLSearchParams(
        'collection=demo&search=cell&country=Netherlands&funding=Partially+funded',
      ),
    )
    expect(
      filterOpportunities(sampleOpportunities, filters).map(
        (item) => item.slug,
      ),
    ).toEqual(['sample-cell-biology'])
  })
})

describe('Information integrity', () => {
  it('keeps every fixture fictional, unverified, and without an application source', () => {
    for (const item of sampleOpportunities) {
      expect(item.isSample).toBe(true)
      expect(item.verificationStatus).toBe('Sample')
      expect(item.sourceUrl).toBeNull()
      expect(item.lastVerifiedDate).toBeNull()
      expect(item.institution).toMatch(/^Demo /)
    }
  })
  it('has unique stable IDs and slugs', () => {
    expect(new Set(sampleOpportunities.map((item) => item.id)).size).toBe(
      sampleOpportunities.length,
    )
    expect(new Set(sampleOpportunities.map((item) => item.slug)).size).toBe(
      sampleOpportunities.length,
    )
  })
  it('never converts a missing date into a deadline', () => {
    expect(formatDate(null)).toBe('Not yet checked')
    expect(formatDate('2027-07-01')).toBe('1 Jul 2027')
  })
  it.each([null, '', 'javascript:alert(1)', 'http://example.com', 'not a URL'])(
    'does not produce an unsafe source link from %s',
    (url) => {
      expect(safeSourceUrl(url)).toBeNull()
    },
  )
  it('accepts an HTTPS source URL', () => {
    expect(safeSourceUrl('https://example.org/programme')).toBe(
      'https://example.org/programme',
    )
  })
})

describe('Real records and practical sorting', () => {
  it('requires a source and field-level evidence for every real record', () => {
    for (const item of realOpportunities) {
      expect(item.isSample).toBe(false)
      expect(safeSourceUrl(item.sourceUrl)).toBeTruthy()
      expect(item.sources!.length).toBeGreaterThan(0)
      const actualDates = Object.values(item.evidence!).flatMap((entry) =>
        entry.checkedAt ? [entry.checkedAt] : [],
      )
      expect(item.lastVerifiedDate).toBe(actualDates.sort().at(-1))
      for (const key of factKeys) {
        const evidence = item.evidence![key]!
        expect(evidence).toBeDefined()
        if (evidence.state === 'source-checked') {
          expect(item[key]).not.toBeNull()
          expect(item[key]).not.toBe('Unknown')
          expect(safeSourceUrl(evidence.sourceUrl)).toBeTruthy()
          expect(evidence.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
          expect(item.sources).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                url: evidence.sourceUrl,
                checkedAt: evidence.checkedAt,
              }),
            ]),
          )
        }
      }
    }
  })
  it('uses unique IDs and slugs across both collections', () => {
    const items = [...realOpportunities, ...sampleOpportunities]
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length)
    expect(new Set(items.map((item) => item.slug)).size).toBe(items.length)
  })
  it('puts missing deadlines last in either sorting direction', () => {
    const items = [
      realOpportunities.find(
        (item) => item.id === 'embl-undergraduate-outreach',
      )!,
      realOpportunities.find((item) => item.id === 'epfl-srp-2027')!,
      realOpportunities.find((item) => item.id === 'oist-spring-2027')!,
    ]
    expect(
      sortOpportunities(items, 'deadline-asc').map((item) => item.id),
    ).toEqual([
      'oist-spring-2027',
      'epfl-srp-2027',
      'embl-undergraduate-outreach',
    ])
    expect(
      sortOpportunities(items, 'deadline-desc').map((item) => item.id),
    ).toEqual([
      'epfl-srp-2027',
      'oist-spring-2027',
      'embl-undergraduate-outreach',
    ])
  })
  it('hides closed calls without hiding an unknown status or inventing a vacancy', () => {
    const results = filterOpportunities(
      realOpportunities,
      { ...emptyFilters, hideClosed: true },
      new Date('2026-10-28T12:00:00Z'),
    )
    expect(results.some((item) => item.id === 'ki-amgen-2026')).toBe(false)
    expect(results.some((item) => item.id === 'nus-amgen-2027')).toBe(true)
    expect(
      results.some((item) => item.id === 'embl-undergraduate-outreach'),
    ).toBe(true)
  })
  it('closes elapsed exact deadlines but never infers opening from a future deadline', () => {
    const epfl = realOpportunities.find((item) => item.id === 'epfl-srp-2027')!
    expect(applicationStatus(epfl, new Date('2026-11-16T01:00:00Z'))).toBe(
      'Closed',
    )
    const nus = realOpportunities.find((item) => item.id === 'nus-amgen-2027')!
    expect(applicationStatus(nus, new Date('2026-10-28T12:00:00Z'))).toBe(
      'Unknown',
    )
  })
})

describe('Explicit verification contract', () => {
  const input = () =>
    structuredClone(realOpportunities[0]) as RealOpportunityInput

  it('rejects a populated field without explicit evidence instead of auto-checking it', () => {
    const record = input()
    Reflect.deleteProperty(record.evidence, 'funding')
    expect(() => defineRealOpportunity(record)).toThrow(
      'explicit evidence is required for funding',
    )
  })
  it('does not promote an explicitly unchecked populated value or assign it a date', () => {
    const record = input()
    record.evidence.funding = {
      state: 'not-checked',
      sourceUrl: null,
      checkedAt: null,
    }
    const result = defineRealOpportunity(record)
    expect(result.evidence!.funding).toEqual(record.evidence.funding)
  })
  it.each([null, '2026-02-30', '29 October 2026'])(
    'rejects a missing or invalid field check date: %s',
    (date) => {
      const record = input()
      record.evidence.funding.checkedAt = date
      expect(() => defineRealOpportunity(record)).toThrow('actual check date')
    },
  )
  it('rejects evidence without a matching dated source entry', () => {
    const record = input()
    record.evidence.funding.checkedAt = '2026-10-29'
    expect(() => defineRealOpportunity(record)).toThrow(
      'match a listed source and its check date',
    )
  })
  it('rejects missing source dates, unsafe sources and sample evidence on real records', () => {
    const record = input()
    record.sources[0].checkedAt = ''
    expect(() => defineRealOpportunity(record)).toThrow('actual check date')
    const unsafe = input()
    unsafe.evidence.funding.sourceUrl = 'javascript:alert(1)'
    expect(() => defineRealOpportunity(unsafe)).toThrow('HTTPS source')
    const sample = input()
    sample.evidence.funding.state = 'sample'
    expect(() => defineRealOpportunity(sample)).toThrow(
      'invalid evidence state',
    )
  })
  it('preserves distinct field dates when just one fact is rechecked', () => {
    const record = input()
    const url = record.evidence.funding.sourceUrl!
    record.sources.push({
      title: 'Funding recheck',
      url,
      checkedAt: '2026-10-29',
    })
    record.evidence.funding.checkedAt = '2026-10-29'
    const result = defineRealOpportunity(record)
    expect(result.lastVerifiedDate).toBe('2026-10-29')
    expect(result.evidence!.deadline!.checkedAt).toBe('2026-10-28')
  })
  it('rechecks DAAD eligibility without claiming a new check for unrelated fields', () => {
    const rise = realOpportunities.find(
      (record) => record.id === 'daad-rise-2027',
    )!
    expect(rise.evidence!.eligibilitySummary!.checkedAt).toBe('2026-10-29')
    expect(rise.evidence!.funding!.checkedAt).toBe('2026-10-28')
  })
})

it('finds a multi-country placement under each officially listed host country', () => {
  for (const country of [
    'Italy',
    'France',
    'United Kingdom',
    'Spain',
    'Germany',
  ]) {
    expect(
      filterOpportunities(realOpportunities, { ...emptyFilters, country }).some(
        (item) => item.id === 'embl-undergraduate-outreach',
      ),
    ).toBe(true)
  }
})
