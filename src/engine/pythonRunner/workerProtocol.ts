import type { VerificationResult, VerificationSpec } from '../testRunner/types'
import type { InitialVariables } from '../../types'
import type { ExecutionResult, ExecutionStage } from './types'

/**
 * Contrato de mensagens entre a página e o Worker que hospeda o Pyodide.
 *
 * Tudo o que atravessa o postMessage é dado simples: o Worker converte o erro
 * do Python em ExecutionError antes de responder, porque instâncias de Error
 * com campos próprios não sobrevivem à clonagem estruturada.
 */

export interface RunRequest {
  readonly kind: 'run'
  readonly requestId: number
  readonly code: string
  readonly packages: readonly string[]
  /** Estado inicial do namespace; o código em si nunca é reescrito. */
  readonly initialVariables?: InitialVariables
}

/**
 * Verificação: mesmo runtime, mesmo Worker, resultado diferente. O Worker roda
 * os casos e devolve observações brutas; quem julga é o test runner.
 */
export interface VerifyRequest {
  readonly kind: 'verify'
  readonly requestId: number
  readonly code: string
  readonly packages: readonly string[]
  readonly spec: VerificationSpec
}

export type WorkerRequest = RunRequest | VerifyRequest

export interface ProgressResponse {
  readonly kind: 'progress'
  readonly requestId: number
  readonly stage: ExecutionStage
}

export interface ResultResponse {
  readonly kind: 'result'
  readonly requestId: number
  readonly result: ExecutionResult
}

export interface VerificationResponse {
  readonly kind: 'verification'
  readonly requestId: number
  readonly result: VerificationResult
}

export type WorkerResponse = ProgressResponse | ResultResponse | VerificationResponse
