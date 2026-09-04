import type { Exercise } from '../../types'
import type { ExecutionError } from '../pythonRunner'
import type { FailureKind, TestCaseOutcome, TestRunResult } from '../testRunner'

/**
 * Interpretação pedagógica de um resultado de testes.
 *
 * O evaluator não executa Python e não renderiza nada: ele recebe o que o test
 * runner apurou e decide o que vale dizer ao aluno. A regra que organiza tudo é
 * que o feedback aponta o comportamento observado, nunca a solução.
 */

export type EvaluationStatus =
  | 'all-passed'
  | 'some-failed'
  | 'execution-error'
  | 'missing-entry-point'

export interface Evaluation {
  readonly status: EvaluationStatus
  /** Frase principal: "3 de 4 testes passaram". */
  readonly headline: string
  /** Uma frase de contexto sobre o que aconteceu. */
  readonly summary: string
  readonly passed: number
  readonly total: number
  /** Casos públicos que falharam, com esperado e recebido. */
  readonly publicFailures: readonly TestCaseOutcome[]
  /** Casos internos que falharam: contam, mas não revelam o conteúdo. */
  readonly internalFailureCount: number
  /** Direcionamento sobre onde olhar, sem abrir a resposta. */
  readonly guidance?: string
  readonly error?: ExecutionError
}

function pluralizeTests(count: number): string {
  return count === 1 ? '1 teste' : `${count} testes`
}

/**
 * A orientação nasce do tipo de divergência observada, e não do enunciado: ela
 * diz onde olhar, e nunca o que escrever.
 */
function buildGuidance(
  failures: readonly TestCaseOutcome[],
  onlyInternalFailed: boolean,
): string | undefined {
  if (failures.length === 0) {
    return undefined
  }

  if (onlyInternalFailed) {
    return 'Os casos que você vê já passam. O que falta aparece em entradas diferentes das do enunciado — revise os casos de limite.'
  }

  const kinds = new Set<FailureKind>(
    failures
      .map((failure) => failure.failureKind)
      .filter((kind): kind is FailureKind => kind !== undefined),
  )

  if (kinds.has('error')) {
    return 'Seu código levantou um erro em pelo menos uma das entradas. Abra o caso que falhou para ver qual foi.'
  }

  if (kinds.has('missing-variable')) {
    return 'O programa rodou, mas uma variável esperada não existia ao final. Confira o nome usado.'
  }

  if (kinds.has('stdout')) {
    return 'A saída não bate caractere a caractere. Confira espaços, acentos e pontuação do texto exibido.'
  }

  if (kinds.has('variable')) {
    return 'O programa rodou até o fim, mas terminou com um valor diferente do esperado. Revise o cálculo, e não apenas o que é exibido.'
  }

  return 'A função executou, mas devolveu um valor diferente do esperado. Confira a lógica antes de conferir a sintaxe.'
}

function describeExecutionError(error: ExecutionError | undefined): string {
  if (!error) {
    return 'O código não pôde ser executado.'
  }

  if (error.kind === 'timeout') {
    return 'A verificação foi interrompida por tempo limite. Verifique se há um laço que nunca termina.'
  }

  if (error.type === 'SyntaxError' || error.type === 'IndentationError') {
    return 'O Python não conseguiu ler seu código. Corrija o erro de sintaxe antes de verificar de novo.'
  }

  if (error.kind === 'python') {
    return 'Seu código levantou um erro assim que começou a rodar, antes de qualquer teste.'
  }

  return 'O ambiente de execução falhou antes de rodar os testes.'
}

export function evaluate(result: TestRunResult, exercise: Exercise): Evaluation {
  if (result.status === 'execution-error') {
    return {
      status: 'execution-error',
      headline: 'Nenhum teste chegou a rodar',
      summary: describeExecutionError(result.error),
      passed: 0,
      total: result.total,
      publicFailures: [],
      internalFailureCount: 0,
      guidance:
        'Use Executar para localizar o problema: ele mostra o erro do Python com a linha.',
      error: result.error,
    }
  }

  if (result.status === 'missing-entry-point') {
    const entryPoint =
      result.entryPoint ??
      (exercise.executionMode === 'function' ? exercise.entryPoint : 'a função pedida')

    return {
      status: 'missing-entry-point',
      headline: 'Função não encontrada',
      summary: `O código rodou, mas nenhuma função chamada ${entryPoint} foi definida.`,
      passed: 0,
      total: result.total,
      publicFailures: [],
      internalFailureCount: 0,
      guidance:
        'Confira o nome na linha do def: ele precisa ser exatamente o pedido pelo exercício.',
    }
  }

  const failures = result.cases.filter((testCase) => testCase.status === 'failed')
  const publicFailures = failures.filter((testCase) => testCase.visibility === 'public')
  const internalFailureCount = failures.length - publicFailures.length

  if (failures.length === 0) {
    return {
      status: 'all-passed',
      headline:
        result.total === 1 ? 'O teste passou' : `Todos os ${result.total} testes passaram`,
      summary:
        'Sua solução atende a todos os casos verificados, incluindo os que não aparecem no enunciado.',
      passed: result.passed,
      total: result.total,
      publicFailures: [],
      internalFailureCount: 0,
    }
  }

  return {
    status: 'some-failed',
    headline: `${result.passed} de ${pluralizeTests(result.total)} ${result.passed === 1 ? 'passou' : 'passaram'}`,
    summary:
      internalFailureCount > 0 && publicFailures.length === 0
        ? `${pluralizeTests(internalFailureCount)} ${internalFailureCount === 1 ? 'interno ainda falhou' : 'internos ainda falharam'}.`
        : `${pluralizeTests(failures.length)} ${failures.length === 1 ? 'ainda falhou' : 'ainda falharam'}.`,
    passed: result.passed,
    total: result.total,
    publicFailures,
    internalFailureCount,
    guidance: buildGuidance(failures, publicFailures.length === 0),
  }
}
