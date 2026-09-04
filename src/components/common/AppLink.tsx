import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { navigate } from '../../hooks/usePathname'

export interface AppLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

function isUnmodifiedPrimaryClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.shiftKey
  )
}

function isInternalDestination(to: string): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return new URL(to, window.location.href).origin === window.location.origin
  } catch {
    return false
  }
}

export function AppLink({
  children,
  download,
  onClick,
  target,
  to,
  ...anchorProps
}: AppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      !isUnmodifiedPrimaryClick(event) ||
      (target !== undefined && target !== '_self') ||
      download !== undefined ||
      to.startsWith('#') ||
      !isInternalDestination(to)
    ) {
      return
    }

    event.preventDefault()
    navigate(to)
  }

  return (
    <a
      {...anchorProps}
      download={download}
      href={to}
      target={target}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
