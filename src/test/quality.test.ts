import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { realOpportunities } from '../data/realOpportunities'
import { institutionHue, monogram } from '../lib/monogram'
import { catalogueFacts } from '../lib/opportunities'

describe('Institution badges', () => {
  it.each([
    ['ETH Zurich', 'ETH'],
    ['LMU Munich', 'LMU'],
    ['EPFL', 'EPFL'],
    ['DAAD', 'DAAD'],
    ['Centre for Genomic Regulation (CRG)', 'CRG'],
    ['University of Lausanne', 'UL'],
    ['Karolinska Institutet', 'KI'],
    ['Biozentrum, University of Basel', 'BU'],
    ['Champalimaud', 'Ch'],
    ['', ''],
  ])('abbreviates %s as %s', (institution, expected) => {
    expect(monogram(institution)).toBe(expected)
  })
  it('gives every real institution a short badge and a stable blue hue', () => {
    for (const item of realOpportunities) {
      const name = item.institution.split(' · ')[0]
      expect(monogram(name)).toMatch(/^\p{Lu}[\p{L}]{1,4}$/u)
      expect(institutionHue(name)).toBe(institutionHue(name))
      expect(institutionHue(name)).toBeGreaterThanOrEqual(200)
      expect(institutionHue(name)).toBeLessThan(255)
    }
  })
})

describe('Catalogue facts', () => {
  it('counts records and distinct countries and reports the newest check', () => {
    const facts = catalogueFacts(realOpportunities)
    expect(facts.records).toBe(realOpportunities.length)
    const countries = new Set(
      realOpportunities.flatMap(
        (item) => item.countries ?? (item.country ? [item.country] : []),
      ),
    )
    expect(facts.countries).toBe(countries.size)
    expect(facts.latestCheck).toBe(
      realOpportunities
        .map((item) => item.lastVerifiedDate!)
        .sort()
        .at(-1),
    )
  })
  it('claims no check date for an empty catalogue', () => {
    expect(catalogueFacts([])).toEqual({
      records: 0,
      countries: 0,
      latestCheck: null,
    })
  })
})

describe('Security headers', () => {
  const headers = readFileSync('public/_headers', 'utf8')
  const csp = headers.match(/Content-Security-Policy: (.+)/)![1]
  it('keeps a strict content security policy with no inline or remote code', () => {
    expect(csp).toContain("default-src 'none'")
    expect(csp).toContain("script-src 'self'")
    expect(csp).toContain("style-src 'self'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("base-uri 'none'")
    expect(csp).not.toMatch(/unsafe-inline|unsafe-eval|https?:|\*|data:/)
  })
  it.each([
    'Strict-Transport-Security: max-age=',
    'X-Content-Type-Options: nosniff',
    'X-Frame-Options: DENY',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Cross-Origin-Opener-Policy: same-origin',
    'Permissions-Policy:',
  ])('sends %s', (header) => {
    expect(headers).toContain(header)
  })
})

describe('Theme tokens', () => {
  const tokens = readFileSync('src/night-theme.css', 'utf8')
  const components = [
    'src/styles.css',
    'src/motion.css',
    'src/components/radar/sweep-radar.css',
  ]
  it.each(components)('keeps hard-coded colours out of %s', (path) => {
    const css = readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
    expect(css.match(/#[0-9a-f]{3,8}\b|\brgba?\(/gi) ?? []).toEqual([])
  })
  it('defines every colour token for both light and dark', () => {
    const colourTokens = tokens.match(/--[\w-]+:\s*[^;]*#[^;]*;/g) ?? []
    expect(colourTokens.length).toBeGreaterThan(50)
    for (const token of colourTokens.filter(
      (token) => !token.startsWith('--gloss'),
    ))
      expect(token).toMatch(/light-dark\(#[0-9a-f]{6,8}, #[0-9a-f]{6,8}\)/i)
  })
  it.each(components)('only uses tokens that exist: %s', (path) => {
    const defined = new Set(tokens.match(/--[\w-]+(?=:)/g))
    const local = new Set(readFileSync(path, 'utf8').match(/--[\w-]+(?=:)/g))
    const used = new Set(
      [...readFileSync(path, 'utf8').matchAll(/var\((--[\w-]+)/g)].map(
        (match) => match[1],
      ),
    )
    expect(
      [...used].filter((name) => !defined.has(name) && !local.has(name)),
    ).toEqual([])
  })
})
