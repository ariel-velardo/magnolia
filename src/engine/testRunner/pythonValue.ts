import type {
  InitialVariables,
  NdarrayArgument,
  TestArgument,
  TestValue,
} from '../../types'

/**
 * Representação de um valor Python que atravessou o postMessage.
 *
 * O Worker codifica o valor com uma etiqueta de tipo em vez de entregar o valor
 * cru: assim a comparação acontece aqui, em TypeScript puro e testável, e não
 * dentro do Python — onde só daria para testar carregando o Pyodide inteiro.
 */
export type EncodedValue =
  | { readonly type: 'none' }
  | { readonly type: 'bool'; readonly value: boolean }
  | { readonly type: 'int'; readonly value: number }
  | { readonly type: 'float'; readonly value: number | null; readonly special?: 'nan' | 'inf' | '-inf' }
  | { readonly type: 'str'; readonly value: string }
  | { readonly type: 'list'; readonly items: readonly EncodedValue[] }
  | { readonly type: 'tuple'; readonly items: readonly EncodedValue[] }
  | { readonly type: 'ndarray'; readonly items: readonly EncodedValue[]; readonly dtype: string }
  | { readonly type: 'unsupported'; readonly display: string; readonly pythonType: string }

/** Texto exibido ao aluno para um valor recebido do Python. */
export function describeEncodedValue(value: EncodedValue): string {
  switch (value.type) {
    case 'none':
      return 'None'
    case 'bool':
      return value.value ? 'True' : 'False'
    case 'int':
      return String(value.value)
    case 'float':
      if (value.special) {
        return value.special === 'nan' ? 'nan' : value.special
      }

      return formatFloat(value.value ?? 0)
    case 'str':
      return JSON.stringify(value.value).replace(/^"|"$/g, "'")
    case 'list':
      return `[${value.items.map(describeEncodedValue).join(', ')}]`
    case 'tuple':
      return `(${value.items.map(describeEncodedValue).join(', ')})`
    case 'ndarray':
      return `array([${value.items.map(describeEncodedValue).join(', ')}])`
    case 'unsupported':
      return value.display
  }
}

/** Um float sem casas decimais ainda é float em Python: 37 vira 37.0. */
function formatFloat(value: number): string {
  return Number.isInteger(value) ? `${value}.0` : String(value)
}

/**
 * Texto exibido para um valor declarado no conteúdo. Usa a mesma notação do
 * Python para que "esperado" e "recebido" sejam comparáveis a olho nu.
 *
 * `asFloat` existe porque JavaScript não distingue 37 de 37.0, mas o Python
 * distingue — e o conteúdo sinaliza essa intenção declarando uma tolerância.
 * Sem isso, o exemplo diria "37" onde a função devolve "37.0".
 */
export function describeTestValue(value: TestValue, asFloat = false): string {
  if (value === null) {
    return 'None'
  }

  if (typeof value === 'boolean') {
    return value ? 'True' : 'False'
  }

  if (typeof value === 'number') {
    return asFloat ? formatFloat(value) : String(value)
  }

  if (typeof value === 'string') {
    return JSON.stringify(value).replace(/^"|"$/g, "'")
  }

  return `[${value.map((item) => describeTestValue(item, asFloat)).join(', ')}]`
}

function isNdarrayArgument(value: TestArgument): value is NdarrayArgument {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Notação de um argumento, incluindo os que viram np.array no Python. */
export function describeArgument(value: TestArgument): string {
  if (isNdarrayArgument(value)) {
    return `np.array([${value.items.map((item) => describeTestValue(item)).join(', ')}])`
  }

  return describeTestValue(value)
}

/**
 * Reproduz o estado inicial de um caso de script na notação do Python, para o
 * enunciado dizer com que valores aquele caso roda: `temperatura = 8`.
 */
export function describeInitialVariables(variables: InitialVariables): string {
  return Object.entries(variables)
    .map(([name, value]) => `${name} = ${describeArgument(value)}`)
    .join(', ')
}

/** Reproduz a chamada que o test runner fará, para exibir no exemplo público. */
export function describeFunctionCall(
  entryPoint: string,
  args: readonly TestArgument[],
): string {
  return `${entryPoint}(${args.map(describeArgument).join(', ')})`
}
