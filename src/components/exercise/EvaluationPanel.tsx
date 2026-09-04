import type { Evaluation } from '../../engine/evaluator'
import type { RunnerAction, RunnerPhase } from '../../hooks/useExerciseRunner'
import { Icon } from '../common/Icon'
import { ProgressBar } from '../progress/ProgressBar'
import { ExecutionErrorView } from './ExecutionErrorView'
import { TestCaseResult } from './TestCaseResult'

interface EvaluationPanelProps {
  phase: RunnerPhase
  action: RunnerAction
  evaluation: Evaluation | null
}

/**
 * Resultado da verificação: quantos casos passaram e o que falhou.
 *
 * Passar em todos os testes é um resultado desta tentativa, e não uma conclusão
 * registrada — a persistência de conclusão é assunto da Fase 4.
 */
export function EvaluationPanel({ phase, action, evaluation }: EvaluationPanelProps) {
  const isVerifying = phase !== 'idle' && action === 'verify'

  if (!isVerifying && !evaluation) {
    return null
  }

  return (
    <section
      className="evaluation-panel"
      aria-labelledby="evaluation-title"
      data-status={isVerifying ? 'busy' : (evaluation?.status ?? 'idle')}
    >
      <div className="execution-panel__header">
        <h3 id="evaluation-title">Verificação</h3>
        {evaluation && !isVerifying && evaluation.total > 0 && (
          <span className="execution-panel__duration">
            {evaluation.passed}/{evaluation.total}
          </span>
        )}
      </div>

      <div className="execution-panel__body" role="status" aria-live="polite">
        {isVerifying && (
          <p className="execution-panel__pending">
            <span className="execution-panel__spinner" aria-hidden="true" />
            {phase === 'verifying' ? 'Rodando os testes…' : 'Preparando Python no navegador…'}
          </p>
        )}

        {!isVerifying && evaluation && <EvaluationOutcome evaluation={evaluation} />}
      </div>
    </section>
  )
}

function EvaluationOutcome({ evaluation }: { evaluation: Evaluation }) {
  const isSuccess = evaluation.status === 'all-passed'

  return (
    <>
      <p className="evaluation-headline">
        <Icon name={isSuccess ? 'check' : 'spark'} size={18} />
        <strong>{evaluation.headline}</strong>
      </p>

      {evaluation.total > 0 && evaluation.status !== 'execution-error' && (
        <ProgressBar
          value={evaluation.passed}
          max={evaluation.total}
          label="Testes aprovados"
        />
      )}

      <p className="evaluation-summary">{evaluation.summary}</p>

      {evaluation.error && <ExecutionErrorView error={evaluation.error} />}

      {evaluation.publicFailures.length > 0 && (
        <div className="evaluation-cases">
          {evaluation.publicFailures.map((outcome) => (
            <TestCaseResult key={outcome.id} outcome={outcome} />
          ))}
        </div>
      )}

      {evaluation.internalFailureCount > 0 && (
        <p className="evaluation-internal" role="note">
          <Icon name="book" size={15} />
          <span>
            {evaluation.internalFailureCount === 1
              ? '1 teste interno ainda falhou.'
              : `${evaluation.internalFailureCount} testes internos ainda falharam.`}{' '}
            Eles cobrem entradas que não aparecem no enunciado — o conteúdo deles
            não é exibido.
          </span>
        </p>
      )}

      {evaluation.guidance && <p className="evaluation-guidance">{evaluation.guidance}</p>}

      {isSuccess && (
        <p className="evaluation-note" role="note">
          Este é o resultado desta tentativa. O registro de conclusão no seu
          progresso chega na próxima etapa.
        </p>
      )}
    </>
  )
}
