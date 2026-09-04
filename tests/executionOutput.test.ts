import { describe, expect, it } from 'vitest'
import {
  hasVisibleOutput,
  normalizeOutput,
} from '../src/engine/pythonRunner/executionOutput'

/**
 * O Pyodide entrega stdout em pedaços já quebrados por linha, sem o \n final.
 * A junção precisa reconstruir exatamente o que o aluno veria no terminal.
 */
describe('normalizeOutput', () => {
  it('reconstrói um print simples', () => {
    expect(normalizeOutput(['Olá, Magnolia'])).toBe('Olá, Magnolia')
  })

  it('reconstrói prints sucessivos como linhas separadas', () => {
    expect(normalizeOutput(['A', 'B'])).toBe('A\nB')
  })

  it('preserva linhas em branco no meio da saída', () => {
    expect(normalizeOutput(['A', '', 'B'])).toBe('A\n\nB')
  })

  it('não deixa quebras sobrando no fim', () => {
    expect(normalizeOutput(['A', '', ''])).toBe('A')
  })

  it('normaliza quebras de linha do Windows', () => {
    expect(normalizeOutput(['A\r\nB'])).toBe('A\nB')
  })

  it('devolve texto vazio quando nada foi impresso', () => {
    expect(normalizeOutput([])).toBe('')
  })
})

describe('hasVisibleOutput', () => {
  it('reconhece que houve saída', () => {
    expect(hasVisibleOutput('Olá')).toBe(true)
    expect(hasVisibleOutput('0')).toBe(true)
  })

  it('reconhece a ausência de saída', () => {
    expect(hasVisibleOutput('')).toBe(false)
  })
})
