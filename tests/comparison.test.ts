import { describe, expect, it } from 'vitest'
import {
  compareStdout,
  compareValue,
  normalizeStdout,
} from '../src/engine/testRunner/comparison'
import type { EncodedValue } from '../src/engine/testRunner/pythonValue'
import {
  describeArgument,
  describeEncodedValue,
  describeFunctionCall,
  describeInitialVariables,
  describeTestValue,
} from '../src/engine/testRunner/pythonValue'

/**
 * Comparadores são funções puras: nenhum teste aqui carrega o Pyodide. Os
 * valores codificados são exatamente o que o Worker produz.
 */

const int = (value: number): EncodedValue => ({ type: 'int', value })
const float = (value: number): EncodedValue => ({ type: 'float', value })
const str = (value: string): EncodedValue => ({ type: 'str', value })
const bool = (value: boolean): EncodedValue => ({ type: 'bool', value })
const none: EncodedValue = { type: 'none' }
const list = (...items: EncodedValue[]): EncodedValue => ({ type: 'list', items })

describe('compareValue com números', () => {
  it('aceita inteiros iguais', () => {
    expect(compareValue(21, int(21)).matches).toBe(true)
    expect(compareValue(21, int(20)).matches).toBe(false)
  })

  it('trata int e float como o Python: 37 == 37.0', () => {
    expect(compareValue(37, float(37)).matches).toBe(true)
    expect(compareValue(37.0, int(37)).matches).toBe(true)
  })

  it('absorve o erro de representação de float sem tolerância declarada', () => {
    expect(compareValue(0.3, float(0.1 + 0.2)).matches).toBe(true)
  })

  it('respeita a tolerância declarada', () => {
    expect(compareValue(299.97, float(299.9700001), 1e-3).matches).toBe(true)
    expect(compareValue(299.97, float(299.98), 1e-3).matches).toBe(false)
  })

  it('não confunde booleano com número, mesmo que o Python confunda', () => {
    expect(compareValue(1, bool(true)).matches).toBe(false)
    expect(compareValue(true, int(1)).matches).toBe(false)
  })

  it('reprova nan e infinito', () => {
    expect(compareValue(0, { type: 'float', value: null, special: 'nan' }).matches).toBe(false)
    expect(compareValue(1, { type: 'float', value: null, special: 'inf' }).matches).toBe(false)
  })
})

describe('compareValue com outros tipos', () => {
  it('compara texto exatamente', () => {
    expect(compareValue('Ana tem 28 anos.', str('Ana tem 28 anos.')).matches).toBe(true)
    expect(compareValue('Ana tem 28 anos.', str('Ana tem 28 anos')).matches).toBe(false)
  })

  it('compara None', () => {
    expect(compareValue(null, none).matches).toBe(true)
    expect(compareValue(null, int(0)).matches).toBe(false)
    // Função sem return devolve None: é o erro mais comum do tópico.
    expect(compareValue('Ana tem 28 anos.', none).matches).toBe(false)
  })

  it('compara listas item a item', () => {
    expect(compareValue([1, 2, 3], list(int(1), int(2), int(3))).matches).toBe(true)
    expect(compareValue([1, 2, 3], list(int(1), int(2))).matches).toBe(false)
    expect(compareValue([1, 2], list(int(1), int(9))).matches).toBe(false)
  })

  it('compara listas vazias', () => {
    expect(compareValue([], list()).matches).toBe(true)
  })

  it('compara listas aninhadas', () => {
    expect(
      compareValue([[1], [2]], list(list(int(1)), list(int(2)))).matches,
    ).toBe(true)
  })

  it('explica a divergência de tipo', () => {
    const comparison = compareValue('11', int(11))

    expect(comparison.matches).toBe(false)
    expect(comparison.reason).toContain('texto')
  })

  it('explica a divergência de tamanho', () => {
    expect(compareValue([1, 2, 3], list(int(1))).reason).toContain('3')
  })
})

describe('compareValue com NumPy', () => {
  const ndarray = (...items: EncodedValue[]): EncodedValue => ({
    type: 'ndarray',
    dtype: 'float64',
    items,
  })

  it('aceita um ndarray onde uma lista é esperada', () => {
    expect(compareValue([32, 50, 68], ndarray(float(32), float(50), float(68))).matches).toBe(
      true,
    )
  })

  it('aplica tolerância dentro do ndarray', () => {
    expect(compareValue([98.6], ndarray(float(98.60000000001)), 1e-9).matches).toBe(true)
  })

  it('reprova ndarray com valores diferentes', () => {
    expect(compareValue([1, 2], ndarray(float(1), float(3))).matches).toBe(false)
  })

  it('aceita tuple onde uma lista é esperada', () => {
    expect(
      compareValue([1, 2], { type: 'tuple', items: [int(1), int(2)] }).matches,
    ).toBe(true)
  })
})

describe('compareValue com tipo não suportado', () => {
  it('não finge que comparou', () => {
    const comparison = compareValue([1, 2], {
      type: 'unsupported',
      display: '{1, 2}',
      pythonType: 'set',
    })

    expect(comparison.matches).toBe(false)
    expect(comparison.reason).toContain('set')
  })
})

describe('compareStdout', () => {
  it('ignora quebras de linha sobrando no fim', () => {
    expect(compareStdout('A\nB', 'A\nB\n').matches).toBe(true)
    expect(compareStdout('Olá', 'Olá\n\n').matches).toBe(true)
  })

  it('preserva linhas em branco no meio', () => {
    expect(compareStdout('A\n\nB', 'A\nB').matches).toBe(false)
  })

  it('é sensível a espaços e acentos', () => {
    expect(compareStdout('Total: 37.0', 'Total:37.0').matches).toBe(false)
    expect(compareStdout('agradável', 'agradavel').matches).toBe(false)
  })

  it('normaliza quebras do Windows', () => {
    expect(compareStdout('A\nB', 'A\r\nB').matches).toBe(true)
    expect(normalizeStdout('A\r\nB\r\n')).toBe('A\nB')
  })
})

describe('notação dos valores', () => {
  it('descreve valores declarados como o Python os escreveria', () => {
    expect(describeTestValue('Ana')).toBe("'Ana'")
    expect(describeTestValue(true)).toBe('True')
    expect(describeTestValue(null)).toBe('None')
    expect(describeTestValue([1, 'a'])).toBe("[1, 'a']")
  })

  it('descreve valores recebidos, marcando float sem casa decimal', () => {
    expect(describeEncodedValue(float(37))).toBe('37.0')
    expect(describeEncodedValue(int(37))).toBe('37')
    expect(describeEncodedValue(none)).toBe('None')
    expect(describeEncodedValue({ type: 'float', value: null, special: 'nan' })).toBe('nan')
  })

  it('reproduz a chamada que o runner fará', () => {
    expect(describeFunctionCall('calcular_total', [18.5, 2])).toBe('calcular_total(18.5, 2)')
    expect(describeFunctionCall('apresentar_perfil', ['Ana', 28])).toBe(
      "apresentar_perfil('Ana', 28)",
    )
  })

  it('mostra argumentos de array com a notação do NumPy', () => {
    expect(describeArgument({ kind: 'ndarray', items: [0, 10] })).toBe('np.array([0, 10])')
  })

  it('escreve o estado inicial de um caso de script como atribuições', () => {
    expect(describeInitialVariables({ temperatura: 8 })).toBe('temperatura = 8')
    expect(describeInitialVariables({ nome: 'Ana', idade: 28 })).toBe(
      "nome = 'Ana', idade = 28",
    )
    expect(describeInitialVariables({ valores: [1, 2], ativo: true })).toBe(
      'valores = [1, 2], ativo = True',
    )
    expect(describeInitialVariables({ medicoes: { kind: 'ndarray', items: [1] } })).toBe(
      'medicoes = np.array([1])',
    )
    expect(
      describeFunctionCall('filtrar_intervalo', [{ kind: 'ndarray', items: [4, 8] }, 8, 12]),
    ).toBe('filtrar_intervalo(np.array([4, 8]), 8, 12)')
  })
})
