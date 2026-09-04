import { describe, expect, it } from 'vitest'
import type { ExecutionError } from '../src/engine/pythonRunner'
import { buildVerificationSpec, judgeVerification } from '../src/engine/testRunner/testRunner'
import {
  getPublicExamples,
  getRunInitialVariables,
} from '../src/engine/testRunner/publicExamples'
import type { EncodedValue } from '../src/engine/testRunner/pythonValue'
import type { CaseObservation, VerificationOutcome } from '../src/engine/testRunner/types'
import type { FunctionExercise, ScriptExercise } from '../src/types'

/**
 * O julgamento é separado da execução justamente para poder ser testado assim:
 * observações montadas à mão, sem Pyodide.
 */

const baseExercise = {
  trackId: 'programming',
  topicId: 'programming-first-steps',
  order: 1,
  estimatedMinutes: 5,
  difficulty: 'Fundamentos',
  instructions: ['faça'],
  hints: [],
  skill: 'skill',
  packages: [],
} as const

const scriptExercise: ScriptExercise = {
  ...baseExercise,
  id: 'script-ex',
  title: 'Script',
  description: 'desc',
  executionMode: 'script',
  starterCode: 'print("oi")\n',
  tests: [
    {
      id: 'case-public',
      visibility: 'public',
      label: 'Saída do programa',
      expectedStdout: 'Olá',
    },
    {
      id: 'case-internal',
      visibility: 'internal',
      label: 'Estado final',
      expectedVariables: [{ name: 'total', value: 30 }],
    },
  ],
}

const functionExercise: FunctionExercise = {
  ...baseExercise,
  id: 'function-ex',
  title: 'Função',
  description: 'desc',
  topicId: 'programming-functions',
  executionMode: 'function',
  entryPoint: 'dobro',
  starterCode: 'def dobro(numero):\n    pass\n',
  tests: [
    { id: 'case-1', visibility: 'public', args: [2], expected: 4 },
    { id: 'case-2', visibility: 'public', args: [0], expected: 0 },
    { id: 'case-3', visibility: 'internal', args: [-3], expected: -6 },
  ],
}

/** Dois casos que rodam o mesmo script com temperaturas diferentes. */
const temperatureExercise: ScriptExercise = {
  ...baseExercise,
  id: 'temperature-ex',
  title: 'Temperatura',
  description: 'desc',
  topicId: 'programming-conditionals',
  executionMode: 'script',
  starterCode: '# classifique a temperatura\n',
  tests: [
    {
      id: 'frio',
      visibility: 'public',
      label: 'temperatura = 8',
      initialVariables: { temperatura: 8 },
      expectedStdout: 'frio',
      expectedVariables: [{ name: 'classificacao', value: 'frio' }],
    },
    {
      id: 'quente',
      visibility: 'internal',
      label: 'temperatura = 32',
      initialVariables: { temperatura: 32 },
      expectedStdout: 'quente',
    },
  ],
}

const int = (value: number): EncodedValue => ({ type: 'int', value })

function observed(cases: readonly CaseObservation[]): VerificationOutcome {
  return { outcome: 'observed', cases }
}

describe('buildVerificationSpec', () => {
  it('pede ao Worker apenas as variáveis que o script declara esperar', () => {
    const spec = buildVerificationSpec(scriptExercise)

    expect(spec.mode).toBe('script')
    expect(spec).toMatchObject({
      cases: [
        { id: 'case-public', variableNames: [] },
        { id: 'case-internal', variableNames: ['total'] },
      ],
    })
  })

  it('leva a entrada declarada por cada caso de script', () => {
    const spec = buildVerificationSpec(temperatureExercise)

    expect(spec).toMatchObject({
      mode: 'script',
      cases: [
        { id: 'frio', initialVariables: { temperatura: 8 }, variableNames: ['classificacao'] },
        { id: 'quente', initialVariables: { temperatura: 32 }, variableNames: [] },
      ],
    })
  })

  it('não inventa entrada onde o conteúdo não declara nenhuma', () => {
    const spec = buildVerificationSpec(scriptExercise)

    expect(spec.mode).toBe('script')
    expect(
      spec.mode === 'script' &&
        spec.cases.every((testCase) => testCase.initialVariables === undefined),
    ).toBe(true)
  })

  it('leva o entryPoint e os argumentos de cada caso de função', () => {
    const spec = buildVerificationSpec(functionExercise)

    expect(spec).toMatchObject({
      mode: 'function',
      entryPoint: 'dobro',
      cases: [
        { id: 'case-1', args: [2] },
        { id: 'case-2', args: [0] },
        { id: 'case-3', args: [-3] },
      ],
    })
  })
})

describe('julgamento de script', () => {
  it('aprova quando saída e estado batem', () => {
    const result = judgeVerification(
      scriptExercise,
      observed([
        { id: 'case-public', stdout: 'Olá' },
        { id: 'case-internal', stdout: '', variables: { total: int(30) } },
      ]),
      12,
    )

    expect(result.status).toBe('completed')
    expect(result.passed).toBe(2)
    expect(result.failed).toBe(0)
  })

  it('reprova saída diferente e informa esperado e recebido', () => {
    const result = judgeVerification(
      scriptExercise,
      observed([
        { id: 'case-public', stdout: 'Ola' },
        { id: 'case-internal', stdout: '', variables: { total: int(30) } },
      ]),
      12,
    )

    expect(result.passed).toBe(1)
    const failure = result.cases.find((item) => item.status === 'failed')
    expect(failure?.failureKind).toBe('stdout')
    expect(failure?.expected).toBe('Olá')
    expect(failure?.received).toBe('Ola')
  })

  it('distingue variável ausente de variável com valor errado', () => {
    const missing = judgeVerification(
      scriptExercise,
      observed([
        { id: 'case-public', stdout: 'Olá' },
        { id: 'case-internal', stdout: '', variables: { total: null } },
      ]),
      1,
    )
    const wrong = judgeVerification(
      scriptExercise,
      observed([
        { id: 'case-public', stdout: 'Olá' },
        { id: 'case-internal', stdout: '', variables: { total: int(29) } },
      ]),
      1,
    )

    expect(missing.cases[1].failureKind).toBe('missing-variable')
    expect(missing.cases[1].detail).toBe('total')
    expect(wrong.cases[1].failureKind).toBe('variable')
    expect(wrong.cases[1].received).toBe('29')
  })

  it('marca como erro o caso em que o Python levantou exceção', () => {
    const error: ExecutionError = {
      kind: 'python',
      type: 'NameError',
      message: "name 'x' is not defined",
    }
    const result = judgeVerification(
      scriptExercise,
      observed([
        { id: 'case-public', stdout: '', error },
        { id: 'case-internal', stdout: '', variables: { total: int(30) } },
      ]),
      1,
    )

    expect(result.cases[0].failureKind).toBe('error')
    expect(result.cases[0].error?.type).toBe('NameError')
  })
})

describe('julgamento de função', () => {
  it('aprova quando todos os retornos batem', () => {
    const result = judgeVerification(
      functionExercise,
      observed([
        { id: 'case-1', stdout: '', returned: int(4) },
        { id: 'case-2', stdout: '', returned: int(0) },
        { id: 'case-3', stdout: '', returned: int(-6) },
      ]),
      20,
    )

    expect(result.passed).toBe(3)
    expect(result.entryPoint).toBe('dobro')
  })

  it('usa a chamada real como rótulo do caso', () => {
    const result = judgeVerification(
      functionExercise,
      observed([
        { id: 'case-1', stdout: '', returned: int(4) },
        { id: 'case-2', stdout: '', returned: int(0) },
        { id: 'case-3', stdout: '', returned: int(-6) },
      ]),
      1,
    )

    expect(result.cases[0].label).toBe('dobro(2)')
  })

  it('trata função sem return como retorno None', () => {
    const result = judgeVerification(
      functionExercise,
      observed([
        { id: 'case-1', stdout: '', returned: { type: 'none' } },
        { id: 'case-2', stdout: '', returned: int(0) },
        { id: 'case-3', stdout: '', returned: int(-6) },
      ]),
      1,
    )

    expect(result.cases[0].failureKind).toBe('return')
    expect(result.cases[0].received).toBe('None')
    expect(result.cases[0].expected).toBe('4')
  })

  it('ignora o que a função imprimiu: só o retorno conta', () => {
    const result = judgeVerification(
      functionExercise,
      observed([
        { id: 'case-1', stdout: '4\nlinha de inspeção', returned: int(4) },
        { id: 'case-2', stdout: '0', returned: int(0) },
        { id: 'case-3', stdout: '-6', returned: int(-6) },
      ]),
      1,
    )

    expect(result.passed).toBe(3)
  })
})

describe('entrada exibida ao aluno', () => {
  it('mostra no exemplo público os valores iniciais do caso', () => {
    const [example] = getPublicExamples(temperatureExercise)

    expect(example.given).toBe('temperatura = 8')
    expect(example.expected).toBe('frio')
    expect(example.call).toBeUndefined()
  })

  it('não anuncia valores iniciais em um script que não declara nenhum', () => {
    expect(getPublicExamples(scriptExercise)[0].given).toBeUndefined()
  })

  it('dá à execução livre a entrada do primeiro caso, e nenhuma às funções', () => {
    expect(getRunInitialVariables(temperatureExercise)).toEqual({ temperatura: 8 })
    expect(getRunInitialVariables(scriptExercise)).toBeUndefined()
    expect(getRunInitialVariables(functionExercise)).toBeUndefined()
  })
})

describe('falhas globais', () => {
  it('não finge que todos os casos falharam quando o código não executa', () => {
    const error: ExecutionError = {
      kind: 'python',
      type: 'SyntaxError',
      message: "'(' was never closed",
    }
    const result = judgeVerification(
      scriptExercise,
      { outcome: 'execution-error', error },
      3,
    )

    expect(result.status).toBe('execution-error')
    expect(result.cases).toEqual([])
    expect(result.failed).toBe(0)
    expect(result.total).toBe(2)
    expect(result.error?.type).toBe('SyntaxError')
  })

  it('reporta função ausente como situação própria', () => {
    const result = judgeVerification(
      functionExercise,
      { outcome: 'missing-entry-point', entryPoint: 'dobro' },
      3,
    )

    expect(result.status).toBe('missing-entry-point')
    expect(result.entryPoint).toBe('dobro')
    expect(result.cases).toEqual([])
  })

  it('reprova o caso quando o Worker não devolveu observação', () => {
    const result = judgeVerification(
      functionExercise,
      observed([{ id: 'case-1', stdout: '', returned: int(4) }]),
      1,
    )

    expect(result.passed).toBe(1)
    expect(result.failed).toBe(2)
  })
})
