import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'ds-numpy-001',
  trackId: 'data-science',
  topicId: 'data-science-numpy-arrays',
  title: 'Criando um array de medições',
  description:
    'Converta uma sequência de medições em um array NumPy para preparar os próximos cálculos.',
  order: 1,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  executionMode: 'function',
  entryPoint: 'criar_array',
  instructions: [
    'Implemente a função criar_array.',
    'Receba uma lista de valores numéricos.',
    'Retorne um array NumPy com os mesmos valores e na mesma ordem.',
  ],
  starterCode:
    'import numpy as np\n\n\ndef criar_array(valores):\n    # Converta os valores em um array NumPy.\n    pass',
  tests: [
    {
      id: 'ds-numpy-001-case-1',
      visibility: 'public',
      args: [[12, 15, 18]],
      expected: [12, 15, 18],
    },
    {
      id: 'ds-numpy-001-case-2',
      visibility: 'public',
      args: [[2.5, 4]],
      expected: [2.5, 4],
      tolerance: 1e-9,
    },
    {
      id: 'ds-numpy-001-case-3',
      visibility: 'internal',
      args: [[]],
      expected: [],
    },
    {
      id: 'ds-numpy-001-case-4',
      visibility: 'internal',
      args: [[-4, 0, 7]],
      expected: [-4, 0, 7],
    },
  ],
  hints: [
    {
      id: 'ds-numpy-001-hint-1',
      order: 1,
      text: 'O NumPy fornece uma função específica para criar um array a partir de uma lista.',
    },
    {
      id: 'ds-numpy-001-hint-2',
      order: 2,
      text: 'Use a função array disponível no alias np.',
    },
  ],
  skill: 'Criar um array NumPy a partir de uma sequência.',
  packages: ['numpy'],
} satisfies Exercise

export default exercise
