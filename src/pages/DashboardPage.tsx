import { AppLink } from '../components/common/AppLink'
import { Icon } from '../components/common/Icon'
import { ProgressBar } from '../components/progress/ProgressBar'
import {
  getExercisesByTrack,
  getLessonsByTrack,
  getTopicById,
  getTrackById,
  tracks,
} from '../content/catalog'
import {
  getLearningItemPath,
  getRecommendedLearningItem,
  getTrackProgressSummary,
  hasAnyProgress,
} from '../progress/progressSelectors'
import type { ProgressState } from '../progress/progressStorage'

interface DashboardPageProps {
  progress: ProgressState
}

export function DashboardPage({ progress }: DashboardPageProps) {
  const recommendation = getRecommendedLearningItem(progress)
  const recommendationTrack = recommendation
    ? getTrackById(recommendation.item.trackId)
    : undefined
  const recommendationTopic = recommendation
    ? getTopicById(recommendation.item.topicId)
    : undefined

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero container" aria-labelledby="dashboard-title">
        <div className="dashboard-hero__content">
          <p className="eyebrow">
            <span aria-hidden="true" /> Seu espaço de prática
          </p>
          <h1 id="dashboard-title">
            Aprenda com contexto.
            <em>Avance praticando.</em>
          </h1>
          <p className="dashboard-hero__lead">
            Uma jornada pessoal para construir fundamentos sólidos em programação
            e Data Science — um conceito por vez, sem perder de vista o porquê.
          </p>

          <div className="dashboard-hero__actions">
            {recommendation ? (
              <AppLink
                className="button button--primary"
                to={getLearningItemPath(recommendation)}
              >
                {hasAnyProgress(progress) ? 'Continuar estudando' : 'Começar jornada'}
                <Icon name="arrow-right" size={18} />
              </AppLink>
            ) : (
              <AppLink className="button button--primary" to="/tracks/programming">
                Rever conteúdos
                <Icon name="arrow-right" size={18} />
              </AppLink>
            )}
            <a className="text-link" href="#trilhas">
              Explorar trilhas
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <aside className="learning-loop" aria-label="Método de aprendizado Magnolia">
          <div className="learning-loop__heading">
            <Icon name="spark" size={18} />
            <span>Ritmo de aprendizado</span>
          </div>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Entenda o conceito</strong>
                <p>Comece pelo raciocínio e pelo problema que ele resolve.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Observe um exemplo</strong>
                <p>Leia código pequeno, explicado e conectado ao contexto.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Pratique com foco</strong>
                <p>Resolva um objetivo claro antes de combinar habilidades.</p>
              </div>
            </li>
          </ol>
          <p className="learning-loop__caption">
            Conceito <span>→</span> explicação <span>→</span> prática
          </p>
        </aside>
      </section>

      <section className="continue-strip" aria-labelledby="continue-title">
        <div className="container continue-strip__inner">
          <div className="continue-strip__label">
            <span className="continue-strip__pulse" aria-hidden="true" />
            <span>{recommendation ? 'Próximo passo' : 'Percurso explorado'}</span>
          </div>
          <div className="continue-strip__content">
            <p className="continue-strip__path">
              {recommendationTrack?.title ?? 'Magnolia'}
              {recommendationTopic ? ` · ${recommendationTopic.title}` : ''}
            </p>
            <h2 id="continue-title">
              {recommendation?.item.title ?? 'Volte a qualquer conteúdo quando quiser'}
            </h2>
          </div>
          {recommendation && (
            <AppLink
              className="circle-link"
              to={getLearningItemPath(recommendation)}
              aria-label={`Abrir ${recommendation.item.title}`}
            >
              <Icon name="arrow-right" size={20} />
            </AppLink>
          )}
        </div>
      </section>

      <section className="tracks-section container" id="trilhas" aria-labelledby="tracks-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trilhas disponíveis</p>
            <h2 id="tracks-title">Escolha onde aprofundar</h2>
          </div>
          <p>
            As trilhas combinam aulas curtas e exercícios focados. Seu histórico
            registra conteúdos vistos e práticas iniciadas neste navegador.
          </p>
        </div>

        <div className="track-list">
          {tracks.map((track, index) => {
            const trackLessons = getLessonsByTrack(track.id)
            const trackExercises = getExercisesByTrack(track.id)
            const trackProgress = getTrackProgressSummary(track.id, progress)
            const firstLesson = trackLessons[0]

            return (
              <article
                className="track-card"
                data-track={track.id}
                key={track.id}
              >
                <div className="track-card__number" aria-hidden="true">
                  0{index + 1}
                </div>
                <div className="track-card__body">
                  <div className="track-card__icon" aria-hidden="true">
                    <Icon
                      name={track.id === 'programming' ? 'code' : 'chart'}
                      size={24}
                    />
                  </div>
                  <p className="track-card__kicker">
                    {track.topics.length} tópicos · {trackLessons.length} aulas
                  </p>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>

                  <div className="track-card__topics" aria-label="Tópicos da trilha">
                    {track.topics.map((topic) => (
                      <span key={topic.id}>{topic.title}</span>
                    ))}
                  </div>
                </div>
                <div className="track-card__aside">
                  <ProgressBar
                    value={trackProgress.explored}
                    max={trackProgress.total}
                    label="Conteúdo explorado"
                  />
                  <p className="track-card__progress-copy">
                    <strong>{trackProgress.explored}</strong> de {trackProgress.total}{' '}
                    conteúdos explorados
                  </p>
                  <div className="track-card__links">
                    <AppLink className="button button--secondary" to={`/tracks/${track.id}`}>
                      Ver trilha
                      <Icon name="arrow-right" size={17} />
                    </AppLink>
                    {firstLesson && (
                      <AppLink className="quiet-link" to={`/lessons/${firstLesson.id}`}>
                        Ir à primeira aula
                      </AppLink>
                    )}
                  </div>
                  <p className="track-card__count">
                    {trackExercises.length} práticas disponíveis
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
