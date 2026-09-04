import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'ds-numpy-002',
  trackId: 'data-science',
  topicId: 'data-science-numpy-arrays',
  title: 'Convertendo temperaturas em série',
  description:
    'Converta um array de Celsius para Fahrenheit com uma expressão vetorizada.',
  order: 2,
  estimatedMinutes: 9,
  difficulty: 'Fundamentos',
  executionMode: 'function',
  entryPoint: 'converter_para_fahrenheit',
  instructions: [
    'Implemente a função converter_para_fahrenheit.',
    'Receba um array NumPy com temperaturas em Celsius.',
    'Aplique a fórmula Celsius × 9 / 5 + 32.',
    'Retorne um novo array e não use loops Python.',
  ],
  starterCode:
    'import numpy as np\n\n\ndef converter_para_fahrenheit(temperaturas_celsius):\n    # Aplique a fórmula ao array inteiro.\n    pass',
  examples: [
    {
      input: 'converter_para_fahrenheit(np.array([0, 10, 20]))',
      output: 'array([32., 50., 68.])',
    },
    {
      input: 'converter_para_fahrenheit(np.array([-40, 100]))',
      output: 'array([-40., 212.])',
    },
  ],
  hints: [
    {
      id: 'ds-numpy-002-hint-1',
      order: 1,
      text: 'Operadores aritméticos aplicados a um array atuam sobre todos os elementos.',
    },
    {
      id: 'ds-numpy-002-hint-2',
      order: 2,
      text: 'Escreva a fórmula usando diretamente o parâmetro temperaturas_celsius.',
    },
    {
      id: 'ds-numpy-002-hint-3',
      order: 3,
      text: 'A função pode retornar a expressão vetorizada em uma única linha.',
    },
  ],
  skill: 'Aplicar uma transformação vetorizada a um array.',
  packages: ['numpy'],
} satisfies Exercise

export default exercise
