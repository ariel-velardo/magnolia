import { useEffect, useRef } from 'react'
import {
  getExerciseById,
  getLessonById,
  getTrackById,
} from './content/catalog'
import { usePathname } from './hooks/usePathname'
import { AppLayout } from './layouts/AppLayout'
import { DashboardPage } from './pages/DashboardPage'
import { ExercisePage } from './pages/ExercisePage'
import { LessonPage } from './pages/LessonPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { TrackPage } from './pages/TrackPage'
import { loadProgress } from './progress/progressStorage'
import type { Exercise, Lesson, Track, TrackId } from './types'
import './App.css'

type Route =
  | { kind: 'dashboard'; title: string }
  | { kind: 'track'; title: string; track: Track }
  | { kind: 'lesson'; title: string; lesson: Lesson }
  | { kind: 'exercise'; title: string; exercise: Exercise }
  | { kind: 'not-found'; title: string }

function resolveRoute(pathname: string): Route {
  if (pathname === '/') {
    return { kind: 'dashboard', title: 'Aprenda praticando' }
  }

  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 2 && segments[0] === 'tracks') {
    const track = getTrackById(segments[1])

    if (track) {
      return { kind: 'track', track, title: track.title }
    }
  }

  if (segments.length === 2 && segments[0] === 'lessons') {
    const lesson = getLessonById(segments[1])

    if (lesson) {
      return { kind: 'lesson', lesson, title: lesson.title }
    }
  }

  if (segments.length === 2 && segments[0] === 'exercises') {
    const exercise = getExerciseById(segments[1])

    if (exercise) {
      return { kind: 'exercise', exercise, title: exercise.title }
    }
  }

  return { kind: 'not-found', title: 'Página não encontrada' }
}

function getRouteTrackId(route: Route): TrackId | undefined {
  if (route.kind === 'track') {
    return route.track.id
  }

  if (route.kind === 'lesson') {
    return route.lesson.trackId
  }

  if (route.kind === 'exercise') {
    return route.exercise.trackId
  }

  return undefined
}

function App() {
  const pathname = usePathname()
  const route = resolveRoute(pathname)
  const progress = loadProgress()
  const previousPathname = useRef(pathname)

  useEffect(() => {
    document.title = `${route.title} · Magnolia`
    const routeChanged = previousPathname.current !== pathname
    previousPathname.current = pathname

    if (!routeChanged) {
      return
    }

    const focusFrame = window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(focusFrame)
  }, [pathname, route.title])

  return (
    <AppLayout
      currentPath={pathname}
      currentTrackId={getRouteTrackId(route)}
      pageTitle={route.title}
    >
      {route.kind === 'dashboard' && <DashboardPage progress={progress} />}
      {route.kind === 'track' && (
        <TrackPage track={route.track} progress={progress} />
      )}
      {route.kind === 'lesson' && <LessonPage lesson={route.lesson} />}
      {route.kind === 'exercise' && <ExercisePage exercise={route.exercise} />}
      {route.kind === 'not-found' && <NotFoundPage />}
    </AppLayout>
  )
}

export default App
