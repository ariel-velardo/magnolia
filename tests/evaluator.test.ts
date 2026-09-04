import { describe, expect, it } from 'vitest'
import { evaluate } from '../src/engine/evaluator'
import type { ExecutionError } from '../src/engine/pythonRunner'
import type { TestCaseOutcome, TestRunResult } from '../src/engine/testRunner'
import type { FunctionExercise } from '../src/types'

/**
 * O evaluator não executa nada: recebe o resultado apurado e decide o que dizer.
 * O que estes testes protegem é a regra pedagógica — apontar o comportamento,
 * nunca abrir a solução, e nunca revelar o conteúdo de um caso interno.
 */

const exercise: FunctionExercise = {
  id: 'function-ex',
  trackId: 'programming',
  topicId: 'programming-functions',
  title: 'Função',
  description: 'desc',
  order: 1,
  estimatedMinutes: 5,
  difficulty: 'Fácil',
  executionMode: 'function',
  entryPoint: 'dobro',
  instructions: [],
  starterCode: 'def dobro(numero):\n    pass\n',
  tests: [],
  hints: [],
  skill: 'skill',
  packages: [],
}

function outcome(overrides: Partial<TestCaseOutcome> & Pick<TestCaseOutcome, 'id'>): TestCaseOutcome {
  return {
    visibility: 'public',
    label: 'dobro(2)',
    status: 'failed',
    ...overrides,
  }
}

function completed(cases: readonly TestCaseOutcome[]): TestRunResult {
  const passed = cases.filter((item) => item.status === 'passed').length

  return {
    status: 'completed',
    total: cases.length,
    passed,
    failed: cases.length - passed,
    cases,
    durationMs: 10,
  }
}

describe('todos os testes passaram', () => {
  it('anuncia sucesso sem prometer conclusão registrada', () => {
    const evaluation = evaluate(
      completed([
        outcome({ id: 'a', status: 'passed' }),
        outcome({ id: 'b', status: 'passed' }),
      ]),
      exercise,
    )

    expect(evaluation.status).toBe('all-passed')
    expect(evaluation.headline).toBe('Todos os 2 testes passaram')
    expect(evaluation.publicFailures).toEqual([])
    expect(evaluation.guidance).toBeUndefined()
  })

  it('usa o singular quando há um caso só', () => {
    const evaluation = evaluate(completed([outcome({ id: 'a', status: 'passed' })]), exercise)

    expect(evaluation.headline).toBe('O teste passou')
  })
})

describe('alguns testes falharam', () => {
  it('conta quantos passaram, como o enunciado da fase pede', () => {
    const evaluation = evaluate(
      completed([
        outcome({ id: 'a', status: 'passed' }),
        outcome({ id: 'b', status: 'passed' }),
        outcome({ id: 'c', status: 'passed' }),
        outcome({ id: 'd', status: 'passed' }),
        outcome({ id: 'e', failureKind: 'return' }),
      ]),
      exercise,
    )

    expect(evaluation.status).toBe('some-failed')
    expect(evaluation.headline).toBe('4 de 5 testes passaram')
  })

  it('entrega o detalhe apenas dos casos públicos', () => {
    const evaluation = evaluate(
      completed([
        outcome({ id: 'pub', failureKind: 'return', expected: '4', received: '2' }),
        outcome({ id: 'int', visibility: 'internal', failureKind: 'return' }),
      ]),
      exercise,
    )

    expect(evaluation.publicFailures).toHaveLength(1)
    expect(evaluation.publicFailures[0].id).toBe('pub')
    expect(evaluation.internalFailureCount).toBe(1)
  })

  it('quando só o interno falha, orienta sem revelar o caso', () => {
    const evaluation = evaluate(
      completed([
        outcome({ id: 'pub', status: 'passed' }),
        outcome({ id: 'int', visibility: 'internal', failureKind: 'return' }),
      ]),
      exercise,
    )

    expect(evaluation.publicFailures).toEqual([])
    expect(evaluation.internalFailureCount).toBe(1)
    expect(evaluation.summary).toContain('interno')
    expect(evaluation.guidance).toContain('limite')
    // Nada do caso interno vaza para a orientação.
    expect(evaluation.guidance).not.toContain('dobro(')
  })

  it('orienta conforme o tipo de divergência', () => {
    const stdout = evaluate(completed([outcome({ id: 'a', failureKind: 'stdout' })]), exercise)
    const variable = evaluate(
      completed([outcome({ id: 'a', failureKind: 'variable' })]),
      exercise,
    )
    const missing = evaluate(
      completed([outcome({ id: 'a', failureKind: 'missing-variable' })]),
      exercise,
    )
    const errored = evaluate(completed([outcome({ id: 'a', failureKind: 'error' })]), exercise)

    expect(stdout.guidance).toContain('espaços')
    expect(variable.guidance).toContain('valor diferente')
    expect(missing.guidance).toContain('nome')
    expect(errored.guidance).toContain('erro')
  })

  it('nunca sugere a solução', () => {
    const evaluation = evaluate(
      completed([outcome({ id: 'a', failureKind: 'return', expected: '4' })]),
      exercise,
    )
    const text = `${evaluation.headline} ${evaluation.summary} ${evaluation.guidance ?? ''}`

    for (const forbidden of ['return numero * 2', 'def dobro', 'a resposta é']) {
      expect(text).not.toContain(forbidden)
    }
  })
})

describe('o código não chegou a rodar', () => {
  const syntaxError: ExecutionError = {
    kind: 'python',
    type: 'SyntaxError',
    message: "'(' was never closed",
  }

  it('separa erro de execução de teste reprovado', () => {
    const evaluation = evaluate(
      {
        status: 'execution-error',
        total: 3,
        passed: 0,
        failed: 0,
        cases: [],
        error: syntaxError,
        durationMs: 5,
      },
      exercise,
    )

    expect(evaluation.status).toBe('execution-error')
    expect(evaluation.headline).toBe('Nenhum teste chegou a rodar')
    expect(evaluation.summary).toContain('sintaxe')
    expect(evaluation.guidance).toContain('Executar')
  })

  it('explica o tempo limite em vez de culpar a solução', () => {
    const evaluation = evaluate(
      {
        status: 'execution-error',
        total: 2,
        passed: 0,
        failed: 0,
        cases: [],
        error: { kind: 'timeout', type: 'TimeoutError', message: 'passou do limite' },
        durationMs: 20000,
      },
      exercise,
    )

    expect(evaluation.summary).toContain('laço')
  })

  it('aponta a função ausente pelo nome pedido', () => {
    const evaluation = evaluate(
      {
        status: 'missing-entry-point',
        total: 3,
        passed: 0,
        failed: 0,
        cases: [],
        entryPoint: 'dobro',
        durationMs: 5,
      },
      exercise,
    )

    expect(evaluation.status).toBe('missing-entry-point')
    expect(evaluation.summary).toContain('dobro')
    expect(evaluation.guidance).toContain('def')
  })
})
