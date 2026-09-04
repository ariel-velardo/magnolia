import type { Exercise } from '../../../src/types'

const exercise = {
  id: 'prog-operators-003',
  trackId: 'programming',
  topicId: 'programming-operators',
  title: 'Comparando dois valores',
  description:
    'Produza booleanos a partir de comparações e exiba as respostas.',
  order: 3,
  estimatedMinutes: 7,
  difficulty: 'Fundamentos',
  executionMode: 'script',
  instructions: [
    'Compare as duas metas e exiba três linhas, nesta ordem.',
    'Primeira: se meta_atingida é maior ou igual a meta_prevista.',
    'Segunda: se as duas metas são exatamente iguais.',
    'Terceira: se meta_atingida é diferente de zero.',
    'Cada linha deve exibir apenas True ou False.',
  ],
  starterCode:
    'meta_prevista = 100\nmeta_atingida = 120\n\n# Exiba as três comparações\n',
  examples: [
    {
      output: 'True\nFalse\nTrue',
      explanation:
        '120 é maior que 100, as metas não são iguais, e 120 é diferente de zero.',
    },
  ],
  hints: [
    {
      id: 'prog-operators-003-hint-1',
      order: 1,
      text: 'Uma comparação já produz True ou False — não é preciso escrever nada além dela.',
    },
    {
      id: 'prog-operators-003-hint-2',
      order: 2,
      text: 'Igualdade usa dois sinais: ==. Um sinal só guardaria um valor.',
    },
    {
      id: 'prog-operators-003-hint-3',
      order: 3,
      text: 'Para "diferente de", use !=.',
    },
  ],
  skill: 'Escrever comparações e reconhecer que o resultado é um booleano.',
  packages: [],
} satisfies Exercise

export default exercise
