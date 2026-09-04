import type { ReactNode } from 'react'
import { AppLink } from '../components/common/AppLink'
import { Brand } from '../components/common/Brand'
import { Icon } from '../components/common/Icon'
import { tracks } from '../content/catalog'
import type { TrackId } from '../types'

interface AppLayoutProps {
  children: ReactNode
  currentPath: string
  currentTrackId?: TrackId
  pageTitle: string
}

export function AppLayout({
  children,
  currentPath,
  currentTrackId,
  pageTitle,
}: AppLayoutProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>

      <header className="site-header">
        <div className="container site-header__inner">
          <AppLink className="site-header__brand" to="/" aria-label="Magnolia — início">
            <Brand />
            <span className="site-header__tagline">
              Programming <i /> Statistics <i /> Machine Learning
            </span>
          </AppLink>

          <nav className="site-nav" aria-label="Navegação principal">
            <AppLink
              className={`site-nav__link ${currentPath === '/' ? 'is-active' : ''}`}
              to="/"
              aria-current={currentPath === '/' ? 'page' : undefined}
            >
              Visão geral
            </AppLink>
            {tracks.map((track) => {
              const trackPath = `/tracks/${track.id}`
              const isCurrentTrack = currentTrackId === track.id

              return (
                <AppLink
                  key={track.id}
                  className={`site-nav__link ${isCurrentTrack ? 'is-active' : ''}`}
                  to={trackPath}
                  aria-current={
                    currentPath === trackPath
                      ? 'page'
                      : isCurrentTrack
                        ? 'location'
                        : undefined
                  }
                >
                  {track.title}
                </AppLink>
              )
            })}
          </nav>

          <div className="site-header__status" aria-label="Status do produto">
            <Icon name="leaf" size={16} />
            <span>Base de estudo</span>
          </div>
        </div>
      </header>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {pageTitle}
      </p>

      <main
        id="main-content"
        className="main-content"
        tabIndex={-1}
        aria-label={pageTitle}
      >
        {children}
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div>
            <Brand />
            <p>Um espaço pessoal para aprender com contexto e prática.</p>
          </div>
          <p className="site-footer__note">
            Python no navegador chega na próxima etapa.
          </p>
        </div>
      </footer>
    </div>
  )
}
