import type { ExecutionError, ExecutionResult, RunPythonOptions } from './types'
import type { WorkerRequest, WorkerResponse } from './workerProtocol'

/**
 * Fachada do Python Runner.
 *
 * Este é o único módulo que a aplicação usa para executar Python. Ele mantém um
 * Worker por sessão, garante que exista no máximo uma execução em andamento e
 * aplica o tempo limite — o Worker em si não sabe nada sobre isso.
 */

/**
 * Tempo limite da execução do código, contado só a partir do momento em que o
 * Python realmente começa a rodar. O download do runtime e dos pacotes usa o
 * limite separado abaixo, porque depende da rede e não do código do aluno.
 */
export const DEFAULT_EXECUTION_TIMEOUT_MS = 10_000

/** Limite generoso para o preparo, que evita um botão preso caso a CDN não responda. */
const PREPARATION_TIMEOUT_MS = 120_000

let worker: Worker | null = null
let nextRequestId = 1
let isRunning = false

function createWorker(): Worker {
  return new Worker(new URL('./pythonRunner.worker.ts', import.meta.url), {
    type: 'module',
    name: 'magnolia-python-runner',
  })
}

function getWorker(): Worker {
  if (!worker) {
    worker = createWorker()
  }

  return worker
}

/**
 * Descarta o Worker atual. Usado após um tempo limite, quando não há como
 * recuperar o interpretador: a próxima execução sobe uma instância nova.
 */
export function resetPythonRuntime(): void {
  worker?.terminate()
  worker = null
  isRunning = false
}

/** Indica se o runtime já está de pé, sem forçar o carregamento. */
export function isPythonRuntimeLoaded(): boolean {
  return worker !== null
}

function errorResult(error: ExecutionError, durationMs = 0): ExecutionResult {
  return { outcome: 'error', stdout: '', stderr: '', error, durationMs }
}

const BUSY_ERROR: ExecutionError = {
  kind: 'runtime',
  type: 'BusyError',
  message: 'Já existe uma execução em andamento. Aguarde ela terminar.',
}

function timeoutError(timeoutMs: number): ExecutionError {
  return {
    kind: 'timeout',
    type: 'TimeoutError',
    message: `A execução passou de ${Math.round(timeoutMs / 1000)} segundos e foi interrompida. Verifique se há um laço que nunca termina.`,
  }
}

const PREPARATION_ERROR: ExecutionError = {
  kind: 'runtime',
  type: 'PreparationTimeoutError',
  message:
    'Não foi possível preparar o Python no navegador. Verifique sua conexão e tente novamente.',
}

export function runPython(
  code: string,
  options: RunPythonOptions = {},
): Promise<ExecutionResult> {
  if (isRunning) {
    return Promise.resolve(errorResult(BUSY_ERROR))
  }

  const { packages = [], timeoutMs = DEFAULT_EXECUTION_TIMEOUT_MS, onStage } = options
  const requestId = nextRequestId++
  const activeWorker = getWorker()
  isRunning = true

  return new Promise<ExecutionResult>((resolve) => {
    let timer: number | undefined

    const settle = (result: ExecutionResult) => {
      window.clearTimeout(timer)
      activeWorker.removeEventListener('message', handleMessage)
      activeWorker.removeEventListener('error', handleWorkerFailure)
      isRunning = false
      resolve(result)
    }

    const abortWithTimeout = (error: ExecutionError) => {
      // Um laço infinito não devolve o controle ao Worker, então a única saída
      // é derrubá-lo. O runtime será recarregado na próxima execução.
      resetPythonRuntime()
      settle(errorResult(error))
    }

    function handleMessage(event: MessageEvent<WorkerResponse>) {
      const response = event.data

      if (response.requestId !== requestId) {
        return
      }

      if (response.kind === 'progress') {
        if (response.stage === 'running') {
          window.clearTimeout(timer)
          timer = window.setTimeout(
            () => abortWithTimeout(timeoutError(timeoutMs)),
            timeoutMs,
          )
        }

        onStage?.(response.stage)
        return
      }

      settle(response.result)
    }

    function handleWorkerFailure() {
      resetPythonRuntime()
      settle(
        errorResult({
          kind: 'runtime',
          type: 'WorkerError',
          message:
            'O ambiente de execução falhou ao iniciar. Recarregue a página e tente novamente.',
        }),
      )
    }

    activeWorker.addEventListener('message', handleMessage)
    activeWorker.addEventListener('error', handleWorkerFailure)

    timer = window.setTimeout(
      () => abortWithTimeout(PREPARATION_ERROR),
      PREPARATION_TIMEOUT_MS,
    )

    const request: WorkerRequest = { kind: 'run', requestId, code, packages }
    activeWorker.postMessage(request)
  })
}
