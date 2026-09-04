import { describe, expect, it } from 'vitest'
import {
  cleanTraceback,
  extractErrorLine,
  isPythonError,
  summarizeTraceback,
  toExecutionError,
} from '../src/engine/pythonRunner/pythonError'

/**
 * Tracebacks reais do Pyodide: o traceback do aluno vem embrulhado pelos
 * quadros de `_pyodide/_base.py`, que precisam sair antes de a mensagem chegar
 * à interface.
 */
const NAME_ERROR_TRACEBACK = `Traceback (most recent call last):
  File "/lib/python314.zip/_pyodide/_base.py", line 596, in eval_code_async
    await CodeRunner(
    ...<3 lines>...
    ).run_async(globals, locals)
  File "/lib/python314.zip/_pyodide/_base.py", line 411, in run_async
    coroutine = eval(self.code, globals, locals)
                     ^^^^^^^^^
  File "<exec>", line 2, in <module>
NameError: name 'total' is not defined`

const SYNTAX_ERROR_TRACEBACK = `Traceback (most recent call last):
  File "/lib/python314.zip/_pyodide/_base.py", line 596, in eval_code_async
    await CodeRunner(
  File "/lib/python314.zip/_pyodide/_base.py", line 141, in _parse_and_compile_gen
    mod = compile(source, filename, mode, flags | ast.PyCF_ONLY_AST)
  File "<exec>", line 1
    print("Olá, Magnolia"
         ^
SyntaxError: '(' was never closed`

function pythonError(type: string, message: string) {
  const error = new Error(message)
  error.name = 'PythonError'
  return Object.assign(error, { type })
}

describe('cleanTraceback', () => {
  it('remove os quadros internos do Pyodide e mantém o do aluno', () => {
    const cleaned = cleanTraceback(NAME_ERROR_TRACEBACK)

    expect(cleaned).not.toContain('_pyodide')
    expect(cleaned).not.toContain('eval_code_async')
    expect(cleaned).not.toContain('coroutine = eval')
    expect(cleaned).toContain('File "<exec>", line 2, in <module>')
    expect(cleaned).toContain("NameError: name 'total' is not defined")
  })

  it('preserva o trecho de código e o marcador de um SyntaxError', () => {
    const cleaned = cleanTraceback(SYNTAX_ERROR_TRACEBACK)

    expect(cleaned).not.toContain('_base.py')
    expect(cleaned).toContain('print("Olá, Magnolia"')
    expect(cleaned).toContain('^')
    expect(cleaned).toContain("SyntaxError: '(' was never closed")
  })

  it('normaliza quebras de linha do Windows', () => {
    const cleaned = cleanTraceback('Traceback (most recent call last):\r\nValueError: x\r\n')

    expect(cleaned).toBe('Traceback (most recent call last):\nValueError: x')
  })

  it('mantém o traceback original quando a limpeza não deixaria nada útil', () => {
    const onlyInternal = `Traceback (most recent call last):
  File "/lib/python314.zip/_pyodide/_base.py", line 596, in eval_code_async
    await CodeRunner()`

    expect(cleanTraceback(onlyInternal)).toBe(onlyInternal.trim())
  })
})

describe('summarizeTraceback', () => {
  it('separa o tipo da exceção da mensagem', () => {
    expect(summarizeTraceback(NAME_ERROR_TRACEBACK)).toEqual({
      type: 'NameError',
      message: "name 'total' is not defined",
    })
  })

  it('lê um SyntaxError como qualquer outra exceção', () => {
    expect(summarizeTraceback(SYNTAX_ERROR_TRACEBACK)).toEqual({
      type: 'SyntaxError',
      message: "'(' was never closed",
    })
  })

  it('aceita exceções sem mensagem', () => {
    expect(summarizeTraceback('Traceback (most recent call last):\nKeyboardInterrupt')).toEqual({
      type: 'KeyboardInterrupt',
      message: '',
    })
  })

  it('não inventa um tipo quando a última linha não é uma exceção', () => {
    const summary = summarizeTraceback('algo totalmente inesperado')

    expect(summary.type).toBe('Error')
    expect(summary.message).toBe('algo totalmente inesperado')
  })

  it('descreve a falha mesmo com traceback vazio', () => {
    expect(summarizeTraceback('   \n  ').message.length).toBeGreaterThan(0)
  })
})

describe('summarizeTraceback com mensagens de várias linhas', () => {
  // O Pyodide acrescenta orientações depois da mensagem do ModuleNotFoundError.
  // Sem a busca de trás para frente, o aluno via só a linha do link.
  const MODULE_NOT_FOUND = `Traceback (most recent call last):
  File "<exec>", line 1, in <module>
ModuleNotFoundError: The module 'numpy' is included in the Pyodide distribution, but it is not installed.
You can install it by calling:
  await micropip.install("numpy") in Python, or
  await pyodide.loadPackage("numpy") in JavaScript
See https://pyodide.org/en/stable/usage/loading-packages.html for more details.`

  it('usa a linha da exceção, e não a última linha do texto', () => {
    const summary = summarizeTraceback(MODULE_NOT_FOUND)

    expect(summary.type).toBe('ModuleNotFoundError')
    expect(summary.message).toBe(
      "The module 'numpy' is included in the Pyodide distribution, but it is not installed.",
    )
    expect(summary.message).not.toContain('pyodide.org')
  })

  it('mantém a orientação completa no traceback', () => {
    expect(cleanTraceback(MODULE_NOT_FOUND)).toContain('micropip.install')
  })
})

describe('extractErrorLine', () => {
  it('encontra a linha do código do aluno', () => {
    expect(extractErrorLine(NAME_ERROR_TRACEBACK)).toBe(2)
    expect(extractErrorLine(SYNTAX_ERROR_TRACEBACK)).toBe(1)
  })

  it('usa o quadro mais recente quando há vários', () => {
    const nested = `  File "<exec>", line 7, in <module>
  File "<exec>", line 3, in calcular
IndexError: list index out of range`

    expect(extractErrorLine(nested)).toBe(3)
  })

  it('ignora caminhos de arquivos reais', () => {
    expect(extractErrorLine('  File "/lib/python314.zip/os.py", line 12')).toBeUndefined()
  })

  it('devolve undefined quando não há referência de linha', () => {
    expect(extractErrorLine('ValueError: entrada inválida')).toBeUndefined()
  })
})

describe('isPythonError', () => {
  it('reconhece o erro do Pyodide', () => {
    expect(isPythonError(pythonError('NameError', NAME_ERROR_TRACEBACK))).toBe(true)
  })

  it('rejeita erros comuns do JavaScript', () => {
    expect(isPythonError(new TypeError('boom'))).toBe(false)
    expect(isPythonError({ type: 'NameError', message: 'x' })).toBe(false)
    expect(isPythonError(null)).toBe(false)
    expect(isPythonError('NameError')).toBe(false)
  })
})

describe('toExecutionError', () => {
  it('estrutura um erro do Python com tipo, mensagem, linha e traceback', () => {
    const error = toExecutionError(pythonError('NameError', NAME_ERROR_TRACEBACK))

    expect(error.kind).toBe('python')
    expect(error.type).toBe('NameError')
    expect(error.message).toBe("name 'total' is not defined")
    expect(error.line).toBe(2)
    expect(error.traceback).not.toContain('_pyodide')
  })

  it('classifica falhas do ambiente como runtime', () => {
    const error = toExecutionError(new Error('Failed to fetch'))

    expect(error.kind).toBe('runtime')
    expect(error.type).toBe('Error')
    expect(error.message).toBe('Failed to fetch')
    expect(error.traceback).toBeUndefined()
  })

  it('nunca deixa a mensagem vazia', () => {
    expect(toExecutionError(new Error('')).message.length).toBeGreaterThan(0)
    expect(toExecutionError('falha estranha').message).toBe('falha estranha')
    expect(toExecutionError(undefined).message).toBe('undefined')
  })
})
