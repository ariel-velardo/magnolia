import { Suspense, lazy, useState } from 'react'
import {
  countTests,
  describeInitialVariables,
  getRunInitialVariables,
} from '../../engine/testRunner'
import { useExerciseRunner } from '../../hooks/useExerciseRunner'
import type { Exercise } from '../../types'
import { Icon } from '../common/Icon'
import { CodePreview } from '../editor/CodePreview'
import { EvaluationPanel } from './EvaluationPanel'
import { ExecutionPanel } from './ExecutionPanel'

/**
 * O Monaco é pesado e só faz sentido na página de exercício, então entra por
 * import dinâmico: o Dashboard e as aulas não pagam por ele.
 */
const CodeEditor = lazy(() => import('../editor/CodeEditor'))

interface ExerciseWorkspaceProps {
  exercise: Exercise
}

/**
 * Área de código do exercício: editor, as duas ações e seus resultados.
 *
 * Executar e verificar respondem perguntas diferentes. Executar é exploração
 * livre — ver um print, achar um SyntaxError, depurar. Verificar roda os casos
 * de teste e avalia a solução. Executar sem erro não significa exercício
 * correto, e a interface mantém essa distinção explícita.
 *
 * O código vive em estado local e não é persistido. A página monta este
 * componente com `key={exercise.id}`, então trocar de exercício recarrega o
 * starter code sem precisar sincronizar estado manualmente.
 */
export function ExerciseWorkspace({ exercise }: ExerciseWorkspaceProps) {
  const [code, setCode] = useState(exercise.starterCode)
  const { phase, action, isBusy, executionResult, evaluation, run, verify, clear } =
    useExerciseRunner(exercise)
  const isPristine = code === exercise.starterCode
  const { total, internalCount } = countTests(exercise)
  // Exercícios de script com entrada injetada: o aluno precisa saber que as
  // variáveis já existem e que a verificação repete o script com outros valores.
  const runInput = getRunInitialVariables(exercise)

  const handleReset = () => {
    setCode(exercise.starterCode)
    clear()
  }

  const runLabel = action === 'run' && isBusy ? 'Executando…' : 'Executar'
  const verifyLabel = action === 'verify' && isBusy ? 'Verificando…' : 'Verificar solução'

  return (
    <aside className="exercise-workspace" aria-label="Área de código">
      <div className="workspace-intro">
        <div>
          <p className="section-number">Seu código</p>
          <h2>Escreva, execute, verifique</h2>
        </div>
        {exercise.packages.length > 0 && (
          <span className="workspace-intro__packages">
            <span aria-hidden="true" />
            {exercise.packages.join(' · ')}
          </span>
        )}
      </div>

      <div className="code-editor">
        <div className="code-editor__header">
          <span className="code-editor__filename">solucao.py</span>
          <span className="code-editor__language">Python</span>
        </div>
        <div className="code-editor__surface">
          <Suspense fallback={<CodePreview code={code} status="Carregando editor…" />}>
            <CodeEditor
              value={code}
              onChange={setCode}
              label={`Editor Python do exercício ${exercise.title}`}
              readOnly={isBusy}
            />
          </Suspense>
        </div>
      </div>

      {exercise.executionMode === 'function' && (
        <p className="workspace-note" role="note">
          <Icon name="spark" size={16} />
          <span>
            Este exercício pede uma função. Dentro de{' '}
            <code>{exercise.entryPoint}</code>, devolva o resultado com{' '}
            <code>return</code> — não use <code>print</code> ali. Para conferir o
            retorno enquanto resolve, chame a função <em>fora</em> dela, como em{' '}
            <code>print({exercise.entryPoint}(...))</code>. A verificação chama a
            função sozinha, então essa linha é só inspeção.
          </span>
        </p>
      )}

      {runInput && (
        <p className="workspace-note" role="note">
          <Icon name="spark" size={16} />
          <span>
            As variáveis <code>{describeInitialVariables(runInput)}</code> já
            existem quando seu código começa a rodar — não as crie no editor.{' '}
            <strong>Executar</strong> usa esses valores; <strong>Verificar</strong>{' '}
            repete o mesmo código com outras entradas, então a solução precisa
            valer para todas elas.
          </span>
        </p>
      )}

      <p className="code-editor__hint">
        O código roda no seu navegador e não é enviado a nenhum servidor. Dentro
        do editor, <kbd>Tab</kbd> indenta; para sair dele pelo teclado, use{' '}
        <kbd>Ctrl</kbd> + <kbd>M</kbd> e depois <kbd>Tab</kbd>.
      </p>

      <div className="workspace-actions">
        <button
          type="button"
          className="button button--primary"
          onClick={() => verify(code)}
          disabled={isBusy}
        >
          {action === 'verify' && isBusy ? (
            <span className="button__spinner" aria-hidden="true" />
          ) : (
            <Icon name="check" size={16} />
          )}
          {verifyLabel}
        </button>

        <button
          type="button"
          className="button button--secondary"
          onClick={() => run(code)}
          disabled={isBusy}
        >
          {action === 'run' && isBusy ? (
            <span className="button__spinner" aria-hidden="true" />
          ) : (
            <Icon name="play" size={16} />
          )}
          {runLabel}
        </button>

        <button
          type="button"
          className="quiet-link"
          onClick={handleReset}
          disabled={isBusy || isPristine}
        >
          Restaurar starter code
        </button>
      </div>

      <p className="workspace-actions__hint">
        <strong>Verificar solução</strong> roda {total}{' '}
        {total === 1 ? 'caso de teste' : 'casos de teste'}
        {internalCount > 0 &&
          `, ${internalCount === 1 ? 'sendo 1 interno' : `sendo ${internalCount} internos`}`}
        . <strong>Executar</strong> apenas roda seu código e mostra a saída.
      </p>

      <ExecutionPanel phase={phase} action={action} result={executionResult} />
      <EvaluationPanel phase={phase} action={action} evaluation={evaluation} />
    </aside>
  )
}
