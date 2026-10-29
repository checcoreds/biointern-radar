import { useCallback, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/** Keep a synchronous draft: React Router's search-param setter does not queue updates. */
export function useCatalogueQuery() {
  const location = useLocation()
  const navigate = useNavigate()
  const latest = useRef(new URLSearchParams(location.search))
  useLayoutEffect(() => {
    latest.current = new URLSearchParams(location.search)
  }, [location.search, location.key])
  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(latest.current)
      if (value) next.set(key, value)
      else next.delete(key)
      latest.current = next
      const search = next.toString()
      navigate(
        { pathname: location.pathname, search: search ? `?${search}` : '' },
        {
          replace: key === 'search',
          preventScrollReset: true,
          state: { catalogueQuery: true },
        },
      )
    },
    [location.pathname, navigate],
  )
  const reset = useCallback(() => {
    latest.current = new URLSearchParams()
    navigate(location.pathname, {
      state: { catalogueQuery: true },
      preventScrollReset: true,
    })
  }, [location.pathname, navigate])
  return { params: new URLSearchParams(location.search), update, reset }
}
