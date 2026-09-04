export type TrackId = 'programming' | 'data-science'

export type Difficulty =
  | 'Fundamentos'
  | 'Fácil'
  | 'Fácil+'
  | 'Intermediário I'
  | 'Intermediário II'
  | 'Intermediário III'
  | 'Avançado'

export interface Topic {
  readonly id: string
  readonly trackId: TrackId
  readonly title: string
  readonly description: string
  readonly order: number
  readonly difficulty: Difficulty
  readonly estimatedMinutes: number
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
  readonly code: string
  readonly output?: string
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
  readonly concept: string
  readonly explanation: readonly string[]
  readonly examples: readonly LessonExample[]
  readonly commonMistakes: readonly string[]
  readonly relatedExerciseIds: readonly string[]
}

export interface ExerciseExample {
  readonly input: string
  readonly output: string
  readonly explanation?: string
}

export interface Hint {
  readonly id: string
  readonly order: number
  readonly text: string
}

export interface Exercise {
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

export type LearningItem =
  | { readonly type: 'lesson'; readonly item: Lesson }
  | { readonly type: 'exercise'; readonly item: Exercise }
