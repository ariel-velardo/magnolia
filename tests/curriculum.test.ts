import { describe, expect, it } from 'vitest'
import { exercises, getTopicById, lessons, topics, tracks } from '../src/content/catalog'
import type { Topic } from '../src/types'

/**
 * Regras curriculares da trilha, e não apenas de forma dos dados.
 *
 * O caso que originou estes testes: "Apresentando um perfil" pedia `def` dentro
 * do tópico de Variáveis, muito antes de Funções existir. Os tipos não pegavam
 * isso, e nenhuma checagem existia.
 */

function programmingTopics(): readonly Topic[] {
  return topics.filter((topic) => topic.trackId === 'programming')
}

describe('ordem dos tópicos', () => {
  it('não repete a ordem dentro de uma trilha', () => {
    for (const track of tracks) {
      const orders = track.topics.map((topic) => topic.order)

      expect(new Set(orders).size).toBe(orders.length)
    }
  })

  it('mantém todo pré-requisito antes do tópico que depende dele', () => {
    for (const topic of topics) {
      for (const prerequisiteId of topic.prerequisiteTopicIds) {
        const prerequisite = getTopicById(prerequisiteId)

        expect(prerequisite, `pré-requisito "${prerequisiteId}" não existe`).toBeDefined()
        expect(prerequisite?.trackId).toBe(topic.trackId)
        expect(prerequisite?.order).toBeLessThan(topic.order)
      }
    }
  })

  it('começa a trilha de Programação por Primeiros passos, sem pré-requisitos', () => {
    const first = programmingTopics()[0]

    expect(first?.id).toBe('programming-first-steps')
    expect(first?.prerequisiteTopicIds).toEqual([])
  })
})

describe('modo de execução dos exercícios', () => {
  it('não pede função antes do tópico que ensina funções', () => {
    for (const track of tracks) {
      const unlockTopic = track.topics.find(
        (topic) => topic.unlocksExecutionMode === 'function',
      )
      const functionExercises = exercises.filter(
        (exercise) =>
          exercise.trackId === track.id && exercise.executionMode === 'function',
      )

      if (functionExercises.length === 0) {
        continue
      }

      expect(
        unlockTopic,
        `a trilha "${track.id}" tem exercício de função sem tópico que a libere`,
      ).toBeDefined()

      for (const exercise of functionExercises) {
        const topic = getTopicById(exercise.topicId)

        expect(
          topic?.order,
          `"${exercise.id}" pede função em "${exercise.topicId}"`,
        ).toBeGreaterThanOrEqual(unlockTopic?.order ?? 0)
      }
    }
  })

  it('mantém como script toda prática dos fundamentos de Programação', () => {
    const foundationTopicIds = [
      'programming-first-steps',
      'programming-variables',
      'programming-operators',
      'programming-conditionals',
      'programming-lists',
      'programming-loops',
    ]

    for (const exercise of exercises) {
      if (foundationTopicIds.includes(exercise.topicId)) {
        expect(exercise.executionMode, `"${exercise.id}" deveria ser script`).toBe('script')
      }
    }
  })

  it('não usa def no starter code de um exercício de script', () => {
    for (const exercise of exercises) {
      if (exercise.executionMode === 'script') {
        expect(
          /\bdef\s+\w+\s*\(/.test(exercise.starterCode),
          `"${exercise.id}" é script mas o starter code define uma função`,
        ).toBe(false)
      }
    }
  })

  it('define no starter code a função declarada como entryPoint', () => {
    for (const exercise of exercises) {
      if (exercise.executionMode === 'function') {
        expect(
          new RegExp(`\\bdef\\s+${exercise.entryPoint}\\s*\\(`).test(exercise.starterCode),
          `"${exercise.id}" não define ${exercise.entryPoint} no starter code`,
        ).toBe(true)
      }
    }
  })

  it('só usa exemplo com chamada em exercício de função', () => {
    for (const exercise of exercises) {
      if (exercise.executionMode === 'script') {
        for (const example of exercise.examples) {
          expect(
            example.input,
            `"${exercise.id}" é script e não deveria ter chamada de entrada`,
          ).toBeUndefined()
        }
      }
    }
  })
})

describe('densidade pedagógica', () => {
  it('dá pelo menos uma aula a cada tópico que já tem exercício', () => {
    const topicsWithExercises = new Set(exercises.map((exercise) => exercise.topicId))

    for (const topicId of topicsWithExercises) {
      const topicLessons = lessons.filter((lesson) => lesson.topicId === topicId)

      expect(topicLessons.length, `tópico "${topicId}" não tem aula`).toBeGreaterThan(0)
    }
  })

  it('escreve as aulas em seções, com teoria suficiente antes da prática', () => {
    for (const lesson of lessons) {
      expect(lesson.sections.length, `aula "${lesson.id}"`).toBeGreaterThanOrEqual(2)

      for (const section of lesson.sections) {
        expect(section.title.length, `aula "${lesson.id}"`).toBeGreaterThan(0)
        expect(section.paragraphs.length, `aula "${lesson.id}"`).toBeGreaterThan(0)
      }
    }
  })

  it('mostra pelo menos um exemplo de código em cada aula', () => {
    for (const lesson of lessons) {
      const exampleCount = lesson.sections.reduce(
        (total, section) => total + (section.examples?.length ?? 0),
        0,
      )

      expect(exampleCount, `aula "${lesson.id}" não tem exemplo`).toBeGreaterThan(0)
    }
  })

  it('dá dicas progressivas e numeradas em todo exercício', () => {
    for (const exercise of exercises) {
      expect(exercise.hints.length, `"${exercise.id}"`).toBeGreaterThanOrEqual(2)
      expect(exercise.hints.map((hint) => hint.order)).toEqual(
        exercise.hints.map((_, index) => index + 1),
      )
    }
  })

  it('cobre os fundamentos de Programação com prática suficiente', () => {
    const demonstratedTopicIds = [
      'programming-first-steps',
      'programming-variables',
      'programming-operators',
    ]

    for (const topicId of demonstratedTopicIds) {
      const topicExercises = exercises.filter((exercise) => exercise.topicId === topicId)

      expect(topicExercises.length, `tópico "${topicId}"`).toBeGreaterThanOrEqual(4)
    }
  })
})
