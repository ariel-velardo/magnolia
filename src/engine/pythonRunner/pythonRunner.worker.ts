/// <reference lib="webworker" />
import type { PyodideInterface } from 'pyodide'
import { normalizeOutput } from './executionOutput'
import { PYODIDE_INDEX_URL } from './pyodideConfig'
import { toExecutionError } from './pythonError'
import type { ExecutionResult } from './types'
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

async function execute(
  requestId: number,
  code: string,
  packages: readonly string[],
): Promise<ExecutionResult> {
  post({ kind: 'progress', requestId, stage: 'loading-runtime' })
  const runtime = await getRuntime()

  if (packages.length > 0) {
    post({ kind: 'progress', requestId, stage: 'loading-packages' })
    await ensurePackages(runtime, packages)
  }

  const stdoutChunks: string[] = []
  const stderrChunks: string[] = []

  runtime.setStdout({ batched: (chunk: string) => void stdoutChunks.push(chunk) })
  runtime.setStderr({ batched: (chunk: string) => void stderrChunks.push(chunk) })

  post({ kind: 'progress', requestId, stage: 'running' })
  const startedAt = performance.now()

  try {
    await runtime.runPythonAsync(code)
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
  }
}

async function handleRequest(request: WorkerRequest): Promise<void> {
  try {
    const result = await execute(request.requestId, request.code, request.packages)
    post({ kind: 'result', requestId: request.requestId, result })
  } catch (error: unknown) {
    // Falhas antes da execução — baixar o runtime ou um pacote — chegam aqui.
    post({
      kind: 'result',
      requestId: request.requestId,
      result: {
        outcome: 'error',
        stdout: '',
        stderr: '',
        error: toExecutionError(error),
        durationMs: 0,
      },
    })
  }
}

self.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  void handleRequest(event.data)
})
