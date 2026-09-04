import type { Lesson } from '../../../src/types'

const lesson = {
  id: 'ds-numpy-arrays-intro',
  trackId: 'data-science',
  topicId: 'data-science-numpy-arrays',
  title: 'Arrays: a base do NumPy',
  summary:
    'Represente medições em arrays e aplique a mesma operação a vários valores de uma só vez.',
  order: 1,
  estimatedMinutes: 12,
  objectives: [
    'Criar um array com np.array.',
    'Interpretar shape e dtype.',
    'Aplicar operações vetorizadas sem escrever um loop manual.',
  ],
  concept:
    'Um array NumPy organiza valores em uma estrutura homogênea e permite operações vetorizadas eficientes.',
  explanation: [
    'Arrays se parecem com listas, mas foram projetados para cálculos numéricos. Em geral, seus elementos compartilham um mesmo tipo, exposto pelo atributo dtype.',
    'O atributo shape descreve as dimensões do array. Um conjunto simples de medições possui uma dimensão; uma tabela numérica pode possuir linhas e colunas.',
    'Operações aritméticas são aplicadas elemento a elemento. Somar 1 a um array cria resultados para todas as posições sem exigir um for escrito manualmente.',
  ],
  examples: [
    {
      title: 'Ajustando uma série de medições',
      description:
        'A soma é aplicada a cada temperatura e preserva a forma do array.',
      code:
        'import numpy as np\n\ntemperaturas = np.array([19.5, 21.0, 23.5])\ntemperaturas_ajustadas = temperaturas + 0.5',
      output: 'array([20. , 21.5, 24. ])',
    },
  ],
  commonMistakes: [
    'Esperar que uma operação entre listas Python tenha o mesmo comportamento de uma operação entre arrays.',
    'Ignorar o dtype e perder precisão ao trabalhar com dados numéricos.',
    'Escrever um loop manual quando uma operação vetorizada expressa diretamente o cálculo.',
  ],
  relatedExerciseIds: ['ds-numpy-001', 'ds-numpy-002'],
} satisfies Lesson

export default lesson
