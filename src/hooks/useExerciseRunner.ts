import { useCallback, useEffect, useRef, useState } from 'react'
import { evaluate } from '../engine/evaluator'
import type { Evaluation } from '../engine/evaluator'
import { runPython } from '../engine/pythonRunner'
import type { ExecutionResult, ExecutionStage } from '../engine/pythonRunner'
import { getRunInitialVariables, runExerciseTests } from '../engine/testRunner'
import type { Exercise } from '../types'

/**
 * Estado das duas ações do workspace.
 *
 * `run` e `verify` disputam o mesmo Worker, então vivem no mesmo hook: uma
 * trava só, e a interface nunca fica com dois botões ativos ao mesmo tempo.
 */
export type RunnerPhase = 'idle' | 'preparing' | 'running' | 'verifying'

/** Qual ação está em andamento, para o botão certo mostrar o progresso. */
export type RunnerAction = 'run' | 'verify' | null

export interface UseExerciseRunner {
  readonly phase: RunnerPhase
  readonly action: RunnerAction
  readonly isBusy: boolean
  readonly executionResult: ExecutionResult | null
  readonly evaluation: Evaluation | null
  readonly run: (code: string) => void
  readonly verify: (code: string) => void
  readonly clear: () => void
}

const PHASE_BY_STAGE: Record<ExecutionStage, Exclude<RunnerPhase, 'idle' | 'verifying'>> = {
  'loading-runtime': 'preparing',
  'loading-packages': 'preparing',
  running: 'running',
}

export function useExerciseRunner(exercise: Exercise): UseExerciseRunner {
  const [phase, setPhase] = useState<RunnerPhase>('idle')
  const [action, setAction] = useState<RunnerAction>(null)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  // A trava é um ref, e não o estado: precisa valer no instante do clique.
  const isBusyRef = useRef(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const finish = useCallback(() => {
    isBusyRef.current = false

    if (isMountedRef.current) {
      setPhase('idle')
      setAction(null)
    }
  }, [])

  const run = useCallback(
    (code: string) => {
      if (isBusyRef.current) {
        return
      }

      isBusyRef.current = true
      // Executar e verificar respondem perguntas diferentes; mostrar as duas
      // respostas ao mesmo tempo confunde qual delas é a atual.
      setEvaluation(null)
      setExecutionResult(null)
      setAction('run')
      setPhase('preparing')

      void runPython(code, {
        packages: exercise.packages,
        // Executar não roda os casos, mas parte do mesmo estado inicial que o
        // primeiro deles: sem isso, explorar um exercício de entrada injetada
        // levantaria NameError na primeira linha.
        initialVariables: getRunInitialVariables(exercise),
        onStage: (stage) => {
          if (isMountedRef.current) {
            setPhase(PHASE_BY_STAGE[stage])
          }
        },
      }).then((result) => {
        if (isMountedRef.current) {
          setExecutionResult(result)
        }

        finish()
      })
    },
    [exercise, finish],
  )

  const verify = useCallback(
    (code: string) => {
      if (isBusyRef.current) {
        return
      }

      isBusyRef.current = true
      setExecutionResult(null)
      setEvaluation(null)
      setAction('verify')
      setPhase('preparing')

      void runExerciseTests(exercise, code, {
        onStage: (stage) => {
          if (isMountedRef.current) {
            setPhase(stage === 'running' ? 'verifying' : PHASE_BY_STAGE[stage])
          }
        },
      }).then((result) => {
        if (isMountedRef.current) {
          setEvaluation(evaluate(result, exercise))
        }

        finish()
      })
    },
    [exercise, finish],
  )

  const clear = useCallback(() => {
    setExecutionResult(null)
    setEvaluation(null)
  }, [])

  return {
    phase,
    action,
    isBusy: phase !== 'idle',
    executionResult,
    evaluation,
    run,
    verify,
    clear,
  }
}
