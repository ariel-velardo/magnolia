import { useEffect } from 'react'
import { AppLink } from '../components/common/AppLink'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Icon } from '../components/common/Icon'
import {
  getExerciseById,
  getNextLearningItem,
  getTopicById,
  getTrackById,
} from '../content/catalog'
import { getLearningItemPath } from '../progress/progressSelectors'
import { markLessonViewed } from '../progress/progressStorage'
import type { Lesson } from '../types'

interface LessonPageProps {
  lesson: Lesson
}

export function LessonPage({ lesson }: LessonPageProps) {
  const track = getTrackById(lesson.trackId)
  const topic = getTopicById(lesson.topicId)
  const relatedExercises = lesson.relatedExerciseIds
    .map(getExerciseById)
    .filter((exercise) => exercise !== undefined)
  const nextItem = getNextLearningItem(lesson.id)

  useEffect(() => {
    markLessonViewed(lesson.id)
  }, [lesson.id])

  return (
    <article className="lesson-page">
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label: track?.title ?? 'Trilha',
              to: `/tracks/${lesson.trackId}`,
            },
            { label: lesson.title },
          ]}
        />

        <div className="reading-layout">
          <aside className="reading-rail" aria-label="Resumo da aula">
            <div className="reading-rail__marker">
              <Icon name="book" size={22} />
            </div>
            <p className="reading-rail__type">Aula</p>
            <dl>
              <div>
                <dt>Tópico</dt>
                <dd>{topic?.title}</dd>
              </div>
              <div>
                <dt>Duração</dt>
                <dd>{lesson.estimatedMinutes} min</dd>
              </div>
              <div>
                <dt>Etapa</dt>
                <dd>{topic?.difficulty}</dd>
              </div>
            </dl>
            <p className="reading-rail__saved">
              <Icon name="check" size={15} />
              Aula adicionada ao percurso
            </p>
          </aside>

          <div className="reading-content">
            <header className="content-hero">
              <p className="eyebrow">
                {track?.title} · {topic?.title}
              </p>
              <h1>{lesson.title}</h1>
              <p className="content-hero__lead">{lesson.summary}</p>
            </header>

            <section className="objectives" aria-labelledby="objectives-title">
              <p className="section-number" aria-hidden="true">Antes de começar</p>
              <h2 id="objectives-title">Ao final desta aula, você será capaz de:</h2>
              <ul>
                {lesson.objectives.map((objective, index) => (
                  <li key={index}>
                    <Icon name="check" size={16} />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lesson-section" aria-labelledby="concept-title">
              <p className="section-number">01 · Conceito</p>
              <h2 id="concept-title">O que é?</h2>
              <p className="lesson-section__opening">{lesson.concept}</p>
            </section>

            <section className="lesson-section" aria-labelledby="explanation-title">
              <p className="section-number">02 · Explicação</p>
              <h2 id="explanation-title">Como funciona — e por que usar</h2>
              {lesson.explanation.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>

            <section className="lesson-section" aria-labelledby="example-title">
              <p className="section-number">03 · Exemplo</p>
              <h2 id="example-title">Veja o conceito em contexto</h2>
              <div className="lesson-examples">
                {lesson.examples.map((example, index) => (
                  <figure className="lesson-example" key={index}>
                    <figcaption>
                      <strong>{example.title}</strong>
                      <span>{example.description}</span>
                    </figcaption>
                    <pre tabIndex={0}>
                      <code>{example.code}</code>
                    </pre>
                    {example.output && (
                      <p className="lesson-example__output">
                        <span>Saída</span>
                        <code>{example.output}</code>
                      </p>
                    )}
                  </figure>
                ))}
              </div>
            </section>

            <aside className="care-note" aria-labelledby="care-title">
              <div className="care-note__icon" aria-hidden="true">!</div>
              <div>
                <p className="section-number">Cuidados</p>
                <h2 id="care-title">Erros comuns para observar</h2>
                <ul>
                  {lesson.commonMistakes.map((mistake, index) => (
                    <li key={index}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </aside>

            <section className="practice-callout" aria-labelledby="practice-title">
              <div>
                <p className="section-number">04 · Prática</p>
                <h2 id="practice-title">Agora, transforme leitura em repertório</h2>
                <p>
                  Os exercícios trabalham uma habilidade por vez. O editor ainda é
                  uma prévia nesta etapa; você poderá executar Python em breve.
                </p>
              </div>
              <div className="practice-callout__links">
                {relatedExercises.map((exercise, index) => (
                  <AppLink to={`/exercises/${exercise.id}`} key={exercise.id}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{exercise.title}</strong>
                    <Icon name="arrow-right" size={18} />
                  </AppLink>
                ))}
              </div>
            </section>

            <nav className="content-next" aria-label="Próximo conteúdo">
              <AppLink className="content-next__back" to={`/tracks/${lesson.trackId}`}>
                <Icon name="arrow-left" size={17} />
                Voltar à trilha
              </AppLink>
              {nextItem && (
                <AppLink
                  className="content-next__forward"
                  to={getLearningItemPath(nextItem)}
                >
                  <span>
                    <small>Próximo conteúdo</small>
                    <strong>{nextItem.item.title}</strong>
                  </span>
                  <Icon name="arrow-right" size={20} />
                </AppLink>
              )}
            </nav>
          </div>
        </div>
      </div>
    </article>
  )
}
