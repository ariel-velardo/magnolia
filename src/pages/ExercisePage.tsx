import { useEffect } from 'react'
import { AppLink } from '../components/common/AppLink'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Icon } from '../components/common/Icon'
import { ExerciseWorkspace } from '../components/exercise/ExerciseWorkspace'
import { getPublicExamples } from '../engine/testRunner'
import {
  getNextLearningItem,
  getTopicById,
  getTrackById,
} from '../content/catalog'
import { getLearningItemPath } from '../progress/progressSelectors'
import { markExerciseStarted } from '../progress/progressStorage'
import type { Exercise } from '../types'

interface ExercisePageProps {
  exercise: Exercise
}

export function ExercisePage({ exercise }: ExercisePageProps) {
  const track = getTrackById(exercise.trackId)
  const topic = getTopicById(exercise.topicId)
  const nextItem = getNextLearningItem(exercise.id)
  // Os exemplos são a leitura dos casos públicos: o aluno vê exatamente o que
  // a verificação vai cobrar, sem uma segunda fonte de verdade para divergir.
  const examples = getPublicExamples(exercise)

  useEffect(() => {
    markExerciseStarted(exercise.id)
  }, [exercise.id])

  return (
    <article className="exercise-page">
      <div className="container">
        <Breadcrumbs
          items={[
            {
              label: track?.title ?? 'Trilha',
              to: `/tracks/${exercise.trackId}`,
            },
            { label: exercise.title },
          ]}
        />

        <header className="exercise-hero">
          <div className="exercise-hero__copy">
            <p className="eyebrow">Prática guiada · {topic?.title}</p>
            <h1>{exercise.title}</h1>
            <p>{exercise.description}</p>
          </div>
          <dl className="exercise-meta">
            <div>
              <dt>Dificuldade</dt>
              <dd>{exercise.difficulty}</dd>
            </div>
            <div>
              <dt>Tempo estimado</dt>
              <dd>
                <Icon name="clock" size={15} /> {exercise.estimatedMinutes} min
              </dd>
            </div>
            <div>
              <dt>Habilidade</dt>
              <dd>{exercise.skill}</dd>
            </div>
            <div>
              <dt>Formato</dt>
              <dd>
                {exercise.executionMode === 'function' ? (
                  <>
                    Função <code>{exercise.entryPoint}</code>
                  </>
                ) : (
                  'Script'
                )}
              </dd>
            </div>
          </dl>
        </header>

        <div className="exercise-layout">
          <div className="exercise-brief">
            <section aria-labelledby="instructions-title">
              <p className="section-number">Objetivo</p>
              <h2 id="instructions-title">O que você precisa construir</h2>
              <ol className="instruction-list">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="exercise-examples" aria-labelledby="examples-title">
              <p className="section-number">Exemplos</p>
              <h2 id="examples-title">Confira o contrato esperado</h2>
              <div className="example-grid">
                {examples.map((example, index) => (
                  <article className="exercise-example" key={example.id}>
                    <p className="exercise-example__number">Exemplo {index + 1}</p>
                    <dl>
                      {/* Em função, a entrada é a chamada; em script, o estado
                          inicial do caso — que só existe onde o exercício varia
                          a entrada. */}
                      {example.call !== undefined && (
                        <div>
                          <dt>Chamada</dt>
                          <dd><code>{example.call}</code></dd>
                        </div>
                      )}
                      {example.given !== undefined && (
                        <div>
                          <dt>Valores iniciais</dt>
                          <dd><code>{example.given}</code></dd>
                        </div>
                      )}
                      <div>
                        <dt>
                          {example.call === undefined ? 'Saída esperada' : 'Retorno esperado'}
                        </dt>
                        <dd><code>{example.expected}</code></dd>
                      </div>
                    </dl>
                    {example.explanation && <p>{example.explanation}</p>}
                  </article>
                ))}
              </div>
            </section>

            <section className="hints" aria-labelledby="hints-title">
              <div>
                <p className="section-number">Se precisar</p>
                <h2 id="hints-title">Dicas progressivas</h2>
              </div>
              <p className="hints__intro">
                Abra uma dica por vez. Tente novamente antes de consultar a próxima.
              </p>
              <div className="hints__list">
                {exercise.hints.map((hint) => (
                  <details key={hint.id}>
                    <summary>
                      <span>Dica {hint.order}</span>
                      <Icon name="arrow-right" size={17} />
                    </summary>
                    <p>{hint.text}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <ExerciseWorkspace key={exercise.id} exercise={exercise} />
        </div>

        <nav className="content-next exercise-next" aria-label="Navegação do exercício">
          <AppLink className="content-next__back" to={`/tracks/${exercise.trackId}`}>
            <Icon name="arrow-left" size={17} />
            Voltar à trilha
          </AppLink>
          {nextItem ? (
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
          ) : (
            <AppLink className="content-next__forward" to={`/tracks/${exercise.trackId}`}>
              <span>
                <small>Fim do percurso atual</small>
                <strong>Rever a trilha</strong>
              </span>
              <Icon name="arrow-right" size={20} />
            </AppLink>
          )}
        </nav>
      </div>
    </article>
  )
}
