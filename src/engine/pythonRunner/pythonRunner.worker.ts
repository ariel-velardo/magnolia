/// <reference lib="webworker" />
import type { PyodideInterface } from 'pyodide'
import type { PyProxy } from 'pyodide/ffi'
import type {
  CaseObservation,
  VerificationResult,
  VerificationSpec,
} from '../testRunner/types'
import type { InitialVariables } from '../../types'
import { normalizeOutput } from './executionOutput'
import { PYODIDE_INDEX_URL } from './pyodideConfig'
import { cleanTraceback, extractErrorLine, summarizeTraceback } from './pythonError'
import { toExecutionError } from './pythonError'
import type { ExecutionError, ExecutionResult } from './types'
import { VERIFICATION_HARNESS } from './verificationHarness'
import type { WorkerRequest, WorkerResponse } from './workerProtocol'

/**
 * O Pyodide roda aqui, e não na página, por dois motivos: a interface continua
 * respondendo enquanto o runtime de ~10 MB é baixado, e um laço infinito no
 * código do aluno pode ser interrompido com worker.terminate() em vez de
 * travar a aba inteira.
 */

type PyodideModule = {
  loadPyodide: (options: { indexURL: string }) => Promise<PyodideInterface>
}

let runtimePromise: Promise<PyodideInterface> | null = null
const loadedPackages = new Set<string>()

function post(response: WorkerResponse): void {
  self.postMessage(response)
}

async function loadRuntime(): Promise<PyodideInterface> {
  // @vite-ignore mantém a URL da CDN como import em tempo de execução: o
  // Pyodide não deve ser resolvido nem pré-empacotado pelo bundler.
  const pyodideModule: PyodideModule = await import(
    /* @vite-ignore */ `${PYODIDE_INDEX_URL}pyodide.mjs`
  )

  return pyodideModule.loadPyodide({ indexURL: PYODIDE_INDEX_URL })
}

/**
 * Uma única instância por Worker, reaproveitada entre execuções. Se a carga
 * falhar, a promise é descartada para que a próxima tentativa possa recomeçar
 * em vez de repetir o erro guardado.
 */
function getRuntime(): Promise<PyodideInterface> {
  if (!runtimePromise) {
    runtimePromise = loadRuntime().catch((error: unknown) => {
      runtimePromise = null
      throw error
    })
  }

  return runtimePromise
}

/** Carrega apenas os pacotes que ainda não estão disponíveis nesta instância. */
async function ensurePackages(
  runtime: PyodideInterface,
  packages: readonly string[],
): Promise<void> {
  const missing = packages.filter((name) => !loadedPackages.has(name))

  if (missing.length === 0) {
    return
  }

  await runtime.loadPackage(missing)

  for (const name of missing) {
    loadedPackages.add(name)
  }
}

/**
 * O callback `batched` só entrega o buffer quando encontra uma quebra de linha,
 * então um print sem \n final ficaria retido sem este flush explícito.
 */
function flushStreams(runtime: PyodideInterface): void {
  try {
    runtime.runPython('import sys\nsys.stdout.flush()\nsys.stderr.flush()')
  } catch {
    // Um runtime já quebrado não deve mascarar o erro original do aluno.
  }
}

async function prepareRuntime(
  requestId: number,
  packages: readonly string[],
): Promise<PyodideInterface> {
  post({ kind: 'progress', requestId, stage: 'loading-runtime' })
  const runtime = await getRuntime()

  if (packages.length > 0) {
    post({ kind: 'progress', requestId, stage: 'loading-packages' })
    await ensurePackages(runtime, packages)
  }

  return runtime
}

async function execute(
  requestId: number,
  code: string,
  packages: readonly string[],
  initialVariables: InitialVariables | undefined,
): Promise<ExecutionResult> {
  const runtime = await prepareRuntime(requestId, packages)

  const stdoutChunks: string[] = []
  const stderrChunks: string[] = []

  runtime.setStdout({ batched: (chunk: string) => void stdoutChunks.push(chunk) })
  runtime.setStderr({ batched: (chunk: string) => void stderrChunks.push(chunk) })

  // Namespace próprio quando o exercício declara entrada: o código roda com as
  // mesmas variáveis do primeiro caso, sem que nada seja acrescentado ao texto
  // que o aluno escreveu — a linha de um erro continua sendo a linha do editor.
  const namespace = initialVariables ? createNamespace(runtime, initialVariables) : undefined

  post({ kind: 'progress', requestId, stage: 'running' })
  const startedAt = performance.now()

  try {
    await runtime.runPythonAsync(code, namespace ? { globals: namespace } : undefined)
    flushStreams(runtime)

    return {
      outcome: 'success',
      stdout: normalizeOutput(stdoutChunks),
      stderr: normalizeOutput(stderrChunks),
      durationMs: Math.round(performance.now() - startedAt),
    }
  } catch (error: unknown) {
    flushStreams(runtime)

    return {
      outcome: 'error',
      stdout: normalizeOutput(stdoutChunks),
      stderr: normalizeOutput(stderrChunks),
      error: toExecutionError(error),
      durationMs: Math.round(performance.now() - startedAt),
    }
  } finally {
    runtime.setStdout({})
    runtime.setStderr({})
    namespace?.destroy()
  }
}

/**
 * O harness é injetado uma vez por instância do Pyodide. Ele não guarda estado
 * entre chamadas: cada caso cria o seu próprio namespace.
 */
let isHarnessInstalled = false

function installHarness(runtime: PyodideInterface): void {
  if (!isHarnessInstalled) {
    runtime.runPython(VERIFICATION_HARNESS)
    isHarnessInstalled = true
  }
}

/**
 * Monta o dicionário de globais da execução livre pelo próprio harness, que já
 * sabe decodificar os valores declarados pelo conteúdo — inclusive o marcador
 * de ndarray.
 */
function createNamespace(
  runtime: PyodideInterface,
  initialVariables: InitialVariables,
): PyProxy {
  installHarness(runtime)

  const build = runtime.globals.get('_magnolia_namespace') as (
    initialJson: string,
  ) => PyProxy

  return build(JSON.stringify(initialVariables))
}

/** Traceback do Python vindo do harness já vira erro estruturado aqui. */
function toStructuredError(rawTraceback: string): ExecutionError {
  const traceback = cleanTraceback(rawTraceback)
  const summary = summarizeTraceback(traceback)

  return {
    kind: 'python',
    type: summary.type,
    message: summary.message,
    traceback,
    line: extractErrorLine(traceback),
  }
}

interface RawObservation {
  id: string
  stdout?: string
  variables?: Record<string, NonNullable<CaseObservation['returned']> | null>
  returned?: CaseObservation['returned']
  traceback?: string
  missingEntryPoint?: boolean
}

type RawVerification =
  | { outcome: 'execution-error'; traceback: string }
  | { outcome: 'missing-entry-point'; entryPoint: string }
  | { outcome: 'observed'; cases: RawObservation[] }

async function verify(
  requestId: number,
  code: string,
  packages: readonly string[],
  spec: VerificationSpec,
): Promise<VerificationResult> {
  const runtime = await prepareRuntime(requestId, packages)
  installHarness(runtime)

  post({ kind: 'progress', requestId, stage: 'running' })
  const startedAt = performance.now()

  // O código do aluno e a especificação viajam como dados, nunca concatenados
  // em uma fonte Python: nada do que ele escreve é interpretado como parte do
  // harness.
  const verifyFunction = runtime.globals.get('_magnolia_verify') as (
    source: string,
    specJson: string,
  ) => string
  const raw = JSON.parse(verifyFunction(code, JSON.stringify(spec))) as RawVerification
  const durationMs = Math.round(performance.now() - startedAt)

  if (raw.outcome === 'execution-error') {
    return {
      observation: { outcome: 'execution-error', error: toStructuredError(raw.traceback) },
      durationMs,
    }
  }

  if (raw.outcome === 'missing-entry-point') {
    return {
      observation: { outcome: 'missing-entry-point', entryPoint: raw.entryPoint },
      durationMs,
    }
  }

  const cases: CaseObservation[] = raw.cases.map((observation) => ({
    id: observation.id,
    stdout: normalizeOutput([observation.stdout ?? '']),
    variables: observation.variables,
    returned: observation.returned,
    error: observation.traceback ? toStructuredError(observation.traceback) : undefined,
  }))

  return { observation: { outcome: 'observed', cases }, durationMs }
}

async function handleRequest(request: WorkerRequest): Promise<void> {
  try {
    if (request.kind === 'verify') {
      const result = await verify(
        request.requestId,
        request.code,
        request.packages,
        request.spec,
      )
      post({ kind: 'verification', requestId: request.requestId, result })
      return
    }

    const result = await execute(
      request.requestId,
      request.code,
      request.packages,
      request.initialVariables,
    )
    post({ kind: 'result', requestId: request.requestId, result })
  } catch (error: unknown) {
    // Falhas antes da execução — baixar o runtime ou um pacote — chegam aqui.
    const failure = toExecutionError(error)

    if (request.kind === 'verify') {
      post({
        kind: 'verification',
        requestId: request.requestId,
        result: {
          observation: { outcome: 'execution-error', error: failure },
          durationMs: 0,
        },
      })
      return
    }

    post({
      kind: 'result',
      requestId: request.requestId,
      result: {
        outcome: 'error',
        stdout: '',
        stderr: '',
        error: failure,
        durationMs: 0,
      },
    })
  }
}

self.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  void handleRequest(event.data)
})
