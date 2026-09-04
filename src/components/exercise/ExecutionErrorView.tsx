import type { ExecutionError } from '../../engine/pythonRunner'

interface ExecutionErrorViewProps {
  error: ExecutionError
}

/**
 * Apresentação de um erro do Python.
 *
 * Vive fora dos painéis porque o mesmo erro aparece em dois lugares: na
 * execução livre e quando a verificação nem chega a rodar os testes. Duplicar
 * essa área faria as duas divergirem com o tempo.
 */
export function ExecutionErrorView({ error }: ExecutionErrorViewProps) {
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
          <pre className="execution-output" tabIndex={0}>
            {error.traceback}
          </pre>
        </details>
      )}
    </div>
  )
}
