import { describe, expect, it } from 'vitest'
import {
  collectCatalogIssues,
  exercises,
  getExerciseById,
  getLearningItemsByTrack,
  getLessonById,
  getNextLearningItem,
  lessons,
  tracks,
} from '../src/content/catalog'

/**
 * O catálogo é montado por import.meta.glob, então nenhum arquivo de conteúdo é
 * importado explicitamente. Estes testes são a verificação de que o conteúdo
 * publicado continua íntegro depois de qualquer adição.
 */
describe('collectCatalogIssues', () => {
  it('não encontra inconsistências no conteúdo atual', () => {
    expect(collectCatalogIssues()).toEqual([])
  })
})

describe('catálogo', () => {
  it('carrega as trilhas, aulas e exercícios declarados', () => {
    expect(tracks.length).toBeGreaterThan(0)
    expect(lessons.length).toBeGreaterThan(0)
    expect(exercises.length).toBeGreaterThan(0)
  })

  it('resolve cada conteúdo pelo id usado nas rotas', () => {
    for (const lesson of lessons) {
      expect(getLessonById(lesson.id)).toBe(lesson)
    }

    for (const exercise of exercises) {
      expect(getExerciseById(exercise.id)).toBe(exercise)
    }
  })

  it('devolve undefined para um id inexistente', () => {
    expect(getLessonById('prog-nao-existe')).toBeUndefined()
    expect(getExerciseById('ds-nao-existe')).toBeUndefined()
  })

  it('deixa todo conteúdo de uma trilha alcançável pelo percurso', () => {
    for (const track of tracks) {
      const reachableIds = getLearningItemsByTrack(track.id).map(({ item }) => item.id)
      const trackContentIds = [...lessons, ...exercises]
        .filter((item) => item.trackId === track.id)
        .map((item) => item.id)

      expect([...reachableIds].sort()).toEqual([...trackContentIds].sort())
    }
  })

  it('encadeia o percurso do começo ao fim sem repetir conteúdo', () => {
    for (const track of tracks) {
      const items = getLearningItemsByTrack(track.id)
      const visited = new Set<string>()

      for (const [index, current] of items.entries()) {
        expect(visited.has(current.item.id)).toBe(false)
        visited.add(current.item.id)
        expect(getNextLearningItem(current.item.id)?.item.id).toBe(
          items[index + 1]?.item.id,
        )
      }
    }
  })
})

describe('exercícios', () => {
  it('sempre trazem starter code para o editor', () => {
    for (const exercise of exercises) {
      expect(exercise.starterCode.trim().length).toBeGreaterThan(0)
    }
  })

  it('declaram os pacotes Python que o runner precisa carregar', () => {
    for (const exercise of exercises) {
      const usesNumpy = /\bimport numpy\b/.test(exercise.starterCode)

      expect(usesNumpy ? exercise.packages.includes('numpy') : true).toBe(true)
    }
  })
})
