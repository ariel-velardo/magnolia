/**
 * Versão e origem do Pyodide.
 *
 * O runtime (~10 MB) e os pacotes são servidos pela CDN oficial em vez de
 * entrarem no bundle: manter dezenas de megabytes de WASM no repositório
 * pesaria muito mais do que a dependência de rede na primeira execução.
 *
 * O pacote `pyodide` está instalado como devDependency apenas para fornecer os
 * tipos; nada dele entra no bundle. Ao atualizar a versão aqui, atualize também
 * a dependência para que os tipos continuem correspondendo ao runtime.
 */
export const PYODIDE_VERSION = '314.0.6'

export const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
