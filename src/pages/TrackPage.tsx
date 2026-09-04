import { AppLink } from '../components/common/AppLink'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Icon } from '../components/common/Icon'
import { ProgressBar } from '../components/progress/ProgressBar'
import {
  getExercisesByTopic,
  getLearningItemsByTrack,
  getLessonsByTopic,
} from '../content/catalog'
import {
  getLearningItemPath,
  getTrackProgressSummary,
  isExerciseStarted,
  isLearningItemExplored,
  isLessonViewed,
} from '../progress/progressSelectors'
import type { ProgressState } from '../progress/progressStorage'
import type { Track } from '../types'

interface TrackPageProps {
  track: Track
  progress: ProgressState
}

export function TrackPage({ track, progress }: TrackPageProps) {
  const trackProgress = getTrackProgressSummary(track.id, progress)
  const learningItems = getLearningItemsByTrack(track.id)
  const nextItem =
    learningItems.find((item) => !isLearningItemExplored(item, progress)) ??
    learningItems[0]
  const totalMinutes = track.topics.reduce(
    (total, topic) => total + topic.estimatedMinutes,
    0,
  )

  return (
    <div className="track-page" data-track={track.id}>
      <div className="container">
        <Breadcrumbs items={[{ label: track.title }]} />

        <header className="track-hero">
          <div className="track-hero__main">
            <div className="track-hero__icon" aria-hidden="true">
              <Icon
                name={track.id === 'programming' ? 'code' : 'chart'}
                size={30}
              />
            </div>
            <p className="eyebrow">Trilha {String(track.order).padStart(2, '0')}</p>
            <h1>{track.title}</h1>
            <p className="track-hero__description">{track.description}</p>

            {nextItem && (
              <AppLink
                className="button button--primary"
                to={getLearningItemPath(nextItem)}
              >
                {isLearningItemExplored(nextItem, progress)
                  ? 'Rever do início'
                  : 'Continuar trilha'}
                <Icon name="arrow-right" size={18} />
              </AppLink>
            )}
          </div>

          <aside className="track-hero__summary" aria-label="Resumo da trilha">
            <div className="track-hero__stats">
              <div>
                <strong>{track.topics.length}</strong>
                <span>tópicos</span>
              </div>
              <div>
                <strong>{learningItems.length}</strong>
                <span>conteúdos</span>
              </div>
              <div>
                <strong>{totalMinutes}</strong>
                <span>minutos</span>
              </div>
            </div>
            <ProgressBar
              value={trackProgress.explored}
              max={trackProgress.total}
              label="Exploração da trilha"
            />
            <p>
              {trackProgress.explored === 0
                ? 'Você ainda não explorou conteúdos desta trilha.'
                : `${trackProgress.explored} de ${trackProgress.total} conteúdos já explorados.`}
            </p>
          </aside>
        </header>

        <section className="curriculum" aria-labelledby="curriculum-title">
          <div className="section-heading section-heading--compact">
            <div>
              <p className="eyebrow">Percurso atual</p>
              <h2 id="curriculum-title">Do conceito à prática</h2>
            </div>
            <p>
              Siga a ordem sugerida ou abra diretamente o conteúdo que deseja
              revisar.
            </p>
          </div>

          <ol className="topic-list">
            {track.topics.map((topic, topicIndex) => {
              const topicLessons = getLessonsByTopic(topic.id)
              const topicExercises = getExercisesByTopic(topic.id)

              return (
                <li className="topic-block" key={topic.id}>
                  <div className="topic-block__marker" aria-hidden="true">
                    <span>{String(topicIndex + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="topic-block__content">
                    <header className="topic-block__header">
                      <div>
                        <div className="topic-block__meta">
                          <span>{topic.difficulty}</span>
                          <span>
                            <Icon name="clock" size={14} />
                            {topic.estimatedMinutes} min
                          </span>
                        </div>
                        <h3>{topic.title}</h3>
                        <p>{topic.description}</p>
                      </div>
                      <span className="topic-block__total">
                        {topicLessons.length + topicExercises.length} conteúdos
                      </span>
                    </header>

                    <div className="content-rows">
                      {topicLessons.map((lesson) => {
                        const viewed = isLessonViewed(lesson.id, progress)

                        return (
                          <AppLink
                            className="content-row"
                            to={`/lessons/${lesson.id}`}
                            key={lesson.id}
                          >
                            <span className="content-row__icon" aria-hidden="true">
                              <Icon name={viewed ? 'check' : 'book'} size={19} />
                            </span>
                            <span className="content-row__copy">
                              <span className="content-row__type">Aula</span>
                              <strong>{lesson.title}</strong>
                              <span>{lesson.summary}</span>
                            </span>
                            <span className={`status-label ${viewed ? 'is-done' : ''}`}>
                              {viewed ? 'Vista' : `${lesson.estimatedMinutes} min`}
                            </span>
                            <Icon name="arrow-right" size={18} />
                          </AppLink>
                        )
                      })}

                      {topicExercises.map((exercise) => {
                        const started = isExerciseStarted(exercise.id, progress)

                        return (
                          <AppLink
                            className="content-row content-row--exercise"
                            to={`/exercises/${exercise.id}`}
                            key={exercise.id}
                          >
                            <span className="content-row__icon" aria-hidden="true">
                              <Icon name={started ? 'continue' : 'code'} size={19} />
                            </span>
                            <span className="content-row__copy">
                              <span className="content-row__type">Prática</span>
                              <strong>{exercise.title}</strong>
                              <span>{exercise.skill}</span>
                            </span>
                            <span className={`status-label ${started ? 'is-started' : ''}`}>
                              {started ? 'Iniciada' : exercise.difficulty}
                            </span>
                            <Icon name="arrow-right" size={18} />
                          </AppLink>
                        )
                      })}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </section>
      </div>
    </div>
  )
}
