import type { ExecutionError } from '../pythonRunner'
import type { InitialVariables, TestArgument, TestVisibility } from '../../types'
import type { EncodedValue } from './pythonValue'

/**
 * Contrato de verificação: o que o Worker recebe e o que devolve.
 *
 * O Worker apenas executa e codifica valores. Toda a comparação acontece no
 * lado TypeScript, para que a lógica que decide "passou" ou "falhou" possa ser
 * testada sem carregar o Pyodide.
 */

export interface ScriptCaseSpec {
  readonly id: string
  /**
   * Entrada do caso. O Worker cria o namespace já com esses nomes ligados aos
   * valores declarados e só então executa o código do aluno — sem prefixar nem
   * reescrever uma única linha do que ele digitou.
   */
  readonly initialVariables?: InitialVariables
  /** Variáveis cujo valor final deve ser lido do namespace. */
  readonly variableNames: readonly string[]
}

export interface FunctionCaseSpec {
  readonly id: string
  readonly args: readonly TestArgument[]
}

export type VerificationSpec =
  | { readonly mode: 'script'; readonly cases: readonly ScriptCaseSpec[] }
  | {
      readonly mode: 'function'
      readonly entryPoint: string
      readonly cases: readonly FunctionCaseSpec[]
    }

/** Observações brutas de um caso, antes de qualquer julgamento. */
export interface CaseObservation {
  readonly id: string
  readonly stdout: string
  /** Ausente quando a variável não existe no namespace ao final. */
  readonly variables?: Readonly<Record<string, EncodedValue | null>>
  readonly returned?: EncodedValue
  /** Erro levantado durante este caso — por exemplo dentro da função chamada. */
  readonly error?: ExecutionError
}

/**
 * Uma falha global impede qualquer caso de rodar. Separá-la dos casos é o que
 * evita apresentar "0 de 5 testes passaram" quando o problema é um SyntaxError.
 */
export type VerificationOutcome =
  | { readonly outcome: 'observed'; readonly cases: readonly CaseObservation[] }
  | { readonly outcome: 'execution-error'; readonly error: ExecutionError }
  | { readonly outcome: 'missing-entry-point'; readonly entryPoint: string }

export interface VerificationResult {
  readonly observation: VerificationOutcome
  readonly durationMs: number
}

/** Por que um caso não passou, para a interface dizer algo útil. */
export type FailureKind =
  | 'stdout'
  | 'variable'
  | 'missing-variable'
  | 'return'
  | 'error'

export interface TestCaseOutcome {
  readonly id: string
  readonly visibility: TestVisibility
  /** Rótulo curto do caso; é tudo que um caso interno revela. */
  readonly label: string
  readonly status: 'passed' | 'failed'
  readonly failureKind?: FailureKind
  /** Texto do valor esperado, na notação do Python. */
  readonly expected?: string
  readonly received?: string
  /** Detalhe da divergência: nome da variável, incompatibilidade de tipo. */
  readonly detail?: string
  readonly explanation?: string
  readonly error?: ExecutionError
}

export type TestRunStatus = 'completed' | 'execution-error' | 'missing-entry-point'

export interface TestRunResult {
  readonly status: TestRunStatus
  readonly total: number
  readonly passed: number
  readonly failed: number
  readonly cases: readonly TestCaseOutcome[]
  /** Presente quando o código do aluno sequer chegou a executar. */
  readonly error?: ExecutionError
  readonly entryPoint?: string
  readonly durationMs: number
}
