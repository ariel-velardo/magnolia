import { useEffect, useState } from 'react'

export function normalizePathname(pathname: string): string {
  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`
  const withoutDuplicateSlashes = withLeadingSlash.replace(/\/{2,}/g, '/')

  if (withoutDuplicateSlashes === '/') {
    return '/'
  }

  return withoutDuplicateSlashes.replace(/\/+$/, '') || '/'
}

function getCurrentPathname(): string {
  if (typeof window === 'undefined') {
    return '/'
  }

  return normalizePathname(window.location.pathname)
}

export function navigate(to: string): void {
  if (typeof window === 'undefined') {
    return
  }

  const destination = new URL(to, window.location.href)

  if (destination.origin !== window.location.origin) {
    window.location.assign(destination.href)
    return
  }

  const href = `${normalizePathname(destination.pathname)}${destination.search}${destination.hash}`
  const currentHref = `${normalizePathname(window.location.pathname)}${window.location.search}${window.location.hash}`

  if (href === currentHref) {
    window.scrollTo({ top: 0, left: 0 })
    return
  }

  window.history.pushState(null, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, left: 0 })
}

export function usePathname(): string {
  const [pathname, setPathname] = useState(getCurrentPathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(getCurrentPathname())
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return pathname
}
