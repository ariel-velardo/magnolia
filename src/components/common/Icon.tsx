export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'book'
  | 'code'
  | 'chart'
  | 'clock'
  | 'check'
  | 'play'
  | 'continue'
  | 'menu'
  | 'close'
  | 'home'
  | 'spark'
  | 'leaf'

export interface IconProps {
  name: IconName
  /** Describe meaningful icons. Omit the label for decorative icons. */
  label?: string
  size?: number | string
  className?: string
}

const iconPaths: Record<IconName, React.ReactNode> = {
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11a3 3 0 0 1 3 3v15a3 3 0 0 0-3-3H4Z" />
      <path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H14v18a3 3 0 0 1 3-3h3Z" />
    </>
  ),
  code: (
    <>
      <path d="m9 7-5 5 5 5" />
      <path d="m15 7 5 5-5 5" />
      <path d="m14 4-4 16" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-4" />
      <path d="M12 16V8" />
      <path d="M16 16V6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  play: <path d="m9 7 8 5-8 5Z" fill="currentColor" stroke="none" />,
  continue: (
    <>
      <path d="m7 7 8 5-8 5Z" fill="currentColor" stroke="none" />
      <path d="M18 7v10" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  spark: (
    <>
      <path d="m12 3 1.4 4.1L17 9l-3.6 1.9L12 15l-1.4-4.1L7 9l3.6-1.9Z" />
      <path d="m18.5 15 .7 2.1L21 18l-1.8.9-.7 2.1-.7-2.1L16 18l1.8-.9Z" />
      <path d="m5.5 14 .6 1.6 1.4.9-1.4.9L5.5 19l-.6-1.6-1.4-.9 1.4-.9Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C10 4 5 9 5 15a5 5 0 0 0 5 5c6 0 10-6 10-16Z" />
      <path d="M5 21c3-5 7-8 12-11" />
    </>
  ),
}

export function Icon({
  name,
  label,
  size = 20,
  className,
}: IconProps) {
  const classes = ['icon', `icon--${name}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <svg
      className={classes}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  )
}
