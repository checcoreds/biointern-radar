export interface CatalogueReturn {
  url: string
  scrollY: number
}
const KEY = 'biointern-radar:catalogue-return:v1'

export function validCatalogueReturn(value: unknown): value is CatalogueReturn {
  if (
    !value ||
    typeof value !== 'object' ||
    !('url' in value) ||
    typeof value.url !== 'string' ||
    !('scrollY' in value) ||
    typeof value.scrollY !== 'number' ||
    !Number.isFinite(value.scrollY) ||
    value.scrollY < 0
  )
    return false
  return /^\/(opportunities|saved)(\?[^#]*)?$/.test(value.url)
}
export function rememberCatalogue(value: CatalogueReturn) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    /* Router state remains the fallback. */
  }
}
export function getCatalogueReturn(state: unknown): CatalogueReturn | null {
  if (validCatalogueReturn(state)) return state
  return null
}
export function readRememberedCatalogue(): CatalogueReturn | null {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(KEY) ?? 'null')
    return validCatalogueReturn(value) ? value : null
  } catch {
    return null
  }
}
