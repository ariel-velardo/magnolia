import { AppLink } from './AppLink'
import { Icon } from './Icon'

export interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: readonly BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Caminho da página">
      <ol>
        <li>
          <AppLink to="/" aria-label="Ir para o Dashboard">
            <Icon name="home" size={16} />
            <span className="sr-only">Dashboard</span>
          </AppLink>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`}>
              <span className="breadcrumbs__separator" aria-hidden="true">
                /
              </span>
              {item.to && !isLast ? (
                <AppLink to={item.to}>{item.label}</AppLink>
              ) : (
                <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
