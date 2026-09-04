import type {
  Exercise,
  FunctionExercise,
  FunctionTestCase,
  ScriptExercise,
  ScriptTestCase,
} from '../../types'
import { verifyPython } from '../pythonRunner'
import type { RunPythonOptions } from '../pythonRunner'
import { compareStdout, compareValue, normalizeStdout } from './comparison'
import {
  describeEncodedValue,
  describeFunctionCall,
  describeTestValue,
} from './pythonValue'
import type {
  CaseObservation,
  TestCaseOutcome,
  TestRunResult,
  VerificationOutcome,
  VerificationSpec,
} from './types'

/**
 * Executa os casos de teste de um exercício e produz resultados estruturados.
 *
 * Não conhece React e não decide como nada é exibido. A execução em si fica no
 * pythonRunner; o que este módulo faz é montar a especificação, interpretar as
 * observações e dizer o que passou.
 */

/** Descreve para o Worker o que observar em cada caso. */
export function buildVerificationSpec(exercise: Exercise): VerificationSpec {
  if (exercise.executionMode === 'function') {
    return {
      mode: 'function',
      entryPoint: exercise.entryPoint,
      cases: exercise.tests.map((testCase) => ({
        id: testCase.id,
        args: testCase.args,
      })),
    }
  }

  return {
    mode: 'script',
    cases: exercise.tests.map((testCase) => ({
      id: testCase.id,
      initialVariables: testCase.initialVariables,
      variableNames: (testCase.expectedVariables ?? []).map((variable) => variable.name),
    })),
  }
}

function summarize(
  cases: readonly TestCaseOutcome[],
  durationMs: number,
  entryPoint?: string,
): TestRunResult {
  const passed = cases.filter((testCase) => testCase.status === 'passed').length

  return {
    status: 'completed',
    total: cases.length,
    passed,
    failed: cases.length - passed,
    cases,
    entryPoint,
    durationMs,
  }
}

function judgeScriptCase(
  testCase: ScriptTestCase,
  observation: CaseObservation | undefined,
): TestCaseOutcome {
  const base = {
    id: testCase.id,
    visibility: testCase.visibility,
    label: testCase.label,
    explanation: testCase.explanation,
  } as const

  if (!observation) {
    return { ...base, status: 'failed', failureKind: 'error' }
  }

  if (observation.error) {
    return { ...base, status: 'failed', failureKind: 'error', error: observation.error }
  }

  if (testCase.expectedStdout !== undefined) {
    const comparison = compareStdout(testCase.expectedStdout, observation.stdout)

    if (!comparison.matches) {
      return {
        ...base,
        status: 'failed',
        failureKind: 'stdout',
        expected: normalizeStdout(testCase.expectedStdout),
        received: normalizeStdout(observation.stdout),
      }
    }
  }

  for (const variable of testCase.expectedVariables ?? []) {
    const received = observation.variables?.[variable.name]

    // null significa que o nome não existia no namespace ao final do script:
    // é um caso diferente de "existe mas está errado".
    if (received === null || received === undefined) {
      return {
        ...base,
        status: 'failed',
        failureKind: 'missing-variable',
        detail: variable.name,
        expected: describeTestValue(variable.value, variable.tolerance !== undefined),
      }
    }

    const comparison = compareValue(variable.value, received, variable.tolerance)

    if (!comparison.matches) {
      return {
        ...base,
        status: 'failed',
        failureKind: 'variable',
        detail: comparison.reason
          ? `${variable.name} — ${comparison.reason}`
          : variable.name,
        expected: describeTestValue(variable.value, variable.tolerance !== undefined),
        received: describeEncodedValue(received),
      }
    }
  }

  return { ...base, status: 'passed' }
}

function judgeFunctionCase(
  testCase: FunctionTestCase,
  entryPoint: string,
  observation: CaseObservation | undefined,
): TestCaseOutcome {
  const base = {
    id: testCase.id,
    visibility: testCase.visibility,
    label: describeFunctionCall(entryPoint, testCase.args),
    explanation: testCase.explanation,
    expected: describeTestValue(testCase.expected, testCase.tolerance !== undefined),
  } as const

  if (!observation) {
    return { ...base, status: 'failed', failureKind: 'error' }
  }

  if (observation.error) {
    return { ...base, status: 'failed', failureKind: 'error', error: observation.error }
  }

  if (!observation.returned) {
    return { ...base, status: 'failed', failureKind: 'return', received: 'None' }
  }

  const comparison = compareValue(testCase.expected, observation.returned, testCase.tolerance)

  if (!comparison.matches) {
    return {
      ...base,
      status: 'failed',
      failureKind: 'return',
      received: describeEncodedValue(observation.returned),
      detail: comparison.reason,
    }
  }

  return { ...base, status: 'passed' }
}

/**
 * Transforma observações brutas em resultado julgado. Separado de
 * `runExerciseTests` para poder ser testado sem Pyodide algum.
 */
export function judgeVerification(
  exercise: Exercise,
  observation: VerificationOutcome,
  durationMs: number,
): TestRunResult {
  if (observation.outcome === 'execution-error') {
    return {
      status: 'execution-error',
      total: exercise.tests.length,
      passed: 0,
      failed: 0,
      cases: [],
      error: observation.error,
      durationMs,
    }
  }

  if (observation.outcome === 'missing-entry-point') {
    return {
      status: 'missing-entry-point',
      total: exercise.tests.length,
      passed: 0,
      failed: 0,
      cases: [],
      entryPoint: observation.entryPoint,
      durationMs,
    }
  }

  const byId = new Map(observation.cases.map((item) => [item.id, item]))

  if (exercise.executionMode === 'function') {
    const functionExercise: FunctionExercise = exercise

    return summarize(
      functionExercise.tests.map((testCase) =>
        judgeFunctionCase(testCase, functionExercise.entryPoint, byId.get(testCase.id)),
      ),
      durationMs,
      functionExercise.entryPoint,
    )
  }

  const scriptExercise: ScriptExercise = exercise

  return summarize(
    scriptExercise.tests.map((testCase) => judgeScriptCase(testCase, byId.get(testCase.id))),
    durationMs,
  )
}

export async function runExerciseTests(
  exercise: Exercise,
  code: string,
  options: Pick<RunPythonOptions, 'onStage' | 'timeoutMs'> = {},
): Promise<TestRunResult> {
  const verification = await verifyPython(code, buildVerificationSpec(exercise), {
    packages: exercise.packages,
    ...options,
  })

  return judgeVerification(exercise, verification.observation, verification.durationMs)
}
