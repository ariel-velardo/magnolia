import { hasVisibleOutput } from '../../engine/pythonRunner'
import type { ExecutionResult } from '../../engine/pythonRunner'
import type { RunnerAction, RunnerPhase } from '../../hooks/useExerciseRunner'
import { Icon } from '../common/Icon'
import { ExecutionErrorView } from './ExecutionErrorView'

interface ExecutionPanelProps {
  phase: RunnerPhase
  action: RunnerAction
  result: ExecutionResult | null
}

const PHASE_MESSAGE: Record<Exclude<RunnerPhase, 'idle'>, string> = {
  preparing: 'Preparando Python no navegador…',
  running: 'Executando seu código…',
  verifying: 'Executando seu código…',
}

/**
 * Saída da execução livre — o que o programa imprimiu e o erro, se houve.
 *
 * Este painel responde "o que meu código fez?". Quem responde "minha solução
 * está certa?" é o EvaluationPanel; misturar as duas respostas apagaria a
 * distinção entre executar e verificar.
 */
export function ExecutionPanel({ phase, action, result }: ExecutionPanelProps) {
  const isRunning = phase !== 'idle' && action === 'run'

  if (!isRunning && !result) {
    return null
  }

  return (
    <section
      className="execution-panel"
      aria-labelledby="execution-title"
      data-state={isRunning ? 'busy' : (result?.outcome ?? 'idle')}
    >
      <div className="execution-panel__header">
        <h3 id="execution-title">Saída da execução</h3>
        {result && !isRunning && (
          <span className="execution-panel__duration">{result.durationMs} ms</span>
        )}
      </div>

      <div className="execution-panel__body" role="status" aria-live="polite">
        {isRunning && (
          <p className="execution-panel__pending">
            <span className="execution-panel__spinner" aria-hidden="true" />
            {PHASE_MESSAGE[phase]}
          </p>
        )}

        {!isRunning && result && <ExecutionOutcome result={result} />}
      </div>
    </section>
  )
}

function ExecutionOutcome({ result }: { result: ExecutionResult }) {
  const showStdout = hasVisibleOutput(result.stdout)
  const showStderr = hasVisibleOutput(result.stderr)

  return (
    <>
      {showStdout && (
        <pre className="execution-output" tabIndex={0}>
          {result.stdout}
        </pre>
      )}

      {showStderr && (
        <div className="execution-stream">
          <p className="execution-stream__label">stderr</p>
          <pre className="execution-output" tabIndex={0}>
            {result.stderr}
          </pre>
        </div>
      )}

      {result.outcome === 'success' && !showStdout && !showStderr && (
        <p className="execution-panel__empty">
          <Icon name="check" size={16} />
          <span>
            Código executado sem saída. Use <code>print()</code> para ver
            resultados — executar sem erro não significa que a solução está
            correta.
          </span>
        </p>
      )}

      {result.error && <ExecutionErrorView error={result.error} />}
    </>
  )
}
