export interface BrandProps {
  compact?: boolean
  className?: string
}

export function Brand({ compact = false, className }: BrandProps) {
  const classes = ['brand', compact && 'brand--compact', className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} aria-label={compact ? 'Magnolia' : undefined}>
      <svg
        className="brand__mark"
        viewBox="0 0 40 40"
        role="presentation"
        aria-hidden="true"
        focusable="false"
      >
        <g className="brand__petals" fill="currentColor">
          <path d="M20 20c-4.5-3.8-5.1-9.2-1.4-13.7a1.8 1.8 0 0 1 2.8 0C25.1 10.8 24.5 16.2 20 20Z" />
          <path
            d="M20 20c-4.5-3.8-5.1-9.2-1.4-13.7a1.8 1.8 0 0 1 2.8 0C25.1 10.8 24.5 16.2 20 20Z"
            transform="rotate(72 20 20)"
          />
          <path
            d="M20 20c-4.5-3.8-5.1-9.2-1.4-13.7a1.8 1.8 0 0 1 2.8 0C25.1 10.8 24.5 16.2 20 20Z"
            transform="rotate(144 20 20)"
          />
          <path
            d="M20 20c-4.5-3.8-5.1-9.2-1.4-13.7a1.8 1.8 0 0 1 2.8 0C25.1 10.8 24.5 16.2 20 20Z"
            transform="rotate(216 20 20)"
          />
          <path
            d="M20 20c-4.5-3.8-5.1-9.2-1.4-13.7a1.8 1.8 0 0 1 2.8 0C25.1 10.8 24.5 16.2 20 20Z"
            transform="rotate(288 20 20)"
          />
        </g>
        <circle className="brand__center" cx="20" cy="20" r="3.2" />
      </svg>
      {!compact && <span className="brand__wordmark">Magnolia</span>}
    </span>
  )
}
