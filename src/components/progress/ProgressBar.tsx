import type { CSSProperties } from 'react'

export interface ProgressBarProps {
  value: number
  max?: number
  label: string
  className?: string
}

type ProgressBarStyle = CSSProperties & {
  '--progress-bar-percentage': string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
}: ProgressBarProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100
  const safeValue = Number.isFinite(value)
    ? Math.min(Math.max(value, 0), safeMax)
    : 0
  const percentage = Math.round((safeValue / safeMax) * 100)
  const classes = ['progress-bar', className].filter(Boolean).join(' ')
  const progressStyle: ProgressBarStyle = {
    '--progress-bar-percentage': `${percentage}%`,
  }

  return (
    <div className={classes}>
      <div className="progress-bar__meta">
        <span className="progress-bar__label">{label}</span>
        <span className="progress-bar__value" aria-hidden="true">
          {percentage}%
        </span>
      </div>
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={safeValue}
        aria-valuetext={`${percentage}%`}
        style={progressStyle}
      >
        <span className="progress-bar__fill" aria-hidden="true" />
      </div>
    </div>
  )
}
