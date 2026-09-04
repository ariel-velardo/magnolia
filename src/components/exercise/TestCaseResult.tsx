import type { TestCaseOutcome } from '../../engine/testRunner'
import { ExecutionErrorView } from './ExecutionErrorView'

interface TestCaseResultProps {
  outcome: TestCaseOutcome
}

const FAILURE_LABEL: Record<string, string> = {
  stdout: 'Saída diferente da esperada',
  variable: 'Valor final diferente do esperado',
  'missing-variable': 'Variável não encontrada',
  return: 'Retorno diferente do esperado',
  error: 'Erro durante a execução deste caso',
}

/**
 * Um caso público que falhou, com entrada, esperado e recebido.
 *
 * Só casos públicos chegam aqui: um caso interno é contado no resumo, mas o seu
 * conteúdo não é exibido.
 */
export function TestCaseResult({ outcome }: TestCaseResultProps) {
  return (
    <article className="test-case" data-status={outcome.status}>
      <p className="test-case__header">
        <span className="test-case__label">{outcome.label}</span>
        {outcome.failureKind && (
          <span className="test-case__kind">{FAILURE_LABEL[outcome.failureKind]}</span>
        )}
      </p>

      {outcome.explanation && <p className="test-case__note">{outcome.explanation}</p>}

      {outcome.failureKind === 'missing-variable' && outcome.detail && (
        <p className="test-case__note">
          Nenhuma variável chamada <code>{outcome.detail}</code> existia ao final do
          programa.
        </p>
      )}

      {outcome.detail && outcome.failureKind === 'variable' && (
        <p className="test-case__note">
          Variável <code>{outcome.detail}</code>
        </p>
      )}

      {(outcome.expected !== undefined || outcome.received !== undefined) && (
        <dl className="test-case__values">
          {outcome.expected !== undefined && (
            <div>
              <dt>Esperado</dt>
              <dd>
                <pre tabIndex={0}>{outcome.expected}</pre>
              </dd>
            </div>
          )}
          {outcome.received !== undefined && (
            <div>
              <dt>Recebido</dt>
              <dd>
                <pre tabIndex={0}>{outcome.received}</pre>
              </dd>
            </div>
          )}
        </dl>
      )}

      {outcome.error && <ExecutionErrorView error={outcome.error} />}
    </article>
  )
}
