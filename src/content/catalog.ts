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

  return issues
}

if (import.meta.env.DEV) {
  const issues = collectCatalogIssues()

  if (issues.length > 0) {
    console.error(`Magnolia — conteúdo inconsistente:\n- ${issues.join('\n- ')}`)
  }
}
