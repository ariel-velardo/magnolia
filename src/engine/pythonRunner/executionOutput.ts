/**
 * Normalização da saída capturada durante a execução.
 *
 * O Pyodide entrega stdout em pedaços já quebrados por linha (sem o \n final),
 * então a junção acontece aqui — e não na interface, que só recebe texto pronto.
 */

/** Junta os pedaços capturados em um único texto, sem quebras sobrando no fim. */
export function normalizeOutput(chunks: readonly string[]): string {
  return chunks
    .join('\n')
    .replace(/\r\n?/g, '\n')
    .replace(/\n+$/, '')
}

/**
 * Um código pode terminar sem erro e sem imprimir nada. Isso não diz nada sobre
 * a solução estar certa — apenas que não houve saída para mostrar.
 */
export function hasVisibleOutput(output: string): boolean {
  return output.length > 0
}
