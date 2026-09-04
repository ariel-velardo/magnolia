import { getLearningItemsByTrack, tracks } from '../content/catalog'
import type { LearningItem, TrackId } from '../types'
import type { ProgressState } from './progressStorage'

export interface TrackProgressSummary {
  explored: number
  total: number
  percentage: number
  viewedLessons: number
  startedExercises: number
}

export function hasAnyProgress(progress: ProgressState): boolean {
  return (
    progress.viewedLessonIds.length > 0 || progress.startedExerciseIds.length > 0
  )
}

export function isLessonViewed(lessonId: string, progress: ProgressState): boolean {
  return progress.viewedLessonIds.includes(lessonId)
}

export function isExerciseStarted(
  exerciseId: string,
  progress: ProgressState,
): boolean {
  return progress.startedExerciseIds.includes(exerciseId)
}

export function isLearningItemExplored(
  item: LearningItem,
  progress: ProgressState,
): boolean {
  return item.type === 'lesson'
    ? isLessonViewed(item.item.id, progress)
    : isExerciseStarted(item.item.id, progress)
}

/**
 * O total é derivado da mesma lista que alimenta a navegação da trilha, para
 * que "explorado de total" nunca conte um conteúdo que o usuário não consegue
 * alcançar a partir da página da trilha.
 */
export function getTrackProgressSummary(
  trackId: TrackId,
  progress: ProgressState,
): TrackProgressSummary {
  const learningItems = getLearningItemsByTrack(trackId)
  const exploredItems = learningItems.filter((item) =>
    isLearningItemExplored(item, progress),
  )
  const viewedLessons = exploredItems.filter((item) => item.type === 'lesson').length
  const startedExercises = exploredItems.length - viewedLessons
  const total = learningItems.length

  return {
    explored: exploredItems.length,
    total,
    percentage: total === 0 ? 0 : Math.round((exploredItems.length / total) * 100),
    viewedLessons,
    startedExercises,
  }
}

export function getRecommendedLearningItem(
  progress: ProgressState,
): LearningItem | undefined {
  const tracksInProgress = tracks.filter((track) => {
    const summary = getTrackProgressSummary(track.id, progress)
    return summary.explored > 0 && summary.explored < summary.total
  })
  const remainingTracks = tracks.filter(
    (track) => !tracksInProgress.some((candidate) => candidate.id === track.id),
  )

  for (const track of [...tracksInProgress, ...remainingTracks]) {
    const nextItem = getLearningItemsByTrack(track.id).find(
      (item) => !isLearningItemExplored(item, progress),
    )

    if (nextItem) {
      return nextItem
    }
  }

  return undefined
}

export function getLearningItemPath(item: LearningItem): string {
  return item.type === 'lesson'
    ? `/lessons/${item.item.id}`
    : `/exercises/${item.item.id}`
}
