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

export interface ExerciseExample {
  /**
   * A chamada que produz o resultado, em exercícios de função. Exercícios de
   * script não têm entrada: o exemplo é só a saída esperada do programa.
   */
  readonly input?: string
  readonly output: string
  readonly explanation?: string
}

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
  readonly examples: readonly ExerciseExample[]
  readonly hints: readonly Hint[]
  readonly skill: string
  readonly packages: readonly string[]
}

export interface ScriptExercise extends ExerciseBase {
  readonly executionMode: 'script'
}

export interface FunctionExercise extends ExerciseBase {
  readonly executionMode: 'function'
  /**
   * Nome da função que o aluno deve implementar. O test runner da Fase 3 vai
   * chamá-la; até lá, serve para a interface orientar o aluno e para o catálogo
   * conferir que ela aparece no starter code.
   */
  readonly entryPoint: string
}

/**
 * União discriminada de propósito: `entryPoint` existe apenas onde faz sentido.
 * Um exercício de script não tem como declará-lo por engano, e o avaliador da
 * Fase 3 é obrigado pelo compilador a tratar os dois casos.
 */
export type Exercise = ScriptExercise | FunctionExercise

export type LearningItem =
  | { readonly type: 'lesson'; readonly item: Lesson }
  | { readonly type: 'exercise'; readonly item: Exercise }
