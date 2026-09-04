import { hasVisibleOutput } from '../../engine/pythonRunner'
import type { ExecutionResult } from '../../engine/pythonRunner'
import type { RunnerPhase } from '../../hooks/usePythonRunner'
import { Icon } from '../common/Icon'

interface ExecutionPanelProps {
  phase: RunnerPhase
  result: ExecutionResult | null
}

const PHASE_MESSAGE: Record<Exclude<RunnerPhase, 'idle'>, string> = {
  preparing: 'Preparando Python no navegador…',
  running: 'Executando seu código…',
}

/**
 * Apresentação do resultado da execução. Não interpreta correção: nesta fase o
 * Magnolia mostra o que o Python respondeu, e nada além disso.
 */
export function ExecutionPanel({ phase, result }: ExecutionPanelProps) {
  const isBusy = phase !== 'idle'

  return (
    <section
      className="execution-panel"
      aria-labelledby="execution-title"
      data-state={isBusy ? 'busy' : (result?.outcome ?? 'idle')}
    >
      <div className="execution-panel__header">
        <h3 id="execution-title">Saída</h3>
        {result && !isBusy && (
          <span className="execution-panel__duration">{result.durationMs} ms</span>
        )}
      </div>

      <div className="execution-panel__body" role="status" aria-live="polite">
        {isBusy && (
          <p className="execution-panel__pending">
            <span className="execution-panel__spinner" aria-hidden="true" />
            {PHASE_MESSAGE[phase]}
          </p>
        )}

        {!isBusy && !result && (
          <p className="execution-panel__idle">
            Escreva sua solução e execute para ver a saída aqui. A primeira
            execução baixa o Python para o navegador e leva alguns segundos.
          </p>
        )}

        {!isBusy && result && <ExecutionOutcome result={result} />}
      </div>
    </section>
  )
}

function ExecutionOutcome({ result }: { result: ExecutionResult }) {
  const showStdout = hasVisibleOutput(result.stdout)
  const showStderr = hasVisibleOutput(result.stderr)

  return (
    <>
      {showStdout && <pre className="execution-output" tabIndex={0}>{result.stdout}</pre>}

      {showStderr && (
        <div className="execution-stream">
          <p className="execution-stream__label">stderr</p>
          <pre className="execution-output" tabIndex={0}>{result.stderr}</pre>
        </div>
      )}

      {result.outcome === 'success' && !showStdout && !showStderr && (
        <p className="execution-panel__empty">
          <Icon name="check" size={16} />
          <span>
            Código executado sem saída. Use <code>print()</code> para ver
            resultados — isso não significa que a solução está correta.
          </span>
        </p>
      )}

      {result.error && <ExecutionErrorView error={result.error} />}
    </>
  )
}

function ExecutionErrorView({ error }: { error: NonNullable<ExecutionResult['error']> }) {
  return (
    <div className="execution-error" data-kind={error.kind}>
      <p className="execution-error__headline">
        <span className="execution-error__type">{error.type}</span>
        {error.line !== undefined && (
          <span className="execution-error__line">linha {error.line}</span>
        )}
      </p>

      {error.message && <p className="execution-error__message">{error.message}</p>}

      {error.traceback && (
        <details className="execution-error__details">
          <summary>Ver traceback do Python</summary>
          <pre className="execution-output" tabIndex={0}>{error.traceback}</pre>
        </details>
      )}
    </div>
  )
}
