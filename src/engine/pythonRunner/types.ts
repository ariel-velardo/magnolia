/**
 * Tipos do domínio de execução de Python.
 *
 * Nenhum deles conhece React ou Pyodide: a interface consome resultados
 * estruturados e o runner é livre para mudar de estratégia (main thread,
 * Worker, backend) sem alterar quem apresenta o resultado.
 */

/** Etapa atual de uma execução, usada para dar estado visível ao botão. */
export type ExecutionStage = 'loading-runtime' | 'loading-packages' | 'running'

/** Origem da falha, para a interface saber o que dizer ao aluno. */
export type ExecutionErrorKind = 'python' | 'timeout' | 'runtime'

export interface ExecutionError {
  /** Se o erro veio do código do aluno, do tempo limite ou do ambiente. */
  readonly kind: ExecutionErrorKind
  /** Nome da exceção: NameError, SyntaxError, TimeoutError, ... */
  readonly type: string
  /** Mensagem curta, já sem o traceback. */
  readonly message: string
  /** Traceback do Python sem os quadros internos do Pyodide. */
  readonly traceback?: string
  /** Linha do código do aluno em que o erro ocorreu, quando identificável. */
  readonly line?: number
}

export interface ExecutionResult {
  readonly outcome: 'success' | 'error'
  readonly stdout: string
  readonly stderr: string
  readonly error?: ExecutionError
  readonly durationMs: number
}

export interface RunPythonOptions {
  /** Pacotes Python exigidos pelo exercício, por exemplo ['numpy']. */
  readonly packages?: readonly string[]
  /** Tempo limite da execução em si — não cobre o download do runtime. */
  readonly timeoutMs?: number
  /** Notifica a interface a cada etapa do fluxo. */
  readonly onStage?: (stage: ExecutionStage) => void
}
