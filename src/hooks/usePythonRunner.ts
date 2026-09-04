import { useCallback, useEffect, useRef, useState } from 'react'
import { runPython } from '../engine/pythonRunner'
import type { ExecutionResult, ExecutionStage } from '../engine/pythonRunner'

/**
 * Estado que a interface precisa conhecer. `preparing` cobre baixar o runtime e
 * os pacotes; `running` é só o código do aluno rodando.
 */
export type RunnerPhase = 'idle' | 'preparing' | 'running'

export interface UsePythonRunner {
  readonly phase: RunnerPhase
  readonly result: ExecutionResult | null
  readonly isBusy: boolean
  readonly run: (code: string, packages: readonly string[]) => void
  readonly clearResult: () => void
}

const PHASE_BY_STAGE: Record<ExecutionStage, RunnerPhase> = {
  'loading-runtime': 'preparing',
  'loading-packages': 'preparing',
  running: 'running',
}

/**
 * Adapta o Python Runner ao ciclo de vida do React. Toda a execução continua no
 * engine — aqui só existe estado de interface.
 */
export function usePythonRunner(): UsePythonRunner {
  const [phase, setPhase] = useState<RunnerPhase>('idle')
  const [result, setResult] = useState<ExecutionResult | null>(null)
  // A trava é um ref, e não o estado: ela precisa valer no instante do clique,
  // antes de qualquer re-render.
  const isBusyRef = useRef(false)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const run = useCallback((code: string, packages: readonly string[]) => {
    if (isBusyRef.current) {
      return
    }

    isBusyRef.current = true
    setResult(null)
    setPhase('preparing')

    void runPython(code, {
      packages,
      onStage: (stage) => {
        if (isMountedRef.current) {
          setPhase(PHASE_BY_STAGE[stage])
        }
      },
    }).then((executionResult) => {
      isBusyRef.current = false

      // Sair do exercício durante a execução não deve atualizar um componente
      // desmontado; o resultado é simplesmente descartado.
      if (!isMountedRef.current) {
        return
      }

      setResult(executionResult)
      setPhase('idle')
    })
  }, [])

  const clearResult = useCallback(() => setResult(null), [])

  return {
    phase,
    result,
    isBusy: phase !== 'idle',
    run,
    clearResult,
  }
}
