export type TrackId = 'programming' | 'data-science'

export type Difficulty =
  | 'Fundamentos'
  | 'Fácil'
  | 'Fácil+'
  | 'Intermediário I'
  | 'Intermediário II'
  | 'Intermediário III'
  | 'Avançado'

/**
 * Como o código do aluno é escrito — e, na Fase 3, como será avaliado.
 *
 * `script`: o aluno escreve instruções soltas, de cima para baixo, e o
 * resultado observável é a saída do programa. É o único modo possível antes de
 * o aluno aprender `def`.
 *
 * `function`: o aluno implementa uma função com nome definido pelo exercício.
 * Só faz sentido a partir do tópico que ensina Funções.
 */
export type ExecutionMode = 'script' | 'function'

export interface Topic {
  readonly id: string
  readonly trackId: TrackId
  readonly title: string
  readonly description: string
  readonly order: number
  readonly difficulty: Difficulty
  readonly estimatedMinutes: number
  /**
   * Tópicos que o aluno precisa ter percorrido antes deste. Normalmente é o
   * tópico anterior, mas alguns dependem de mais de um — comprehensions, por
   * exemplo, exigem listas e loops. Vazio no primeiro tópico da trilha.
   */
  readonly prerequisiteTopicIds: readonly string[]
  /**
   * Marca o tópico a partir do qual um modo de execução passa a ser permitido
   * na trilha. `script` vale desde o começo e não precisa ser declarado;
   * `function` é liberado no ponto em que o aluno já sabe escrever `def`, e o
   * catálogo recusa exercícios de função em tópicos anteriores a esse.
   */
  readonly unlocksExecutionMode?: ExecutionMode
}

export interface Track {
  readonly id: TrackId
  readonly title: string
  readonly description: string
  readonly order: number
  readonly topics: readonly Topic[]
}

export interface LessonExample {
  readonly title: string
  readonly description: string
  /** Código comentado: os comentários fazem parte da explicação. */
  readonly code: string
  readonly output?: string
}

/**
 * Um bloco de teoria da aula, com título próprio.
 *
 * A aula é uma sequência de seções em vez de um único texto corrido para que o
 * autor possa alternar explicação e exemplo quantas vezes o conceito exigir,
 * sem que a página precise conhecer o assunto.
 */
export interface LessonSection {
  readonly title: string
  readonly paragraphs: readonly string[]
  readonly examples?: readonly LessonExample[]
}

export interface Lesson {
  readonly id: string
  readonly trackId: TrackId
  readonly topicId: string
  readonly title: string
  readonly summary: string
  readonly order: number
  readonly estimatedMinutes: number
  readonly objectives: readonly string[]
  /** Resposta curta para "o que é?", antes de qualquer detalhe. */
  readonly concept: string
  readonly sections: readonly LessonSection[]
  readonly commonMistakes: readonly string[]
  readonly relatedExerciseIds: readonly string[]
}

/**
 * Valores que um caso de teste declara. Precisam atravessar o postMessage e
 * virar valor Python, então ficam restritos ao que o JSON representa — o que
 * cobre tudo o que o currículo atual exercita.
 */
export type TestValue = string | number | boolean | null | readonly TestValue[]

/**
 * Argumento que precisa chegar ao Python como `np.array(...)`, e não como
 * lista. Existe porque alguns exercícios de NumPy operam sobre arrays, e uma
 * lista comum se comportaria de outro jeito na mesma expressão.
 *
 * Vale para argumentos de função e para o estado inicial de um script. O valor
 * esperado continua sendo declarado como lista — o comparador aceita um ndarray
 * onde uma lista é esperada, já que o conteúdo declara os valores e não a
 * estrutura que os carrega.
 */
export interface NdarrayArgument {
  readonly kind: 'ndarray'
  readonly items: readonly TestValue[]
}

export type TestArgument = TestValue | NdarrayArgument

/**
 * Estado inicial de um caso de script: nomes já ligados a valores no momento em
 * que o código do aluno começa a rodar.
 *
 * É a entrada do exercício, no mesmo papel que `args` tem em um caso de função.
 * Sem ela, todo caso avaliaria o script com os mesmos valores literais escritos
 * no editor, e responder `classificacao = "agradável"` passaria — o exercício
 * mediria a leitura do enunciado, e não a solução.
 *
 * Os valores são dados declarados, nunca trechos de Python: reutilizam
 * `TestArgument`, então cobrem int, float, str, bool, None, listas e o marcador
 * de ndarray. O test runner os injeta diretamente no namespace, **sem**
 * concatenar nenhuma linha antes do código do aluno — o texto que ele escreveu
 * é o texto compilado, e a linha de um SyntaxError ou de um traceback continua
 * sendo a linha que ele vê no editor.
 */
export type InitialVariables = Readonly<Record<string, TestArgument>>

/**
 * Teste público mostra entrada, esperado e recebido; teste interno cobre casos
 * de limite e revela apenas o necessário.
 *
 * Como tudo roda no navegador, "interno" significa não exibido pela interface,
 * e não inacessível — a distinção é pedagógica, não de segurança.
 */
export type TestVisibility = 'public' | 'internal'

interface TestCaseBase {
  readonly id: string
  readonly visibility: TestVisibility
  /** Comentário curto exibido junto ao caso público. */
  readonly explanation?: string
}

export interface ExpectedVariable {
  /** Nome da variável no final da execução do script. */
  readonly name: string
  readonly value: TestValue
  /** Margem aceitável para valores de ponto flutuante. */
  readonly tolerance?: number
}

/**
 * Avalia um script pelo comportamento observável: o que ele imprimiu e em que
 * estado suas variáveis terminaram. Nunca pelo texto do código — duas soluções
 * diferentes que produzem o mesmo resultado são igualmente corretas.
 */
export interface ScriptTestCase extends TestCaseBase {
  /** Rótulo curto; em caso interno é a única informação exibida. */
  readonly label: string
  /**
   * Entrada do caso, injetada no namespace antes de o script rodar. Ausente nos
   * exercícios em que o próprio aluno cria os valores — um exercício de `print`
   * puro não ganha nada em variar a entrada.
   */
  readonly initialVariables?: InitialVariables
  readonly expectedStdout?: string
  readonly expectedVariables?: readonly ExpectedVariable[]
}

/** Chama o entryPoint com os argumentos declarados e compara o retorno. */
export interface FunctionTestCase extends TestCaseBase {
  readonly args: readonly TestArgument[]
  readonly expected: TestValue
  /** Margem aceitável para retornos de ponto flutuante. */
  readonly tolerance?: number
}

export type TestCase = ScriptTestCase | FunctionTestCase

export interface Hint {
  readonly id: string
  readonly order: number
  readonly text: string
}

interface ExerciseBase {
  readonly id: string
  readonly trackId: TrackId
  readonly topicId: string
  readonly title: string
  readonly description: string
  readonly order: number
  readonly estimatedMinutes: number
  readonly difficulty: Difficulty
  readonly instructions: readonly string[]
  readonly starterCode: string
  readonly hints: readonly Hint[]
  readonly skill: string
  readonly packages: readonly string[]
}

export interface ScriptExercise extends ExerciseBase {
  readonly executionMode: 'script'
  readonly tests: readonly ScriptTestCase[]
}

export interface FunctionExercise extends ExerciseBase {
  readonly executionMode: 'function'
  /**
   * Nome da função que o aluno deve implementar. O test runner a localiza no
   * namespace depois de executar o código e a chama diretamente — o aluno não
   * precisa escrever nenhuma chamada de teste.
   */
  readonly entryPoint: string
  readonly tests: readonly FunctionTestCase[]
}

/**
 * União discriminada de propósito: `entryPoint` e o formato dos testes existem
 * apenas onde fazem sentido. Um exercício de script não tem como declarar
 * `args` nem `entryPoint`, e um exercício de função não tem como declarar
 * `expectedStdout` como se fosse retorno. O avaliador é obrigado pelo
 * compilador a tratar os dois casos.
 */
export type Exercise = ScriptExercise | FunctionExercise

export type LearningItem =
  | { readonly type: 'lesson'; readonly item: Lesson }
  | { readonly type: 'exercise'; readonly item: Exercise }
