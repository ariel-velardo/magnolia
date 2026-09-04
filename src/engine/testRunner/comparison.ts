import type { TestValue } from '../../types'
import type { EncodedValue } from './pythonValue'

/**
 * Comparação entre o valor declarado no conteúdo e o valor que o Python
 * devolveu.
 *
 * Funções puras: nada aqui conhece Pyodide, então os comparadores são testáveis
 * diretamente, sem mock artificial de runtime.
 */

/**
 * Margem usada quando o conteúdo não declara `tolerance` e há float envolvido.
 * Sem ela, uma soma como 0.1 + 0.2 reprovaria uma solução correta.
 */
export const DEFAULT_FLOAT_TOLERANCE = 1e-9

export interface Comparison {
  readonly matches: boolean
  /** Motivo curto da divergência, quando o tipo é a causa. */
  readonly reason?: string
}

const MATCH: Comparison = { matches: true }

function mismatch(reason?: string): Comparison {
  return { matches: false, reason }
}

function isNumeric(value: EncodedValue): value is
  | { type: 'int'; value: number }
  | { type: 'float'; value: number | null; special?: 'nan' | 'inf' | '-inf' } {
  return value.type === 'int' || value.type === 'float'
}

/**
 * Números são comparados pelo valor, como o Python faz: 2 == 2.0 é verdadeiro.
 * A tolerância só entra quando um dos lados é float.
 */
function compareNumbers(
  expected: number,
  received: EncodedValue,
  tolerance: number | undefined,
): Comparison {
  if (!isNumeric(received)) {
    return mismatch(`esperava um número e recebeu ${received.type}`)
  }

  if (received.type === 'float' && received.special) {
    return mismatch(`recebeu ${received.special}`)
  }

  const receivedNumber = received.value ?? Number.NaN

  if (Number.isInteger(expected) && received.type === 'int' && tolerance === undefined) {
    return expected === receivedNumber ? MATCH : mismatch()
  }

  const margin = tolerance ?? DEFAULT_FLOAT_TOLERANCE

  return Math.abs(expected - receivedNumber) <= margin ? MATCH : mismatch()
}

/**
 * Compara o valor esperado, declarado no conteúdo, com o valor codificado que
 * veio do Python.
 */
export function compareValue(
  expected: TestValue,
  received: EncodedValue,
  tolerance?: number,
): Comparison {
  if (received.type === 'unsupported') {
    return mismatch(`o Magnolia ainda não compara valores do tipo ${received.pythonType}`)
  }

  if (expected === null) {
    return received.type === 'none' ? MATCH : mismatch('esperava None')
  }

  if (typeof expected === 'boolean') {
    // Em Python True == 1, mas confundir booleano com número é justamente o
    // erro que interessa apontar ao aluno.
    if (received.type !== 'bool') {
      return mismatch(`esperava um booleano e recebeu ${received.type}`)
    }

    return expected === received.value ? MATCH : mismatch()
  }

  if (typeof expected === 'number') {
    if (received.type === 'bool') {
      return mismatch('esperava um número e recebeu um booleano')
    }

    return compareNumbers(expected, received, tolerance)
  }

  if (typeof expected === 'string') {
    if (received.type !== 'str') {
      return mismatch(`esperava um texto e recebeu ${received.type}`)
    }

    return expected === received.value ? MATCH : mismatch()
  }

  // Sequências. Um ndarray é aceito onde uma lista é esperada: o conteúdo
  // declara os valores, e não a estrutura que os carrega.
  if (received.type !== 'list' && received.type !== 'tuple' && received.type !== 'ndarray') {
    return mismatch(`esperava uma sequência e recebeu ${received.type}`)
  }

  if (expected.length !== received.items.length) {
    return mismatch(
      `esperava ${expected.length} ${expected.length === 1 ? 'item' : 'itens'} e recebeu ${received.items.length}`,
    )
  }

  for (const [index, item] of expected.entries()) {
    const itemComparison = compareValue(item, received.items[index], tolerance)

    if (!itemComparison.matches) {
      return mismatch(itemComparison.reason)
    }
  }

  return MATCH
}

/**
 * Comparação de saída do programa.
 *
 * Quebras de linha finais são ignoradas, porque o último print sempre deixa uma
 * — mas espaços e pontuação dentro do texto são significativos: acertar o
 * formato pedido faz parte do exercício.
 */
export function compareStdout(expected: string, received: string): Comparison {
  return normalizeStdout(expected) === normalizeStdout(received) ? MATCH : mismatch()
}

export function normalizeStdout(value: string): string {
  return value.replace(/\r\n?/g, '\n').replace(/\n+$/, '')
}
