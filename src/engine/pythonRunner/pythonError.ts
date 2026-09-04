import type { ExecutionError } from './types'

/**
 * Normalização de erros do Python.
 *
 * O Pyodide entrega o traceback completo, incluindo os quadros do próprio
 * runtime (`_pyodide/_base.py`), que não dizem nada ao aluno e escondem a
 * linha que realmente falhou. Estas funções são puras justamente para poderem
 * ser testadas sem carregar o WASM.
 */

/** Quadros do runtime do Pyodide, que não pertencem ao código do aluno. */
const INTERNAL_FRAME = /^\s*File "(?:\/lib\/python[^"]*|[^"]*_pyodide[^"]*)"/
/** Arquivos virtuais usados pelo Pyodide para o código avaliado: <exec>, <string>. */
const STUDENT_FRAME_LINE = /File "<[^"]*>", line (\d+)/g
const EXCEPTION_WITH_MESSAGE = /^([A-Za-z_][\w.]*(?:Error|Exception|Warning|Interrupt|Exit)?)\s*:\s*([\s\S]*)$/
const BARE_EXCEPTION = /^([A-Za-z_][\w.]*)$/

function toLines(text: string): string[] {
  return text.replace(/\r\n?/g, '\n').split('\n')
}

/**
 * Remove os quadros internos do Pyodide e as linhas de código que os
 * acompanham, preservando o restante do traceback como o Python o escreveu.
 */
export function cleanTraceback(rawTraceback: string): string {
  const lines = toLines(rawTraceback)
  const kept: string[] = []
  let insideInternalFrame = false

  for (const line of lines) {
    if (INTERNAL_FRAME.test(line)) {
      insideInternalFrame = true
      continue
    }

    // Linhas de código e marcadores (^^^^) pertencentes ao quadro descartado.
    if (insideInternalFrame && /^\s{4,}\S/.test(line) && !/^\s*File "/.test(line)) {
      continue
    }

    insideInternalFrame = false
    kept.push(line)
  }

  const cleaned = kept.join('\n').trim()

  // Se a limpeza não deixou nada além do cabeçalho, o traceback original é
  // mais útil do que uma casca vazia.
  return cleaned.replace(/^Traceback \(most recent call last\):$/, '').trim().length > 0
    ? cleaned
    : rawTraceback.trim()
}

/**
 * Extrai o nome da exceção e a mensagem curta do traceback.
 *
 * A busca é de trás para frente pela última linha sem indentação que tenha a
 * forma `Exceção: mensagem`, e não simplesmente pela última linha do texto:
 * algumas exceções do Pyodide acrescentam linhas de orientação depois da
 * mensagem, e é a linha da exceção que interessa ao aluno.
 */
export function summarizeTraceback(traceback: string): {
  type: string
  message: string
} {
  const lines = toLines(traceback).filter((line) => line.trim().length > 0)

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index]

    // Linhas indentadas são quadros do traceback ou trechos de código.
    if (/^\s/.test(line)) {
      continue
    }

    const withMessage = EXCEPTION_WITH_MESSAGE.exec(line)

    if (withMessage) {
      return { type: withMessage[1], message: withMessage[2].trim() }
    }

    const bare = BARE_EXCEPTION.exec(line.trim())

    if (bare) {
      return { type: bare[1], message: '' }
    }
  }

  const lastLine = (lines[lines.length - 1] ?? '').trim()

  return {
    type: 'Error',
    message: lastLine || 'O Python não informou detalhes sobre a falha.',
  }
}

/**
 * Última linha do código do aluno mencionada no traceback — é a que interessa,
 * porque quadros mais internos costumam ser de funções chamadas por ele.
 */
export function extractErrorLine(traceback: string): number | undefined {
  const matches = [...traceback.matchAll(STUDENT_FRAME_LINE)]
  const lastMatch = matches[matches.length - 1]

  if (!lastMatch) {
    return undefined
  }

  const line = Number(lastMatch[1])

  return Number.isFinite(line) ? line : undefined
}

interface PythonErrorLike {
  readonly type: string
  readonly message: string
}

/**
 * O erro do Pyodide chega como uma instância de PythonError com o campo `type`.
 * A checagem é estrutural para o módulo continuar puro e testável.
 */
export function isPythonError(value: unknown): value is PythonErrorLike {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as {
    name?: unknown
    type?: unknown
    message?: unknown
  }

  return (
    candidate.name === 'PythonError' &&
    typeof candidate.type === 'string' &&
    typeof candidate.message === 'string'
  )
}

/** Converte qualquer falha capturada durante a execução em um erro estruturado. */
export function toExecutionError(error: unknown): ExecutionError {
  if (isPythonError(error)) {
    const traceback = cleanTraceback(error.message)
    const summary = summarizeTraceback(traceback)

    return {
      kind: 'python',
      type: error.type || summary.type,
      message: summary.message,
      traceback,
      line: extractErrorLine(traceback),
    }
  }

  if (error instanceof Error) {
    return {
      kind: 'runtime',
      type: error.name || 'Error',
      message: error.message || 'Falha inesperada ao executar o código.',
    }
  }

  return {
    kind: 'runtime',
    type: 'Error',
    message: String(error),
  }
}
