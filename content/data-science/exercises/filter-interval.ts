import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'ds-numpy-masks-001',
  trackId: 'data-science',
  topicId: 'data-science-boolean-masks',
  title: 'Filtrando valores em um intervalo',
  description:
    'Use uma boolean mask para selecionar valores entre dois limites inclusivos.',
  order: 1,
  estimatedMinutes: 12,
  difficulty: 'Fácil',
  executionMode: 'function',
  entryPoint: 'filtrar_intervalo',
  instructions: [
    'Implemente a função filtrar_intervalo.',
    'Receba um array NumPy, um limite mínimo e um limite máximo.',
    'Mantenha valores maiores ou iguais ao mínimo e menores ou iguais ao máximo.',
    'Use uma boolean mask; não use loops Python.',
  ],
  starterCode:
    'import numpy as np\n\n\ndef filtrar_intervalo(valores, minimo, maximo):\n    # Crie a máscara e retorne os valores selecionados.\n    pass',
  tests: [
    {
      id: 'ds-numpy-masks-001-case-1',
      visibility: 'public',
      args: [{ kind: 'ndarray', items: [4, 8, 12, 16] }, 8, 12],
      expected: [8, 12],
      explanation: 'Os dois limites fazem parte do intervalo.',
    },
    {
      id: 'ds-numpy-masks-001-case-2',
      visibility: 'public',
      args: [{ kind: 'ndarray', items: [-2, 0, 5] }, 1, 10],
      expected: [5],
    },
    {
      id: 'ds-numpy-masks-001-case-3',
      visibility: 'internal',
      args: [{ kind: 'ndarray', items: [1, 2, 3] }, 5, 10],
      expected: [],
    },
    {
      id: 'ds-numpy-masks-001-case-4',
      visibility: 'internal',
      args: [{ kind: 'ndarray', items: [5, 5, 5] }, 5, 5],
      expected: [5, 5, 5],
    },
  ],
  hints: [
    {
      id: 'ds-numpy-masks-001-hint-1',
      order: 1,
      text: 'Crie uma comparação para cada limite antes de filtrar o array.',
    },
    {
      id: 'ds-numpy-masks-001-hint-2',
      order: 2,
      text: 'Combine as comparações com &, colocando cada uma entre parênteses.',
    },
    {
      id: 'ds-numpy-masks-001-hint-3',
      order: 3,
      text: 'Use a máscara resultante entre os colchetes de valores.',
    },
  ],
  skill: 'Combinar condições e filtrar um array com boolean mask.',
  packages: ['numpy'],
} satisfies Exercise

export default exercise
