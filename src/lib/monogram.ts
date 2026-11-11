/**
 * Short decorative badge text for an institution, e.g. "ETH", "CRG" or "KI".
 * Prefers a real acronym (in brackets, or as the first word) over initials.
 */
export function monogram(institution: string): string {
  const bracketed = institution.match(/\(([A-Z]{2,5})\)/)
  if (bracketed) return bracketed[1]
  const words = institution
    .replace(/\(.*?\)/g, '')
    .split(/[\s,·-]+/)
    .filter((word) => /^\p{Lu}/u.test(word))
  if (words.length === 0) return ''
  if (/^\p{Lu}{2,5}$/u.test(words[0])) return words[0]
  if (words.length === 1) return words[0].slice(0, 2)
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
}

/** A stable blue-to-indigo hue per institution, for the badge tint. */
export function institutionHue(text: string): number {
  let total = 0
  for (const char of text) total = (total * 31 + char.charCodeAt(0)) % 997
  return 200 + (total % 55)
}
