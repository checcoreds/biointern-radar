import { describe, it, expect } from 'vitest'
import { parseDeviceData } from '../lib/deviceStorage'
import { validCatalogueReturn } from '../lib/catalogueNavigation'

describe('Device data validation', () => {
  it('deduplicates saves and task IDs', () => {
    expect(
      parseDeviceData(
        JSON.stringify({
          version: 1,
          savedIds: ['a', 'a'],
          checklists: { a: ['source', 'source'] },
        }),
      ),
    ).toEqual({ version: 1, savedIds: ['a'], checklists: { a: ['source'] } })
  })
  it.each([
    '{}',
    '{"version":2}',
    '{"version":1,"savedIds":"a","checklists":{}}',
    '{"version":1,"savedIds":[],"checklists":{"a":[1]}}',
  ])('rejects malformed or unsupported storage: %s', (raw) => {
    expect(() => parseDeviceData(raw)).toThrow()
  })
  it.each([
    { url: 'https://example.org', scrollY: 0 },
    { url: '//evil.example', scrollY: 0 },
    { url: '/opportunities', scrollY: -1 },
    { url: '/opportunities', scrollY: Infinity },
    { url: '/opportunities/other', scrollY: 0 },
  ])('does not accept an unsafe catalogue return: %j', (value) => {
    expect(validCatalogueReturn(value)).toBe(false)
  })
})
