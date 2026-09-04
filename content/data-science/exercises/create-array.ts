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
  instructions: [
    'Implemente a função criar_array.',
    'Receba uma lista de valores numéricos.',
    'Retorne um array NumPy com os mesmos valores e na mesma ordem.',
  ],
  starterCode:
    'import numpy as np\n\n\ndef criar_array(valores):\n    # Converta os valores em um array NumPy.\n    pass',
  examples: [
    {
      input: 'criar_array([12, 15, 18])',
      output: 'array([12, 15, 18])',
    },
    {
      input: 'criar_array([2.5, 4.0])',
      output: 'array([2.5, 4. ])',
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
