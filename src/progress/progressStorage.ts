export const PROGRESS_STORAGE_KEY = 'magnolia.progress.v1'

export interface ProgressState {
  version: 1
  viewedLessonIds: string[]
  startedExerciseIds: string[]
}

export function createEmptyProgressState(): ProgressState {
  return {
    version: 1,
    viewedLessonIds: [],
    startedExerciseIds: [],
  }
}

let memoryProgress = createEmptyProgressState()
let hasUnsavedMemoryProgress = false

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function parseProgressState(value: unknown): ProgressState | null {
  if (typeof value !== 'object' || value === null) {
    return null
  }

  const candidate = value as Record<string, unknown>

  if (
    candidate.version !== 1 ||
    !isStringArray(candidate.viewedLessonIds) ||
    !isStringArray(candidate.startedExerciseIds)
  ) {
    return null
  }

  return {
    version: 1,
    viewedLessonIds: [...new Set(candidate.viewedLessonIds)],
    startedExerciseIds: [...new Set(candidate.startedExerciseIds)],
  }
}

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return window.localStorage
  } catch {
    return null
  }
}

function saveProgress(state: ProgressState): void {
  memoryProgress = state
  const storage = getLocalStorage()

  if (!storage) {
    hasUnsavedMemoryProgress = true
    return
  }

  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state))
    hasUnsavedMemoryProgress = false
  } catch {
    hasUnsavedMemoryProgress = true
    // The in-memory state keeps the current session usable.
  }
}

export function loadProgress(): ProgressState {
  if (hasUnsavedMemoryProgress) {
    return memoryProgress
  }

  try {
    const storedValue = getLocalStorage()?.getItem(PROGRESS_STORAGE_KEY)

    if (storedValue === null || storedValue === undefined) {
      return memoryProgress
    }

    const parsedProgress = parseProgressState(JSON.parse(storedValue))

    if (!parsedProgress) {
      return memoryProgress
    }

    memoryProgress = parsedProgress
    return memoryProgress
  } catch {
    return memoryProgress
  }
}

export function markLessonViewed(lessonId: string): ProgressState {
  const current = loadProgress()

  if (current.viewedLessonIds.includes(lessonId)) {
    return current
  }

  const next: ProgressState = {
    ...current,
    viewedLessonIds: [...current.viewedLessonIds, lessonId],
  }

  saveProgress(next)
  return next
}

export function markExerciseStarted(exerciseId: string): ProgressState {
  const current = loadProgress()

  if (current.startedExerciseIds.includes(exerciseId)) {
    return current
  }

  const next: ProgressState = {
    ...current,
    startedExerciseIds: [...current.startedExerciseIds, exerciseId],
  }

  saveProgress(next)
  return next
}
