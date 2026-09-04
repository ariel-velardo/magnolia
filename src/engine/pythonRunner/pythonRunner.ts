import type { VerificationResult, VerificationSpec } from '../testRunner/types'
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

/**
 * A verificação roda o código do aluno uma vez por caso, então recebe um limite
 * proporcionalmente maior — ainda curto o bastante para interromper um laço
 * infinito sem que a página pareça travada.
 */
export const DEFAULT_VERIFICATION_TIMEOUT_MS = 20_000

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

/**
 * Envia um pedido ao Worker e aplica as regras que valem para qualquer trabalho
 * Python: uma execução por vez, tempo limite contado só a partir do momento em
 * que o Python começa a rodar, e Worker derrubado quando o limite estoura.
 *
 * `onTimeout` e `onFailure` existem porque executar e verificar têm formatos de
 * resultado diferentes — a política de tempo limite, não.
 */
function dispatch<TResult>(
  buildRequest: (requestId: number) => WorkerRequest,
  options: {
    readonly timeoutMs: number
    readonly onStage?: RunPythonOptions['onStage']
    readonly accept: (response: WorkerResponse) => TResult | undefined
    readonly onFailure: (error: ExecutionError) => TResult
  },
): Promise<TResult> {
  const requestId = nextRequestId++
  const activeWorker = getWorker()
  isRunning = true

  return new Promise<TResult>((resolve) => {
    let timer: number | undefined

    const settle = (result: TResult) => {
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
      settle(options.onFailure(error))
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
            () => abortWithTimeout(timeoutError(options.timeoutMs)),
            options.timeoutMs,
          )
        }

        options.onStage?.(response.stage)
        return
      }

      const accepted = options.accept(response)

      if (accepted !== undefined) {
        settle(accepted)
      }
    }

    function handleWorkerFailure() {
      resetPythonRuntime()
      settle(
        options.onFailure({
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

    activeWorker.postMessage(buildRequest(requestId))
  })
}

export function runPython(
  code: string,
  options: RunPythonOptions = {},
): Promise<ExecutionResult> {
  if (isRunning) {
    return Promise.resolve(errorResult(BUSY_ERROR))
  }

  const {
    packages = [],
    timeoutMs = DEFAULT_EXECUTION_TIMEOUT_MS,
    onStage,
    initialVariables,
  } = options

  return dispatch<ExecutionResult>(
    (requestId) => ({ kind: 'run', requestId, code, packages, initialVariables }),
    {
      timeoutMs,
      onStage,
      accept: (response) => (response.kind === 'result' ? response.result : undefined),
      onFailure: (error) => errorResult(error),
    },
  )
}

/**
 * Roda os casos de teste de um exercício. Devolve observações brutas: quem
 * decide se cada caso passou é o test runner, em TypeScript puro.
 */
export function verifyPython(
  code: string,
  spec: VerificationSpec,
  options: RunPythonOptions = {},
): Promise<VerificationResult> {
  if (isRunning) {
    return Promise.resolve({
      observation: { outcome: 'execution-error', error: BUSY_ERROR },
      durationMs: 0,
    })
  }

  const { packages = [], timeoutMs = DEFAULT_VERIFICATION_TIMEOUT_MS, onStage } = options

  return dispatch<VerificationResult>(
    (requestId) => ({ kind: 'verify', requestId, code, packages, spec }),
    {
      timeoutMs,
      onStage,
      accept: (response) => (response.kind === 'verification' ? response.result : undefined),
      onFailure: (error) => ({
        observation: { outcome: 'execution-error', error },
        durationMs: 0,
      }),
    },
  )
}
