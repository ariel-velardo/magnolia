import { useEffect } from 'react'
import { AppLink } from '../components/common/AppLink'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Icon } from '../components/common/Icon'
import { CodePreview } from '../components/editor/CodePreview'
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
                {exercise.examples.map((example, index) => (
                  <article className="exercise-example" key={index}>
                    <p className="exercise-example__number">Exemplo {index + 1}</p>
                    <dl>
                      <div>
                        <dt>Entrada</dt>
                        <dd><code>{example.input}</code></dd>
                      </div>
                      <div>
                        <dt>Saída esperada</dt>
                        <dd><code>{example.output}</code></dd>
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

          <aside className="exercise-workspace" aria-label="Área de código">
            <div className="workspace-intro">
              <div>
                <p className="section-number">Starter code</p>
                <h2>Seu ponto de partida</h2>
              </div>
              <span className="workspace-intro__phase">
                <span aria-hidden="true" /> Prévia da Fase 1
              </span>
            </div>
            <CodePreview
              code={exercise.starterCode}
              filename="solucao.py"
              language="Python"
            />
            <div className="workspace-message" role="note">
              <Icon name="spark" size={19} />
              <div>
                <strong>A execução ainda não está habilitada.</strong>
                <p>
                  Na próxima etapa, esta área receberá Monaco Editor, Pyodide e
                  feedback de erros — sem enviar seu código para um servidor.
                </p>
              </div>
            </div>
          </aside>
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
