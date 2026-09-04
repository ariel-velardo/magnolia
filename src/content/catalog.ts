import trackDefinitions from '../../content/tracks'
import type {
  Exercise,
  LearningItem,
  Lesson,
  Topic,
  Track,
  TrackId,
} from '../types'

const lessonModules = import.meta.glob<Lesson>(
  '../../content/*/lessons/*.ts',
  { eager: true, import: 'default' },
)

const exerciseModules = import.meta.glob<Exercise>(
  '../../content/*/exercises/*.ts',
  { eager: true, import: 'default' },
)

export const tracks: readonly Track[] = [...trackDefinitions].sort(
  (first, second) => first.order - second.order,
)

export const topics: readonly Topic[] = tracks
  .flatMap((track) => track.topics)
  .sort((first, second) => {
    const trackDifference = getTrackOrder(first.trackId) - getTrackOrder(second.trackId)
    return trackDifference || first.order - second.order
  })

const topicOrder = new Map(topics.map((topic) => [topic.id, topic.order]))

function getTrackOrder(trackId: TrackId): number {
  return tracks.find((track) => track.id === trackId)?.order ?? Number.MAX_SAFE_INTEGER
}

function compareContent(
  first: Pick<Lesson | Exercise, 'trackId' | 'topicId' | 'order'>,
  second: Pick<Lesson | Exercise, 'trackId' | 'topicId' | 'order'>,
): number {
  const trackDifference = getTrackOrder(first.trackId) - getTrackOrder(second.trackId)

  if (trackDifference !== 0) {
    return trackDifference
  }

  const topicDifference =
    (topicOrder.get(first.topicId) ?? Number.MAX_SAFE_INTEGER) -
    (topicOrder.get(second.topicId) ?? Number.MAX_SAFE_INTEGER)

  return topicDifference || first.order - second.order
}

export const lessons: readonly Lesson[] = Object.values(lessonModules).sort(compareContent)

export const exercises: readonly Exercise[] = Object.values(exerciseModules).sort(compareContent)

export function getTrackById(trackId: TrackId | string): Track | undefined {
  return tracks.find((track) => track.id === trackId)
}

export function getTopicById(topicId: string): Topic | undefined {
  return topics.find((topic) => topic.id === topicId)
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === lessonId)
}

export function getExerciseById(exerciseId: string): Exercise | undefined {
  return exercises.find((exercise) => exercise.id === exerciseId)
}

export function getLessonsByTrack(trackId: TrackId): Lesson[] {
  return lessons.filter((lesson) => lesson.trackId === trackId)
}

export function getExercisesByTrack(trackId: TrackId): Exercise[] {
  return exercises.filter((exercise) => exercise.trackId === trackId)
}

export function getLessonsByTopic(topicId: string): Lesson[] {
  return lessons.filter((lesson) => lesson.topicId === topicId)
}

export function getExercisesByTopic(topicId: string): Exercise[] {
  return exercises.filter((exercise) => exercise.topicId === topicId)
}

export function getLearningItemsByTrack(trackId: TrackId): LearningItem[] {
  const trackTopics = topics.filter((topic) => topic.trackId === trackId)

  return trackTopics.flatMap((topic) => [
    ...getLessonsByTopic(topic.id).map(
      (lesson): LearningItem => ({ type: 'lesson', item: lesson }),
    ),
    ...getExercisesByTopic(topic.id).map(
      (exercise): LearningItem => ({ type: 'exercise', item: exercise }),
    ),
  ])
}

export function getNextLearningItem(currentItemId: string): LearningItem | undefined {
  const currentItem = getLessonById(currentItemId) ?? getExerciseById(currentItemId)

  if (!currentItem) {
    return undefined
  }

  const learningItems = getLearningItemsByTrack(currentItem.trackId)
  const currentIndex = learningItems.findIndex(({ item }) => item.id === currentItemId)

  return currentIndex >= 0 ? learningItems[currentIndex + 1] : undefined
}

/**
 * Invariantes que o catálogo assume, mas que os tipos não conseguem garantir:
 * ids únicos, referências resolvíveis e conteúdo ancorado em um tópico da
 * própria trilha. Um conteúdo que viole essas regras não quebra a aplicação —
 * ele apenas some da navegação ou desalinha a contagem de progresso, o que é
 * difícil de perceber. A checagem roda apenas em desenvolvimento.
 */
export function collectCatalogIssues(): string[] {
  const issues: string[] = []
  const topicsById = new Map(topics.map((topic) => [topic.id, topic]))
  const trackIds = new Set<string>(tracks.map((track) => track.id))
  const exerciseIds = new Set(exercises.map((exercise) => exercise.id))
  const seenIds = new Set<string>()

  for (const topic of topics) {
    if (!trackIds.has(topic.trackId)) {
      issues.push(`Tópico "${topic.id}" aponta para a trilha inexistente "${topic.trackId}".`)
    }
  }

  for (const { label, item } of [
    ...lessons.map((lesson) => ({ label: 'Aula', item: lesson })),
    ...exercises.map((exercise) => ({ label: 'Exercício', item: exercise })),
  ]) {
    if (seenIds.has(item.id)) {
      issues.push(`${label} "${item.id}" repete um id já usado por outro conteúdo.`)
    }

    seenIds.add(item.id)

    if (!trackIds.has(item.trackId)) {
      issues.push(`${label} "${item.id}" aponta para a trilha inexistente "${item.trackId}".`)
      continue
    }

    const topic = topicsById.get(item.topicId)

    if (!topic) {
      issues.push(
        `${label} "${item.id}" aponta para o tópico inexistente "${item.topicId}" e não aparecerá na trilha.`,
      )
      continue
    }

    if (topic.trackId !== item.trackId) {
      issues.push(
        `${label} "${item.id}" está na trilha "${item.trackId}", mas o tópico "${topic.id}" pertence a "${topic.trackId}".`,
      )
    }
  }

  for (const lesson of lessons) {
    for (const exerciseId of lesson.relatedExerciseIds) {
      if (!exerciseIds.has(exerciseId)) {
        issues.push(`Aula "${lesson.id}" referencia o exercício inexistente "${exerciseId}".`)
      }
    }
  }

  issues.push(...collectPrerequisiteIssues(topicsById))
  issues.push(...collectExecutionModeIssues(topicsById))

  return issues
}

/** Um pré-requisito precisa existir, ser da mesma trilha e vir antes na ordem. */
function collectPrerequisiteIssues(topicsById: ReadonlyMap<string, Topic>): string[] {
  const issues: string[] = []

  for (const topic of topics) {
    for (const prerequisiteId of topic.prerequisiteTopicIds) {
      const prerequisite = topicsById.get(prerequisiteId)

      if (!prerequisite) {
        issues.push(
          `Tópico "${topic.id}" declara o pré-requisito inexistente "${prerequisiteId}".`,
        )
        continue
      }

      if (prerequisite.trackId !== topic.trackId) {
        issues.push(
          `Tópico "${topic.id}" declara como pré-requisito "${prerequisiteId}", que é de outra trilha.`,
        )
        continue
      }

      if (prerequisite.order >= topic.order) {
        issues.push(
          `Tópico "${topic.id}" (ordem ${topic.order}) declara como pré-requisito "${prerequisiteId}" (ordem ${prerequisite.order}), que não vem antes dele.`,
        )
      }
    }
  }

  return issues
}

/**
 * A regra pedagógica central da trilha: um exercício só pode exigir que o aluno
 * escreva uma função depois do tópico em que funções são ensinadas. Sem esta
 * checagem, um exercício de função num tópico inicial passa despercebido — foi
 * exatamente o que aconteceu com "Apresentando um perfil" em Variáveis.
 */
function collectExecutionModeIssues(topicsById: ReadonlyMap<string, Topic>): string[] {
  const issues: string[] = []

  for (const track of tracks) {
    const unlockTopic = track.topics.find(
      (topic) => topic.unlocksExecutionMode === 'function',
    )
    const functionExercises = exercises.filter(
      (exercise) => exercise.trackId === track.id && exercise.executionMode === 'function',
    )

    if (functionExercises.length > 0 && !unlockTopic) {
      issues.push(
        `A trilha "${track.id}" tem exercícios de função, mas nenhum tópico declara unlocksExecutionMode: 'function'.`,
      )
      continue
    }

    if (!unlockTopic) {
      continue
    }

    for (const exercise of functionExercises) {
      const topic = topicsById.get(exercise.topicId)

      if (topic && topic.order < unlockTopic.order) {
        issues.push(
          `Exercício "${exercise.id}" pede uma função no tópico "${topic.id}" (ordem ${topic.order}), antes de "${unlockTopic.id}" (ordem ${unlockTopic.order}) ensinar funções.`,
        )
      }
    }
  }

  // O entryPoint precisa aparecer no starter code: é o nome que o aluno vai
  // implementar e que o test runner da Fase 3 vai chamar.
  for (const exercise of exercises) {
    if (
      exercise.executionMode === 'function' &&
      !new RegExp(`\\bdef\\s+${exercise.entryPoint}\\s*\\(`).test(exercise.starterCode)
    ) {
      issues.push(
        `Exercício "${exercise.id}" declara o entryPoint "${exercise.entryPoint}", mas o starter code não define essa função.`,
      )
    }
  }

  return issues
}

if (import.meta.env.DEV) {
  const issues = collectCatalogIssues()

  if (issues.length > 0) {
    console.error(`Magnolia — conteúdo inconsistente:\n- ${issues.join('\n- ')}`)
  }
}
