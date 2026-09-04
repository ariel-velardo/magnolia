import { Suspense, lazy, useState } from 'react'
import type { Exercise } from '../../types'
import { usePythonRunner } from '../../hooks/usePythonRunner'
import type { RunnerPhase } from '../../hooks/usePythonRunner'
import { Icon } from '../common/Icon'
import { CodePreview } from '../editor/CodePreview'
import { ExecutionPanel } from './ExecutionPanel'

/**
 * O Monaco é pesado e só faz sentido na página de exercício, então entra por
 * import dinâmico: o Dashboard e as aulas não pagam por ele.
 */
const CodeEditor = lazy(() => import('../editor/CodeEditor'))

interface ExerciseWorkspaceProps {
  exercise: Exercise
}

const RUN_LABEL: Record<RunnerPhase, string> = {
  idle: 'Executar',
  preparing: 'Preparando Python…',
  running: 'Executando…',
}

/**
 * Área de código do exercício: editor, execução e saída.
 *
 * O código vive em estado local e não é persistido — nesta fase, executar não
 * registra progresso nem conclui o exercício. A página monta este componente
 * com `key={exercise.id}`, então trocar de exercício recarrega o starter code
 * sem precisar sincronizar estado manualmente.
 */
export function ExerciseWorkspace({ exercise }: ExerciseWorkspaceProps) {
  const [code, setCode] = useState(exercise.starterCode)
  const { phase, result, isBusy, run, clearResult } = usePythonRunner()
  const isPristine = code === exercise.starterCode

  const handleRun = () => run(code, exercise.packages)

  const handleReset = () => {
    setCode(exercise.starterCode)
    clearResult()
  }

  return (
    <aside className="exercise-workspace" aria-label="Área de código">
      <div className="workspace-intro">
        <div>
          <p className="section-number">Seu código</p>
          <h2>Escreva e execute</h2>
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
          <Suspense
            fallback={
              <CodePreview code={code} status="Carregando editor…" />
            }
          >
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
            <code>print({exercise.entryPoint}(...))</code>. Essa linha é só
            inspeção e não faz parte da solução.
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
          onClick={handleRun}
          disabled={isBusy}
        >
          {isBusy && <span className="button__spinner" aria-hidden="true" />}
          {!isBusy && <Icon name="play" size={16} />}
          {RUN_LABEL[phase]}
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

      <ExecutionPanel phase={phase} result={result} />
    </aside>
  )
}
