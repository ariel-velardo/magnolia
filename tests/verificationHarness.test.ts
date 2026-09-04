import { beforeAll, describe, expect, it } from 'vitest'
import { loadPyodide } from 'pyodide'
import type { PyodideInterface } from 'pyodide'
import type { PyProxy } from 'pyodide/ffi'
import {
  cleanTraceback,
  extractErrorLine,
} from '../src/engine/pythonRunner/pythonError'
import { VERIFICATION_HARNESS } from '../src/engine/pythonRunner/verificationHarness'
import { buildVerificationSpec, judgeVerification } from '../src/engine/testRunner'
import type {
  CaseObservation,
  TestRunResult,
  VerificationOutcome,
} from '../src/engine/testRunner'
import type { InitialVariables, ScriptExercise } from '../src/types'

/**
 * O harness rodando em Python de verdade.
 *
 * Os demais testes cobrem o julgamento com observações montadas à mão. Este
 * cobre o que só o interpretador pode responder: se a entrada declarada chega
 * mesmo ao namespace, se um caso não contamina o seguinte e se a linha de um
 * erro continua sendo a linha que o aluno vê no editor. O Pyodide é carregado
 * uma vez e reaproveitado, como no Worker.
 */

let runtime: PyodideInterface

beforeAll(async () => {
  runtime = await loadPyodide()
  runtime.runPython(VERIFICATION_HARNESS)
}, 180_000)

interface RawObservation {
  id: string
  stdout?: string
  variables?: CaseObservation['variables']
  returned?: CaseObservation['returned']
  traceback?: string
}

type RawVerification =
  | { outcome: 'execution-error'; traceback: string }
  | { outcome: 'missing-entry-point'; entryPoint: string }
  | { outcome: 'observed'; cases: RawObservation[] }

/** Mesma travessia que o Worker faz: código e spec vão como dados. */
function verify(exercise: ScriptExercise, code: string): VerificationOutcome {
  const call = runtime.globals.get('_magnolia_verify') as (
    source: string,
    specJson: string,
  ) => string
  const raw = JSON.parse(
    call(code, JSON.stringify(buildVerificationSpec(exercise))),
  ) as RawVerification

  if (raw.outcome === 'execution-error') {
    return {
      outcome: 'execution-error',
      error: {
        kind: 'python',
        type: 'PythonError',
        message: '',
        traceback: cleanTraceback(raw.traceback),
        line: extractErrorLine(raw.traceback),
      },
    }
  }

  if (raw.outcome === 'missing-entry-point') {
    return { outcome: 'missing-entry-point', entryPoint: raw.entryPoint }
  }

  return {
    outcome: 'observed',
    cases: raw.cases.map((observation) => ({
      id: observation.id,
      stdout: observation.stdout ?? '',
      variables: observation.variables,
      returned: observation.returned,
      error: observation.traceback
        ? {
            kind: 'python',
            type: 'PythonError',
            message: '',
            traceback: cleanTraceback(observation.traceback),
            line: extractErrorLine(observation.traceback),
          }
        : undefined,
    })),
  }
}

function run(exercise: ScriptExercise, code: string): TestRunResult {
  return judgeVerification(exercise, verify(exercise, code), 0)
}

const baseExercise = {
  trackId: 'programming',
  topicId: 'programming-conditionals',
  order: 1,
  estimatedMinutes: 5,
  difficulty: 'Fácil',
  instructions: ['faça'],
  starterCode: '',
  hints: [],
  skill: 'skill',
  packages: [],
  executionMode: 'script',
} as const

function scriptExercise(
  tests: ScriptExercise['tests'],
  id = 'ex',
): ScriptExercise {
  return { ...baseExercise, id, title: id, description: id, tests }
}

/** O exercício que motivou a mudança: mesma solução, três temperaturas. */
const temperatureExercise = scriptExercise([
  {
    id: 'frio',
    visibility: 'public',
    label: 'temperatura = 8',
    initialVariables: { temperatura: 8 },
    expectedStdout: 'frio',
    expectedVariables: [{ name: 'classificacao', value: 'frio' }],
  },
  {
    id: 'agradavel',
    visibility: 'public',
    label: 'temperatura = 21',
    initialVariables: { temperatura: 21 },
    expectedStdout: 'agradável',
    expectedVariables: [{ name: 'classificacao', value: 'agradável' }],
  },
  {
    id: 'quente',
    visibility: 'internal',
    label: 'temperatura = 32',
    initialVariables: { temperatura: 32 },
    expectedStdout: 'quente',
    expectedVariables: [{ name: 'classificacao', value: 'quente' }],
  },
])

const CORRECT_SOLUTION = `if temperatura < 18:
    classificacao = "frio"
elif temperatura <= 25:
    classificacao = "agradável"
else:
    classificacao = "quente"

print(classificacao)
`

const HARDCODED_SOLUTION = `classificacao = "agradável"
print(classificacao)
`

describe('entrada injetada no namespace', () => {
  it('entrega ao script os valores declarados pelo caso', () => {
    const exercise = scriptExercise([
      {
        id: 'tipos',
        visibility: 'public',
        label: 'todos os tipos',
        initialVariables: {
          inteiro: 7,
          decimal: 2.5,
          texto: 'Ana',
          logico: true,
          lista: [1, 2, 3],
          nulo: null,
        },
        expectedStdout: "7 int\n2.5 float\nAna str\nTrue bool\n[1, 2, 3] list\nNone NoneType",
      },
    ])
    const code = `for valor in [inteiro, decimal, texto, logico, lista, nulo]:
    print(valor, type(valor).__name__)
`

    expect(run(exercise, code).passed).toBe(1)
  })

  it('roda o mesmo código com entradas diferentes em cada caso', () => {
    const result = run(temperatureExercise, CORRECT_SOLUTION)

    expect(result.status).toBe('completed')
    expect(result.passed).toBe(3)
    expect(result.failed).toBe(0)
  })

  it('reprova a solução decorada: ela acerta só a entrada do enunciado', () => {
    const result = run(temperatureExercise, HARDCODED_SOLUTION)

    expect(result.passed).toBe(1)
    expect(result.failed).toBe(2)
    expect(result.cases.map((testCase) => testCase.status)).toEqual([
      'failed',
      'passed',
      'failed',
    ])
    expect(result.cases[0]).toMatchObject({
      failureKind: 'stdout',
      expected: 'frio',
      received: 'agradável',
    })
  })

  it('lê o estado final do namespace, e não apenas o que foi impresso', () => {
    // A saída do primeiro caso está certa; o que falta é a variável pedida.
    const semVariavel = run(temperatureExercise, 'print("frio")\n')

    expect(semVariavel.cases[0].failureKind).toBe('missing-variable')
    expect(semVariavel.cases[0].detail).toBe('classificacao')
  })

  it('aceita ndarray como valor inicial, pelo mesmo marcador dos argumentos', async (ctx) => {
    // NumPy vem da CDN do Pyodide; sem rede, este é o único caso que não roda,
    // e pular é melhor do que quebrar a suíte inteira.
    const loaded = await runtime.loadPackage('numpy').then(
      () => true,
      () => false,
    )

    if (!loaded) {
      ctx.skip()
      return
    }

    const exercise = scriptExercise([
      {
        id: 'array',
        visibility: 'public',
        label: 'medicoes',
        initialVariables: { medicoes: { kind: 'ndarray', items: [1, 2, 3] } },
        expectedStdout: 'ndarray 6',
      },
    ])

    expect(
      run(exercise, 'print(type(medicoes).__name__, medicoes.sum())').passed,
    ).toBe(1)
  }, 120_000)
})

describe('isolamento entre casos', () => {
  it('entrega uma cópia própria a cada caso, mesmo quando o script altera a lista', () => {
    const cases = [1, 2, 3].map((index) => ({
      id: `caso-${index}`,
      visibility: 'internal' as const,
      label: `caso ${index}`,
      initialVariables: { valores: [1, 2] } satisfies InitialVariables,
      expectedStdout: '[1, 2, 99]',
      expectedVariables: [{ name: 'valores', value: [1, 2, 99] }],
    }))

    expect(run(scriptExercise(cases), 'valores.append(99)\nprint(valores)\n').passed).toBe(3)
  })

  it('não deixa vazar para o caso seguinte o que um caso criou', () => {
    const exercise = scriptExercise([
      {
        id: 'cria',
        visibility: 'internal',
        label: 'cria a variável',
        initialVariables: { semente: 1 },
        expectedStdout: 'ausente',
      },
      {
        id: 'confere',
        visibility: 'internal',
        label: 'não encontra a variável do caso anterior',
        initialVariables: { semente: 2 },
        expectedStdout: 'ausente',
      },
    ])
    const code = `print("presente" if "rastro" in dir() else "ausente")
rastro = True
`

    expect(run(exercise, code).passed).toBe(2)
  })

  it('não deixa a sonda contaminar o primeiro caso', () => {
    // A sonda executa o código antes dos casos, com a entrada do primeiro
    // deles. Se compartilhasse a mesma lista, o caso veria [1, 2, 99].
    const exercise = scriptExercise([
      {
        id: 'unico',
        visibility: 'public',
        label: 'primeiro caso',
        initialVariables: { valores: [1, 2] },
        expectedStdout: '[1, 2, 99]',
      },
    ])

    expect(run(exercise, 'valores.append(99)\nprint(valores)\n').passed).toBe(1)
  })
})

describe('linhas de erro', () => {
  const withInput = scriptExercise([
    {
      id: 'caso',
      visibility: 'public',
      label: 'entrada injetada',
      initialVariables: { temperatura: 8 },
      expectedStdout: 'frio',
    },
  ])
  const withoutInput = scriptExercise([
    { id: 'caso', visibility: 'public', label: 'sem entrada', expectedStdout: 'frio' },
  ])

  it('aponta a linha do editor em um SyntaxError, com ou sem entrada injetada', () => {
    const code = `a = 1
b = 2
print("frio"
`
    const injected = verify(withInput, code)
    const plain = verify(withoutInput, code)

    expect(injected.outcome).toBe('execution-error')
    expect(plain.outcome).toBe('execution-error')
    expect(injected.outcome === 'execution-error' && injected.error.line).toBe(3)
    expect(plain.outcome === 'execution-error' && plain.error.line).toBe(3)
  })

  it('aponta a linha do editor em um erro de execução, com ou sem entrada injetada', () => {
    // A quarta linha é a que falha nos dois cenários: com a entrada injetada
    // porque divide por zero, sem ela porque temperatura não existe.
    const code = `# comentário
divisor = 0
print("antes")
print(temperatura / divisor)
`
    const injected = verify(withInput, code)
    const plain = verify(withoutInput, code)

    expect(injected.outcome).toBe('execution-error')
    expect(injected.outcome === 'execution-error' && injected.error.line).toBe(4)
    expect(plain.outcome === 'execution-error' && plain.error.line).toBe(4)
  })

  it('mantém a linha correta quando o erro só acontece em um dos casos', () => {
    const exercise = scriptExercise([
      {
        id: 'ok',
        visibility: 'public',
        label: 'divisor = 2',
        initialVariables: { divisor: 2 },
        expectedStdout: '5.0',
      },
      {
        id: 'zero',
        visibility: 'internal',
        label: 'divisor = 0',
        initialVariables: { divisor: 0 },
        expectedStdout: '0',
      },
    ])
    const result = run(exercise, `total = 10\n\nprint(total / divisor)\n`)

    expect(result.cases[0].status).toBe('passed')
    expect(result.cases[1].failureKind).toBe('error')
    expect(result.cases[1].error?.line).toBe(3)
  })
})

describe('namespace da execução livre', () => {
  it('monta os mesmos valores usados pelo primeiro caso', () => {
    const build = runtime.globals.get('_magnolia_namespace') as (
      initialJson: string,
    ) => PyProxy
    const namespace = build(JSON.stringify({ temperatura: 8, nome: 'Ana' }))

    try {
      expect(
        runtime.runPython('f"{temperatura} {nome}"', { globals: namespace }),
      ).toBe('8 Ana')
    } finally {
      namespace.destroy()
    }
  })
})
