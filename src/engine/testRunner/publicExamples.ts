import type { Exercise, InitialVariables } from '../../types'
import { normalizeStdout } from './comparison'
import {
  describeFunctionCall,
  describeInitialVariables,
  describeTestValue,
} from './pythonValue'

/**
 * Exemplos exibidos ao aluno, derivados dos casos de teste públicos.
 *
 * Antes existiam duas fontes: um campo `examples` só para exibição e, ao lado,
 * os casos avaliados. Isso permitia que o exemplo dissesse uma coisa e o teste
 * cobrasse outra. Agora o exemplo é a leitura de um caso público — o aluno vê
 * exatamente o que será verificado.
 */
export interface PublicExample {
  readonly id: string
  /** Chamada da função; ausente em exercício de script. */
  readonly call?: string
  /**
   * Estado inicial do caso de script, quando ele declara um. É a entrada do
   * exercício: sem exibi-la, o aluno não teria como saber que a mesma solução
   * será cobrada com outros valores.
   */
  readonly given?: string
  /** Retorno esperado, ou saída esperada do programa. */
  readonly expected: string
  readonly explanation?: string
}

export function getPublicExamples(exercise: Exercise): readonly PublicExample[] {
  if (exercise.executionMode === 'function') {
    return exercise.tests
      .filter((testCase) => testCase.visibility === 'public')
      .map((testCase) => ({
        id: testCase.id,
        call: describeFunctionCall(exercise.entryPoint, testCase.args),
        expected: describeTestValue(testCase.expected, testCase.tolerance !== undefined),
        explanation: testCase.explanation,
      }))
  }

  return exercise.tests
    .filter(
      (testCase) => testCase.visibility === 'public' && testCase.expectedStdout !== undefined,
    )
    .map((testCase) => ({
      id: testCase.id,
      given: testCase.initialVariables
        ? describeInitialVariables(testCase.initialVariables)
        : undefined,
      expected: normalizeStdout(testCase.expectedStdout ?? ''),
      explanation: testCase.explanation,
    }))
}

/**
 * Estado inicial que a execução livre usa.
 *
 * O botão Executar não roda os casos, mas o código do aluno precisa encontrar
 * as mesmas variáveis de entrada — senão explorar a solução levantaria
 * `NameError` justamente nos exercícios em que a entrada é injetada. O primeiro
 * caso é o que o enunciado mostra como Exemplo 1, então é o ponto de partida
 * menos surpreendente.
 */
export function getRunInitialVariables(exercise: Exercise): InitialVariables | undefined {
  if (exercise.executionMode === 'function') {
    return undefined
  }

  return exercise.tests.find((testCase) => testCase.initialVariables)?.initialVariables
}

/** Quantos casos o aluno enfrentará, para a interface anunciar antes de rodar. */
export function countTests(exercise: Exercise): {
  total: number
  publicCount: number
  internalCount: number
} {
  const publicCount = exercise.tests.filter(
    (testCase) => testCase.visibility === 'public',
  ).length

  return {
    total: exercise.tests.length,
    publicCount,
    internalCount: exercise.tests.length - publicCount,
  }
}
