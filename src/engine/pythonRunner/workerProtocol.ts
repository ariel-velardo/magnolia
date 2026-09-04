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
}

export type WorkerRequest = RunRequest

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

export type WorkerResponse = ProgressResponse | ResultResponse
